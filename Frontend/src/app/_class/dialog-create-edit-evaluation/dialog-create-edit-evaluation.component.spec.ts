import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogCreateEditEvaluationComponent} from './dialog-create-edit-evaluation.component';

describe('DialogCreateEditEvaluationComponent', () => {
    let component: DialogCreateEditEvaluationComponent;
    let fixture: ComponentFixture<DialogCreateEditEvaluationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DialogCreateEditEvaluationComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogCreateEditEvaluationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
