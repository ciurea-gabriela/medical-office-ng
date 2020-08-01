import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditPatientDialogComponent } from './create-edit-patient-dialog.component';

describe('CreateEditDialogComponent', () => {
  let component: CreateEditPatientDialogComponent;
  let fixture: ComponentFixture<CreateEditPatientDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditPatientDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditPatientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
