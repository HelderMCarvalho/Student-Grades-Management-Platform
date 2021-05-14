import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Course} from '../_models/course';
import {Subject} from '../_models/subject';
import {Student} from '../_models/student';
import {Response} from '../_models/response';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SgmService {

    constructor(private http: HttpClient) { }

    /**
     * Get all Courses.
     */
    getCourses(): Observable<Course[]> {
        return this.http.get<Response<Course[]>>(`${environment.apiUrl}/courses`).pipe(map(response => {
            return response.response.data;
        }));
    }

    /**
     * Get Subjects belonging to a specific Course.
     * @param _id_course Id of the Course
     */
    getSubjects(_id_course: number): Observable<Subject[]> {
        return this.http.get<Response<Subject[]>>(`${environment.apiUrl}/subjects/${_id_course}`).pipe(map(response => {
            return response.response.data;
        }));
    }

    /**
     * Get all Subjects.
     */
    getAllSubjects(): Observable<Subject[]> {
        return this.http.get<Response<Subject[]>>(`${environment.apiUrl}/subjects`).pipe(map(response => {
            return response.response.data;
        }));
    }

    /**
     * Get all Students.
     */
    getAllStudents(): Observable<Student[]> {
        return this.http.get<Response<Student[]>>(`${environment.apiUrl}/students`).pipe(map(response => {
            return response.response.data;
        }));
    }
}
