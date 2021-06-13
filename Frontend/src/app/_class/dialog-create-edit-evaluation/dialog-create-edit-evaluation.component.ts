import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Student} from '../../_models/student';
import {Criteria} from '../../_models/criteria';
import {EvaluationComponent} from '../../_models/evaluationComponent';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-dialog-create-edit-evaluation',
    templateUrl: './dialog-create-edit-evaluation.component.html',
    styleUrls: ['./dialog-create-edit-evaluation.component.css']
})
export class DialogCreateEditEvaluationComponent {

    evaluationComponentsForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<DialogCreateEditEvaluationComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { student: Student, criterion: Criteria[] }) {
        // Form Inputs object
        const group = {};

        if (data.student.EvaluationComponents.length === 0) {
            // If the Student doesn't have any Evaluation Components, then create them and create the form inputs
            data.criterion.forEach(criteria => {
                data.student.EvaluationComponents.push(new EvaluationComponent(criteria._id, data.student._id));
                group['input' + criteria.name] = new FormControl(null, [Validators.min(0), Validators.max(20)]);
            });
        } else {
            // If the Student has some Evaluation Components, then create the form inputs with the grade
            data.criterion.forEach(criteria => {
                const evaluationComp = this.data.student.EvaluationComponents.find(evaluationComponent =>
                    evaluationComponent._id_criteria === criteria._id);
                if (evaluationComp) {
                    group['input' + criteria.name] = new FormControl(evaluationComp.grade, [Validators.min(0), Validators.max(20)]);
                } else {
                    // If the Student doesnt have all the Evaluation Components for the Class, then create them and create the form inputs
                    data.student.EvaluationComponents.push(new EvaluationComponent(criteria._id, data.student._id));
                    group['input' + criteria.name] = new FormControl(null, [Validators.min(0), Validators.max(20)]);
                }
            });
        }
        // Create the form with the inputs
        this.evaluationComponentsForm = new FormGroup(group);
    }

    /**
     * Close the Dialog but send the Evaluation Components out
     */
    onSaveClick() {
        this.data.criterion.forEach(criteria => {
            this.data.student.EvaluationComponents.find(evaluationComponent => evaluationComponent._id_criteria === criteria._id).grade =
                this.evaluationComponentsForm.get('input' + criteria.name).value;
        });
        this.dialogRef.close(this.data.student.EvaluationComponents);
    }

    /**
     * Close the Dialog
     */
    onCancelClick() {
        this.dialogRef.close();
    }
}
