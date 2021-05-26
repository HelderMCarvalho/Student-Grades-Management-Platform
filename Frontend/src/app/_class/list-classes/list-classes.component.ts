import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ClassService} from '../class.service';
import {AuthenticationService} from '../../_services/authentication.service';
import {Class} from '../../_models/class';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SgmService} from '../../_services/sgm.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-list-classes',
    templateUrl: './list-classes.component.html',
    styleUrls: ['./list-classes.component.css']
})
export class ListClassesComponent implements OnInit, OnDestroy {

    // Subscriptions aggregator, push all "subscribes" here to be able to destroy all of them at once
    subscriptions: Subscription[] = [];

    displayedColumns: string[] = ['_id', 'course', 'subject', 'year', 'frequency_regime', 'lective_year', 'options'];
    dataSource: MatTableDataSource<Class>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    // This is a Class[] but it needs to be any[] because the Backend sends the Class with all of its associations included.
    classes: any[] = [];

    constructor(private authenticationService: AuthenticationService, private sgmService: SgmService, private classService: ClassService) {}

    ngOnInit(): void {
        // Get All Classes belonging to logged teacher
        this.subscriptions.push(
            this.classService.getClasses(this.authenticationService.userValue.response.data.teacher._id).subscribe(classes => {
                // Save Classes locally
                this.classes = classes;

                // Do some modifications in order for the Filter to work properly
                this.classes.forEach(classs => {
                    classs._id_course = classs.Subject.Course.name;
                    classs._id_subject = classs.Subject.name;
                    classs._id_year = classs.Year.name;
                    classs._id_frequency_regime = classs.FrequencyRegime.name;
                });

                // Assign the Classes to the table
                this.dataSource = new MatTableDataSource(this.classes);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            })
        );
    }

    ngOnDestroy() {
        // Destroy all subscriptions
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    /**
     * Delete Class and update the table data. Executed when the user clicks on the delete button in the table.
     * @param _id Id of the Class to delete
     */
    deleteClass(_id: number) {
        this.subscriptions.push(
            this.classService.deleteClass(_id).subscribe(() => {
                this.classes.splice(this.classes.indexOf(this.classes.find(classs => classs._id === _id)), 1);
                this.dataSource = new MatTableDataSource(this.classes);
            }, () => alert('Error deleting the Class!'))
        );
    }

    /**
     * Filter the data in the table to match what was typed in the input.
     * @param event KeyUp on "inputTableFilter"
     */
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.dataSource.paginator?.firstPage();
    }
}
