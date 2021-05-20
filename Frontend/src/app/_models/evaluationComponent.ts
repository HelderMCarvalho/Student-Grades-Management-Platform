import {Criteria} from './criteria';
import {Student} from './student';

export class EvaluationComponent {
    _id: number;
    grade: number;
    _id_criteria: number;
    _id_student: number;
    Criterion: Criteria;
    Student: Student;
}
