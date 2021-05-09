import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subscription} from 'rxjs/Subscription';
import {Course} from '../_models/course';
import {Subject} from '../_models/subject';
import {Student} from '../_models/student';
import {Class} from '../_models/class';

@Injectable({
    providedIn: 'root'
})
export class SgmService implements OnDestroy {

    // Subscriptions aggregator, push all "subscribes" here to be able to destroy all of them at once
    subscriptions: Subscription[] = [];

    constructor(private http: HttpClient) { }

    ngOnDestroy() {
        // Destroy all subscriptions
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    /**
     * Get all Courses.
     */
    getCourses(): Course[] {
        const courses: Course[] = [];
        this.subscriptions.push(
            this.http.get<Response<Course[]>>(`${environment.apiUrl}/courses`).subscribe(response =>
                response.response.data.forEach(course => courses.push(course))
            )
        );
        return courses;
    }

    /**
     * Get all Subjects belonging to a specific Course.
     * @param id_course Id of the Course
     */
    getSubjects(id_course: number): Subject[] {
        const subjects: Subject[] = [];
        this.subscriptions.push(
            this.http.get<Response<Subject[]>>(`${environment.apiUrl}/subjects/${id_course}`).subscribe(response =>
                response.response.data.forEach(subject => subjects.push(subject))
            )
        );
        return subjects;
    }

    /**
     * Get all Students.
     */
    getAllStudents(): Student[] {
        const students: Student[] = [];
        this.subscriptions.push(
            this.http.get<Response<Student[]>>(`${environment.apiUrl}/students`).subscribe(response =>
                response.response.data.forEach(student => students.push(student))
            )
        );
        return students;
    }

    /**
     * Create Class.
     * @param classs Class to create
     */
    createClass(classs: Class): boolean {
        let success = false;
        this.subscriptions.push(
            this.http.post<Response<Class>>(`${environment.apiUrl}/classes`, classs).subscribe(() =>
                    success = true
                , () => success = false)
        );
        return success;
    }
}

export class Response<T> {
    response: {
        message: string,
        data: T
    }
}
