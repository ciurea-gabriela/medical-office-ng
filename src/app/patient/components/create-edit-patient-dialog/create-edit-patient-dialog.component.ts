import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PatientService} from '../../../core/services/patient.service';
import {DialogEvent} from '../../../model/enums/dialog-event.enum';
import {HttpErrorResponse} from '@angular/common/http';
import {Patient} from '../../../model/patient.interface';
import {SnackBarUtil} from '../../../util/SnackBarUtil';

@Component({
  selector: 'app-create-edit-patient-dialog',
  templateUrl: './create-edit-patient-dialog.component.html',
  styleUrls: ['./create-edit-patient-dialog.component.scss']
})
export class CreateEditPatientDialogComponent implements OnInit {
  public patientForm: FormGroup;
  public title: string;
  readonly dialogType: DialogEvent;
  private selectedPatient?: Patient;
  private emptyPatient: Patient = {
    firstName: '',
    lastName: '',
    birthDate: null,
    cnp: '',
    sex: null,
    city: '',
    phoneNumber: ''
  };
  private submitted = false;
  public minDate: Date = new Date(1910, 0, 1);
  public maxDate: Date = new Date();

  constructor(
    private dialogRef: MatDialogRef<CreateEditPatientDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private patientService: PatientService,
    private snackBar: SnackBarUtil
  ) {
    this.title = data.title;
    this.dialogType = data.type;
    this.selectedPatient = data.patient || this.emptyPatient;
  }

  ngOnInit(): void {
    this.patientForm = this.formBuilder.group({
      firstName: [this.selectedPatient.firstName, Validators.required],
      lastName: [this.selectedPatient.lastName, Validators.required],
      birthDate: [this.selectedPatient.birthDate],
      cnp: [this.selectedPatient.cnp,
        [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]],
      sex: [this.selectedPatient.sex, Validators.required],
      city: [this.selectedPatient.city],
      phoneNumber: [this.selectedPatient.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(12)]]
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.patientForm.invalid) {
      return;
    }
    if (this.dialogType === DialogEvent.CREATE) {
      this.createPatient();
    } else if (this.dialogType === DialogEvent.EDIT) {
      this.editPatient();
    }
  }

  public closeDialog(): void {
    this.dialogRef.close({event: DialogEvent.CLOSE});
  }

  private createPatient(): void {
    this.patientService.createPatient(this.patientForm.value).subscribe(
      () => this.dialogRef.close({event: DialogEvent.CREATE}),
      (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.snackBar.openSnackBar('Cnp already in use.', 'close');
        }
      }
    );
  }

  private editPatient(): void {
    this.patientForm.addControl('id', new FormControl([this.selectedPatient.id]));
    this.patientService.editPatient(this.patientForm.value).subscribe(
      () => this.dialogRef.close({event: DialogEvent.EDIT}),
      (err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.snackBar.openSnackBar('Cnp already in use.', 'close');
        }
      }
    );
  }
}

interface DialogData {
  title: string;
  type: DialogEvent;
  patient?: Patient;
}
