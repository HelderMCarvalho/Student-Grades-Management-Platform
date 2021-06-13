import {Injectable} from '@angular/core';
import {Class} from '../_models/class';
import {Response} from '../_models/response';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Note} from '../_models/note';
import {Student} from '../_models/student';
import {EvaluationComponent} from '../_models/evaluationComponent';

@Injectable({
    providedIn: 'root'
})
export class ClassService {

    constructor(private http: HttpClient) { }

    /**
     * GET Class and returns the Observable with it.
     * @param _id Id of the teacher
     */
    getClass(_id: number): Observable<Class> {
        return this.http.get<Response<Class>>(`${environment.apiUrl}/classes/${_id}`).pipe(map(response => {
            return response.response.data;
        }));
    }

    /**
     * GET all Classes belonging to a specific teacher and returns the Observable with them.
     * @param _id_teacher Id of the teacher
     */
    getClasses(_id_teacher: number): Observable<Class[]> {
        return this.http.get<Response<Class[]>>(`${environment.apiUrl}/classes/teacher/${_id_teacher}`).pipe(map(response => {
            return response.response.data;
        }));
    }

    /**
     * POST Class.
     * @param classs Class to create
     */
    createClass(classs: Class): Observable<null> {
        return this.http.post<Response<null>>(`${environment.apiUrl}/classes`, classs).pipe(map(response => {
            return response.response.data;
        }));
    }

    /**
     * UPDATE Class.
     * @param classs Class to update
     */
    updateClass(classs: Class): Observable<null> {
        return this.http.put<Response<null>>(`${environment.apiUrl}/classes`, classs).pipe(map(response => {
            return response.response.data;
        }));
    }

    /**
     * DELETE Class.
     * @param _id Id of the Class to delete
     */
    deleteClass(_id: number): Observable<null> {
        return this.http.delete<Response<null>>(`${environment.apiUrl}/classes/${_id}`).pipe(map((response) => {
            return response.response.data;
        }));
    }

    /**
     * POST Class Note.
     * @param classs Class to create note for
     * @param note Note to create (only has content)
     */
    createClassNote(classs: Class, note: Note): Observable<Note> {
        return this.http.post<Response<Note>>(`${environment.apiUrl}/classes/${classs._id}/note`, note).pipe(map(response => {
                return response.response.data;
            })
        );
    }

    /**
     * UPDATE Class Note.
     * @param note Original note to update
     * @param updatedNote Updated note (only has content)
     */
    updateClassNote(note: Note, updatedNote: Note): Observable<Note> {
        return this.http.put<Response<Note>>(`${environment.apiUrl}/classes/note/${note._id}`, updatedNote).pipe(map(response => {
                return response.response.data;
            })
        );
    }

    /**
     * DELETE Note.
     * @param _id Id of the Note to delete
     */
    deleteNote(_id: number): Observable<null> {
        return this.http.delete<Response<null>>(`${environment.apiUrl}/classes/note/${_id}`).pipe(map((response) => {
            return response.response.data;
        }));
    }

    /**
     * POST Student Class Note.
     * @param classs Class to create note for
     * @param student Student to associate the Note to
     * @param note Note to create (only has content)
     */
    createStudentClassNote(classs: Class, student: Student, note: Note): Observable<Note> {
        return this.http.post<Response<Note>>(`${environment.apiUrl}/classes/${classs._id}/note/student/${student._id}`, note).pipe(
            map(response => {
                return response.response.data;
            })
        );
    }

    /**
     * POST Evaluation Component (the backend can determine what evaluation components will be created, updated and deleted)
     * @param evaluationComponents Evaluation Components to CUD
     */
    sendEvaluationComponents(evaluationComponents: EvaluationComponent[]): Observable<null> {
        return this.http.post<Response<null>>(`${environment.apiUrl}/classes/evaluationComponent`, evaluationComponents).pipe(
            map(response => {
                return response.response.data;
            })
        );
    }
}
