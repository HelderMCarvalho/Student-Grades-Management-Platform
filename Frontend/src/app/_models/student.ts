import {Class} from './class';
import {EvaluationComponent} from './evaluationComponent';
import {StudentClass} from './studentClass';

export class Student {
    _id: number;
    firstName: string;
    lastName: string;
    code: number;
    photo_blob: string;
    EvaluationComponents: EvaluationComponent[];
    Student_Class: StudentClass;
    Classes: Class[];

    /**
     * Create Student only with Id.
     * @param _id Id of the Student
     */
    constructor(_id: number) {
        this._id = _id;
    }
}
