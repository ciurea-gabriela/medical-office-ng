import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogEvent} from '../../../model/enums/dialog-event.enum';
import {Doctor} from '../../../model/doctor.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SnackBarUtil} from '../../../util/SnackBarUtil';
import {DoctorService} from '../../../core/services/doctor.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MedicalProcedureService} from '../../../core/services/medical-procedure.service';
import {MedicalProcedure} from '../../../model/medical-procedure.interface';

@Component({
  selector: 'app-create-edit-doctor-dialog',
  templateUrl: './create-edit-doctor-dialog.component.html',
  styleUrls: ['./create-edit-doctor-dialog.component.scss']
})
export class CreateEditDoctorDialogComponent implements OnInit {
  public doctorForm: FormGroup;
  public title: string;
  readonly dialogType: DialogEvent;
  private selectedDoctor?: Doctor;
  private emptyDoctor: Doctor = {
    name: '',
    cnp: '',
    sex: null,
    specialization: '',
    phoneNumber: ''
  };
  private submitted = false;
  public medicalProcedures: Array<MedicalProcedure> = [];

  constructor(private dialogRef: MatDialogRef<CreateEditDoctorDialogComponent>,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private data: DialogData,
              private doctorService: DoctorService,
              private medicalProcedureService: MedicalProcedureService,
              private snackBar: SnackBarUtil) {
    this.title = data.title;
    this.dialogType = data.type;
    this.selectedDoctor = data.doctor || this.emptyDoctor;
  }

  ngOnInit(): void {
    this.doctorForm = this.formBuilder.group({
      name: [this.selectedDoctor.name, Validators.required],
      cnp: [this.selectedDoctor.cnp,
        [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]],
      sex: [this.selectedDoctor.sex, Validators.required],
      specialization: [this.selectedDoctor.specialization],
      phoneNumber: [this.selectedDoctor.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      medicalProcedureId: ['', Validators.required]
    });
    if (this.dialogType === DialogEvent.CREATE) {
      this.getMedicalProcedures();
    }
  }

  public onSubmit(): void {
    if (this.dialogType === DialogEvent.EDIT) {
      this.doctorForm.removeControl('medicalProcedureId');
    }
    this.submitted = true;
    if (this.doctorForm.invalid) {
      return;
    }
    if (this.dialogType === DialogEvent.CREATE) {
      this.createDoctor();
    } else if (this.dialogType === DialogEvent.EDIT) {
      this.editDoctor();
    }
  }

  private createDoctor(): void {
    this.doctorService.createDoctor(this.doctorForm.value).subscribe(
      () => this.dialogRef.close({event: DialogEvent.CREATE}),
      (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.snackBar.openSnackBar('Cnp already in use.', 'close');
        }
      }
    );
  }

  private editDoctor(): void {
    this.doctorForm.addControl('id', new FormControl([this.selectedDoctor.id]));
    this.doctorService.editDoctor(this.doctorForm.value).subscribe(
      () => this.dialogRef.close({event: DialogEvent.EDIT}),
      (err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.snackBar.openSnackBar('Cnp already in use.', 'close');
        }
      }
    );
  }

  public closeDialog(): void {
    this.dialogRef.close({event: DialogEvent.CLOSE});
  }

  public isCreateDialog(): boolean {
    return this.dialogType === DialogEvent.CREATE;
  }

  private getMedicalProcedures() {
    this.medicalProcedureService.getMedicalProcedureList().subscribe(mpList => this.medicalProcedures = mpList);
  }
}

interface DialogData {
  title: string;
  type: DialogEvent;
  doctor?: Doctor;
}
