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
import {Student} from '../../_models/student';

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
     * @param type Operation to execute
     *             - new_note_class -> Create Note in Class
     *             - update_note -> Update note
     *             - new_note_class_student -> Create Note for Student in Class
     * @param student Student to add Note (only used when adding a Student Note in a Specific Class)
     */
    openDialog(data: Class | Note, type: string, student?: Student): void {
        switch (type) {
            case 'new_note_class': {
                this.subscriptions.push(
                    this.dialog.open(DialogCreateEditNoteComponent).afterClosed().subscribe(result => {
                        if (result) {
                            this.subscriptions.push(
                                this.classService.createClassNote(data as Class, new Note(result)).subscribe(note => {
                                    this.classs.Notes.push(note);
                                }, () => {
                                    this.clipboard.copy(result);
                                    alert('Note not created with success!\nDon\'t worry, your Note is not lost, we copied it ' +
                                        'to your clipboard.\nBe happy and paste it wherever you want!');
                                })
                            );
                        }
                    })
                );
                break;
            }
            case 'update_note': {
                this.subscriptions.push(
                    this.dialog.open(DialogCreateEditNoteComponent, {data: data}).afterClosed().subscribe(result => {
                        if (result) {
                            this.subscriptions.push(
                                this.classService.updateClassNote(data as Note, new Note(result)).subscribe(note => {
                                    if (student) {
                                        this.classs.Students[this.classs.Students.indexOf(student)].Student_Class.Notes.find(
                                            studentClassNote => studentClassNote._id === note._id).content = note.content;
                                    } else {
                                        this.classs.Notes.find(classNote => classNote._id === note._id).content = note.content;
                                    }
                                }, () => {
                                    this.clipboard.copy(result);
                                    alert('Note not updated with success!\nDon\'t worry, your Note is not lost, we copied it to your ' +
                                        'clipboard.\nBe happy and paste it wherever you want!');
                                })
                            );
                        }
                    })
                );
                break;
            }
            case 'new_note_class_student': {
                this.subscriptions.push(
                    this.dialog.open(DialogCreateEditNoteComponent).afterClosed().subscribe(result => {
                        if (result) {
                            this.subscriptions.push(
                                this.classService.createStudentClassNote(data as Class, student, new Note(result)).subscribe(note => {
                                    this.classs.Students[this.classs.Students.indexOf(student)].Student_Class.Notes.push(note);
                                }, () => {
                                    this.clipboard.copy(result);
                                    alert('Note not created with success!\nDon\'t worry, your Note is not lost, we copied it to your ' +
                                        'clipboard.\nBe happy and paste it wherever you want!');
                                })
                            );
                        }
                    })
                );
                break;
            }
        }
    }

    /**
     * Deletes a Note
     * @param note Note to delete
     * @param student Student to which the Note belongs
     */
    deleteNote(note: Note, student?: Student) {
        this.subscriptions.push(
            this.classService.deleteNote(note._id).subscribe(() => {
                if (student) {
                    this.classs.Students[this.classs.Students.indexOf(student)].Student_Class.Notes.splice(
                        this.classs.Students[this.classs.Students.indexOf(student)].Student_Class.Notes.indexOf(note), 1
                    );
                } else {
                    this.classs.Notes.splice(this.classs.Notes.indexOf(note), 1);
                }
            }, () => alert('Error deleting the Note!'))
        );
    }
}
