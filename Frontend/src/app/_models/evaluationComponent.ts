import {Criteria} from './criteria';
import {Student} from './student';

export class EvaluationComponent {
    _id: number;
    grade: number;
    _id_criteria: number;
    _id_student: number;
    Criterion: Criteria;
    Student: Student;

    /**
     * Creates an Evaluation Component associated with a Criteria
     * @param _id_criteria Evaluation Component Criteria
     * @param _id_student Evaluation Component Student
     */
    constructor(_id_criteria: number, _id_student: number) {
        this._id_criteria = _id_criteria;
        this._id_student = _id_student;
    }
}
