import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SeeClassComponent} from './see-class.component';

describe('SeeClassComponent', () => {
    let component: SeeClassComponent;
    let fixture: ComponentFixture<SeeClassComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SeeClassComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SeeClassComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
