import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClassService} from '../class.service';
import {Subscription} from 'rxjs/Subscription';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Class} from '../../_models/class';
import {MatDialog} from '@angular/material/dialog';
import {DialogCreateEditNoteComponent} from '../dialog-create-edit-note/dialog-create-edit-note.component';
import {Note} from '../../_models/note';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
    selector: 'app-see-class',
    templateUrl: './see-class.component.html',
    styleUrls: ['./see-class.component.css']
})
export class SeeClassComponent implements OnInit, OnDestroy {

    // Subscriptions aggregator, push all "subscribes" here to be able to destroy all of them at once
    subscriptions: Subscription[] = [];

    classs: Class = new Class();
    classForm: FormGroup;

    constructor(public activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, public dialog: MatDialog,
                public clipboard: Clipboard, private classService: ClassService) { }

    ngOnInit(): void {
        this.classForm = this.formBuilder.group({
            inputCourse: [{value: null, disabled: true}, Validators.required],
            inputSubject: [{value: null, disabled: true}, Validators.required],
            inputYear: [{value: null, disabled: true}, Validators.required],
            inputFrequencyRegime: [{value: null, disabled: true}, Validators.required],
            inputLectiveYear: [{value: null, disabled: true}, Validators.required]
        });

        this.subscriptions.push(
            this.classService.getClass(+this.activatedRoute.snapshot.paramMap.get('_id_class')).subscribe(classs => {
                this.classs = classs;
                this.classForm.get('inputCourse').setValue(classs.Subject.Course.name);
                this.classForm.get('inputSubject').setValue(classs.Subject.name);
                this.classForm.get('inputYear').setValue(classs.Year.name);
                this.classForm.get('inputFrequencyRegime').setValue(classs.FrequencyRegime.name);
                this.classForm.get('inputLectiveYear').setValue(classs.lective_year);
            })
        );
    }

    ngOnDestroy() {
        // Destroy all subscriptions
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    /**
     * Open Note modal/dialog to create or update note
     * @param data Class (to add Note) or Note (to update Note)
     * @param type Operation to execute (new_note_class -> Create new Note in Class | update_note -> Update note)
     */
    openDialog(data: Class | Note, type: string): void {
        switch (type) {
            case 'new_note_class': {
                this.subscriptions.push(
                    this.dialog.open(DialogCreateEditNoteComponent).afterClosed().subscribe(result => {
                        this.subscriptions.push(
                            this.classService.createClassNote(data as Class, new Note(result)).subscribe(note => {
                                this.classs.Notes.push(note);
                            }, () => {
                                this.clipboard.copy(result);
                                alert('Note not created and not added with success!\nDon\'t worry, your Note is not lost, we copied it ' +
                                    'to your clipboard.\nBe happy and paste it wherever you want!');
                            })
                        );
                    })
                );
                break;
            }
            case 'update_note': {
                this.subscriptions.push(
                    this.dialog.open(DialogCreateEditNoteComponent, {data: data}).afterClosed().subscribe(result => {
                        this.subscriptions.push(
                            this.classService.updateClassNote(data as Note, new Note(result)).subscribe(note => {
                                this.classs.Notes.find(classNote => classNote._id === note._id).content = note.content;
                            }, () => {
                                this.clipboard.copy(result);
                                alert('Note not updated with success!\nDon\'t worry, your Note is not lost, we copied it to your ' +
                                    'clipboard.\nBe happy and paste it wherever you want!');
                            })
                        );
                    })
                );
                break;
            }
        }
    }

    /**
     * Deletes a Note
     * @param _id Id of the Note to delete
     */
    deleteNote(_id: number) {
        this.subscriptions.push(
            this.classService.deleteNote(_id).subscribe(() => {
                this.classs.Notes.splice(this.classs.Notes.indexOf(this.classs.Notes.find(note => note._id === _id)), 1);
            }, () => alert('Error deleting the Note!'))
        );
    }
}
