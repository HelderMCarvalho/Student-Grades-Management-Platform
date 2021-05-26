import {Class} from './class';
import {EvaluationComponent} from './evaluationComponent';

export class Student {
    _id: number;
    firstName: string;
    lastName: string;
    code: number;
    photo_blob: string;
    EvaluationComponents: EvaluationComponent[];
    Classes: Class[];

    /**
     * Create Student only with Id.
     * @param _id Id of the Student
     */
    constructor(_id: number) {
        this._id = _id;
    }
}
