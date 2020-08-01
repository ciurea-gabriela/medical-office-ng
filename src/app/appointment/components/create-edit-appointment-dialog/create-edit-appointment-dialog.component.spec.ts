import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditAppointmentDialogComponent } from './create-edit-appointment-dialog.component';

describe('CreateAppointmentDialogComponent', () => {
  let component: CreateEditAppointmentDialogComponent;
  let fixture: ComponentFixture<CreateEditAppointmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditAppointmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditAppointmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
