import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogCreateEditNoteComponent} from './dialog-create-edit-note.component';

describe('DialogCreateEditNoteComponent', () => {
    let component: DialogCreateEditNoteComponent;
    let fixture: ComponentFixture<DialogCreateEditNoteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DialogCreateEditNoteComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogCreateEditNoteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
