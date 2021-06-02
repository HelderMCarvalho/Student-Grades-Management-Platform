import {Class} from './class';

export class Note {
    _id: number;
    content: string;
    Classes: Class[];
    Student_Classes: [];

    constructor(content: string) {
        this.content = content;
    }
}
