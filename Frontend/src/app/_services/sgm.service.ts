import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Course} from '../_models/course';
import {Student} from '../_models/student';
import {Response} from '../_models/response';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Year} from '../_models/year';
import {FrequencyRegime} from '../_models/frequencyRegime';

@Injectable({
    providedIn: 'root'
})
export class SgmService {

    constructor(private http: HttpClient) { }

    /**
     * GET all Courses.
     */
    getCourses(): Observable<Course[]> {
        return this.http.get<Response<Course[]>>(`${environment.apiUrl}/courses`).pipe(map(response => {
            return response.response.data;
        }));
    }

    /**
     * GET all Students.
     */
    getAllStudents(): Observable<Student[]> {
        return this.http.get<Response<Student[]>>(`${environment.apiUrl}/students`).pipe(map(response => {
            return response.response.data;
        }));
    }

    /**
     * GET all Years
     */
    getYears(): Observable<Year[]> {
        return this.http.get<Response<Year[]>>(`${environment.apiUrl}/years`).pipe(map(response => {
            return response.response.data;
        }));
    }

    /**
     * GET all Frequency Regimes
     */
    getFrequencyRegimes(): Observable<FrequencyRegime[]> {
        return this.http.get<Response<FrequencyRegime[]>>(`${environment.apiUrl}/frequencyRegimes`).pipe(map(response => {
            return response.response.data;
        }));
    }
}
