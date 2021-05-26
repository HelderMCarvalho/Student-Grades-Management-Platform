import {Class} from './class';

export class Teacher {
    _id: number;
    firstName: string;
    lastName: string;
    code: number;
    email: string;
    password: string;
    photo_blob: string;
    Classes: Class[];

    /**
     * Create new Teacher.
     * @param email Teacher email
     * @param code Teacher code
     * @param password Teacher password
     * @param firstName Teacher first name
     * @param lastName Teacher last name
     */
    constructor(email: string, code: number, password: string, firstName: string, lastName: string) {
        this.email = email;
        this.code = code;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
