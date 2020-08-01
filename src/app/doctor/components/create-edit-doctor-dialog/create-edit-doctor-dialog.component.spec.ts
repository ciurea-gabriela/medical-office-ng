import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditDoctorDialogComponent } from './create-edit-doctor-dialog.component';

describe('CreateEditDoctorDialogComponent', () => {
  let component: CreateEditDoctorDialogComponent;
  let fixture: ComponentFixture<CreateEditDoctorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditDoctorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditDoctorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
