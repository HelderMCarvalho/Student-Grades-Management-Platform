import {Class} from './class';
import {EvaluationComponent} from './evaluationComponent';

export class Criteria {
    _id: number;
    name: string;
    percentage: number;
    _id_class: number;
    Class: Class;
    EvaluationComponent: EvaluationComponent;

    constructor(name: string, percentage: number) {
        this.name = name;
        this.percentage = percentage;
    }
}
