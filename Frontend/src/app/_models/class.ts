import {Subject} from './subject';
import {Teacher} from './teacher';
import {FrequencyRegime} from './frequencyRegime';
import {Year} from './year';
import {Student} from './student';
import {Criteria} from './criteria';
import {Note} from './note';

export class Class {
    _id: number;
    lective_year: string;
    _id_subject: number;
    _id_teacher: number;
    _id_frequency_regime: number;
    _id_year: number;
    Subject: Subject;
    Teacher: Teacher;
    FrequencyRegime: FrequencyRegime;
    Year: Year;
    Criteria: Criteria[];
    Notes: Note[] = [];
    Students: Student[];

    /**
     * Create a Class.
     * @param _id_teacher Id of the teacher
     * @param _id_subject Id of the Subject
     * @param _id_year Year of the Class ((1) 1st, (2) 2nd or (3) 3rd)
     * @param _id_frequency_regime Frequency Regime of the Class ((1) Daytime or (2) Nighttime)
     * @param lective_year Lective year of the Course (20/21)
     * @param students Students in the Class
     * @param _id Id of the Class
     */
    constructor(_id_teacher?: number, _id_subject?: number, _id_year?: number, _id_frequency_regime?: number,
                lective_year?: string, students?: Student[], _id?: number) {
        this._id = _id;
        this._id_teacher = _id_teacher;
        this._id_subject = _id_subject;
        this._id_year = _id_year;
        this._id_frequency_regime = _id_frequency_regime;
        this.lective_year = lective_year;
        this.Students = students;
    }
}
