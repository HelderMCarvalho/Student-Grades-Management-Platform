export class Class {
    _id: number;
    _id_teacher: number;
    _id_course: number;
    _id_subject: number;
    year: number;
    frequency_regime: number;
    lective_year: string;
    // anotações[]
    // critérios de avaliação[]
    students: StudentPerClass[] = [];

    /**
     * Create a Class.
     * @param _id_teacher Id of the teacher
     * @param _id_course Id of the Course
     * @param _id_subject Id of the Subject
     * @param year Year of the Class ((1) 1st, (2) 2nd or (3) 3rd)
     * @param frequency_regime Frequency Regime of the Class ((1) Daytime or (2) Nighttime)
     * @param lective_year Lective year of the Course (20/21)
     * @param students Students in the Class (array of StudentPerClass)
     */
    constructor(_id_teacher: number, _id_course: number, _id_subject: number, year: number, frequency_regime: number, lective_year: string,
                students?: StudentPerClass[]) {
        this._id_teacher = _id_teacher;
        this._id_course = _id_course;
        this._id_subject = _id_subject;
        this.year = year;
        this.frequency_regime = frequency_regime;
        this.lective_year = lective_year;
        students?.forEach(student => this.students.push(student));
    }
}

export class StudentPerClass {
    _id: number;
    // componente de avaliação[]
    // anotações[]

    /**
     * Create a StudentPerClass.
     * @param _id Id of the Student
     */
    constructor(_id: number) {
        this._id = _id;
    }
}
