import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../validation.service';
import {SgmService} from '../../_services/sgm.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';
import {Subscription} from 'rxjs/Subscription';
import {Course} from '../../_models/course';
import {Subject} from '../../_models/subject';
import {Student} from '../../_models/student';
import {Class, StudentPerClass} from '../class';
import {AuthenticationService} from '../../_services/authentication.service';
import {ClassService} from '../class.service';

@Component({
    selector: 'app-create-edit-class',
    templateUrl: './create-edit-class.component.html',
    styleUrls: ['./create-edit-class.component.css']
})
export class CreateEditClassComponent implements OnInit, OnDestroy {

    // Subscriptions aggregator, push all "subscribes" here to be able to destroy all of them at once
    subscriptions: Subscription[] = [];

    error = false;
    classForm: FormGroup;
    courses: Course[];
    subjects: Subject[];
    allStudents: Student[] = [];
    signedStudents: Student[] = [];
    frequencyRegimes: { _id: number, name: string }[] = [{_id: 1, name: 'Daytime'}, {_id: 2, name: 'Nighttime'}];
    years: { _id: number, name: string }[] = [{_id: 1, name: '1st'}, {_id: 2, name: '2nd'}, {_id: 3, name: '3rd'}];

    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    filteredStudents: Observable<Student[]>;
    @ViewChild('inputStudents') inputStudentsChild: ElementRef<HTMLInputElement>;

    constructor(private validationService: ValidationService, private formBuilder: FormBuilder, private sgmService: SgmService,
                private classService: ClassService, private authenticationService: AuthenticationService) { }

    ngOnInit(): void {
        this.classForm = this.formBuilder.group({
            inputCourse: [null, Validators.required],
            inputSubject: [null, Validators.required],
            inputYear: [null, Validators.required],
            inputFrequencyRegime: [null, Validators.required],
            inputLectiveYear: [null, Validators.required],
            inputStudents: [null],
        });

        this.subscriptions.push(this.sgmService.getCourses().subscribe(courses => this.courses = courses));
        this.subscriptions.push(this.sgmService.getAllStudents().subscribe(students => this.allStudents = students));

        // Check for changes in the "inputCourse" and update the Subject list with the Subjects of that Course
        this.subscriptions.push(
            this.classForm.get('inputCourse').valueChanges.subscribe(value => {
                // Reset the "inputSubject" in case it has a value before the user changes the Course
                this.classForm.get('inputSubject').reset();

                // Get the subjects for the indicated Course (course Id in "value")
                this.subscriptions.push(this.sgmService.getSubjects(value).subscribe(subjects => this.subjects = subjects));
            })
        );

        // Check for changes in the "inputStudents" and update the suggestions
        this.filteredStudents = this.classForm.get('inputStudents').valueChanges.pipe(
            startWith(null as boolean),
            map((inputText: string | null) => inputText ? this._filter(inputText) : this.allStudents.slice())
        );

        this.subscriptions.push(
            this.classForm.valueChanges.subscribe(() => {
                if (this.error) {
                    this.error = false;
                }
            })
        );
    }

    ngOnDestroy() {
        // Destroy all subscriptions
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    /**
     * Form submission.
     * Sends data to SGM service.
     */
    submitClass(): void {
        // stop here if form is invalid
        if (this.classForm.invalid) {
            return;
        }

        // Push signed Students into "StudentsInClass" in order to send them to the API
        const studentsInClass: StudentPerClass[] = [];
        this.signedStudents.forEach(student => studentsInClass.push(new StudentPerClass(student._id)));

        this.classService.createClass(new Class(this.authenticationService.userValue.response.data.user._id,
            this.classForm.get('inputCourse').value, this.classForm.get('inputSubject').value, this.classForm.get('inputYear').value,
            this.classForm.get('inputFrequencyRegime').value, this.classForm.get('inputLectiveYear').value, studentsInClass)).subscribe(
            () => this.error = false, () => this.error = true);
    }

    /**
     * This procedure is called when the user presses ENTER or COMMA on the input. This will only add Students if the user inserts the
     * Student number and will do nothing if he inserts anything else.
     * @param event
     */
    add(event: MatChipInputEvent): void {
        // Find the student by Code
        const student = this.allStudents.find(eachStudent => eachStudent.code === +event.value);

        // Check if typed Student exists
        if (student) {
            // If true sign the Student to the Class
            this.signedStudents.push(student);

            // Remove the Student from the "allStudents" so that it doesn't appear again in the search
            this.allStudents.splice(this.allStudents.indexOf(student), 1);
        }

        // Reset the input value
        if (event.input) {
            event.input.value = '';
        }

        // Update the list by forcing a "valueChanges" event to execute "_filter"
        this.classForm.get('inputStudents').setValue(null);
    }

    /**
     * This procedure is called when the user clicks in a Student from the list.
     * @param event Event with the clicked Student
     */
    selected(event: MatAutocompleteSelectedEvent): void {
        // Sign the Student to the Class
        this.signedStudents.push(event.option.value);

        // Remove the Student from the "allStudents" so that it doesn't appear again in the search
        this.allStudents.splice(this.allStudents.indexOf(event.option.value), 1);

        // Reset the input value
        this.inputStudentsChild.nativeElement.value = '';

        // Update the list by forcing a "valueChanges" event to execute "_filter"
        this.classForm.get('inputStudents').setValue(null);
    }

    /**
     * This procedure is called when the user removes a Student from the "inputStudents". It will unsign that Student and add him to
     * "allStudents" again so that he can be displayed in the list again.
     * @param student Student to remove
     */
    remove(student: Student): void {
        const index = this.signedStudents.indexOf(student);
        if (index >= 0) {
            // Unsign the Student
            this.signedStudents.splice(index, 1);

            // Add the Student again so that he can be displayed in the list
            this.allStudents.push(student);

            // Update the list by forcing a "valueChanges" event to execute "_filter"
            this.classForm.get('inputStudents').setValue(null);
        }
    }

    /**
     * Filter the Students by Id and Name (from what is typed in the input).
     * @param value Input text
     */
    _filter(value: string): Student[] {
        try {
            const filterValue = value.toLowerCase();
            return this.allStudents.filter(student => (student.code + student.name.toLowerCase()).includes(filterValue));
        } catch (e: unknown) {
            // Ignore this error, it only occurs when a Student is signed to a Class because the value received in "value" argument is a
            // Student object and the error occurs when trying to do ".toLowerCase" on the object. When doing normal search there are no
            // problems.
            // console.error(e);
        }
    }
}
