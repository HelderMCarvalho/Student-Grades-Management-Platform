import {Injectable} from '@angular/core';
import {Class} from './class';
import {Response} from '../_models/response';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClassService {

    constructor(private http: HttpClient) { }

    /**
     * Get all Classes belonging to a specific teacher and returns the Observable with them.
     * @param _id_teacher Id of the teacher
     */
    getClasses(_id_teacher: number): Observable<Class[]> {
        return this.http.get<Response<Class[]>>(`${environment.apiUrl}/classes/${_id_teacher}`).pipe(map(response => {
            return response.response.data;
        }));
    }

    /**
     * Create Class.
     * @param classs Class to create
     */
    createClass(classs: Class): Observable<Response<null>> {
        return this.http.post<Response<null>>(`${environment.apiUrl}/classes`, classs).pipe(map(response => {
            return response;
        }));
    }

    /**
     * Delete Class.
     * @param _id Id of the Class to delete
     */
    deleteClass(_id: number): Observable<Response<null>> {
        return this.http.delete<Response<null>>(`${environment.apiUrl}/classes/${_id}`).pipe(map((response) => {
            return response;
        }));
    }
}
