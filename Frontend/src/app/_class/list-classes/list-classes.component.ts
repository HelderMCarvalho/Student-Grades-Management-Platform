import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ClassService} from '../class.service';
import {AuthenticationService} from '../../_services/authentication.service';
import {Class} from '../class';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Course} from '../../_models/course';
import {Subject} from '../../_models/subject';
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

    frequencyRegimes: { _id: number, name: string }[] = [{_id: 1, name: 'Daytime'}, {_id: 2, name: 'Nighttime'}];
    years: { _id: number, name: string }[] = [{_id: 1, name: '1st'}, {_id: 2, name: '2nd'}, {_id: 3, name: '3rd'}];
    courses: Course[];
    subjects: Subject[];

    // This is a Class[] but it needs to be any[] in order for the filter to work properly in the table. Why? Because we need to change some
    // field types, mainly from number to string, so that way we can search for Classes by Course name, Subject name, Year name and
    // Frequency Regime name.
    classes: any[] = [];

    constructor(private authenticationService: AuthenticationService, private sgmService: SgmService, private classService: ClassService) {}

    ngOnInit(): void {
        // Get Courses
        this.subscriptions.push(this.sgmService.getCourses().subscribe(courses => this.courses = courses));

        // Get All Subjects
        this.subscriptions.push(this.sgmService.getAllSubjects().subscribe(subjects => this.subjects = subjects));

        // Get All Classes belonging to logged teacher
        this.subscriptions.push(
            this.classService.getClasses(this.authenticationService.userValue.response.data.user._id).subscribe(classes => {
                // Save Classes locally
                this.classes = classes;
                this.classes.forEach(classs => {
                    // Change Ids to Names in order for the table to look good and for its filter to work properly.
                    classs._id_course = this.courses.find(course => course._id === classs._id_course).name;
                    classs._id_subject = this.subjects.find(subject => subject._id === classs._id_subject).name;
                    classs.year = this.years.find(year => year._id === classs._id).name;
                    classs.frequency_regime = this.frequencyRegimes.find(frequencyRegime => frequencyRegime._id === classs._id).name;
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
