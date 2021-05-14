import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateEditClassComponent} from './create-edit-class.component';

describe('CreateEditClassComponent', () => {
  let component: CreateEditClassComponent;
  let fixture: ComponentFixture<CreateEditClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditClassComponent]
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
