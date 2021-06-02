import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Note} from '../../_models/note';

@Component({
    selector: 'app-dialog-create-edit-note',
    templateUrl: './dialog-create-edit-note.component.html',
    styleUrls: ['./dialog-create-edit-note.component.css']
})
export class DialogCreateEditNoteComponent {

    newNote: string;

    constructor(public dialogRef: MatDialogRef<DialogCreateEditNoteComponent>, @Inject(MAT_DIALOG_DATA) public data: Note) {
        if (data) {
            this.newNote = data.content;
        }
    }

    onNoClick() {
        this.dialogRef.close();
    }
}
