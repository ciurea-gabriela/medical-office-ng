import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DoctorService} from '../../../core/services/doctor.service';
import {MedicalProcedureService} from '../../../core/services/medical-procedure.service';
import {MedicalProcedure} from '../../../model/medical-procedure.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogEvent} from '../../../model/enums/dialog-event.enum';
import {Doctor} from '../../../model/doctor.interface';
import {UpdateOperation} from '../../../model/enums/update-operation.enum';

@Component({
  selector: 'app-new-mp-dialog',
  templateUrl: './new-mp-dialog.component.html',
  styleUrls: ['./new-mp-dialog.component.scss']
})
export class NewMpDialogComponent implements OnInit {
  public form: FormGroup;
  public medicalProcedures: Array<MedicalProcedure> = [];
  public selectedDoctor: Doctor;
  private submitted = false;
  public title: string;
  private readonly updateOperationType: UpdateOperation;

  constructor(private dialogRef: MatDialogRef<NewMpDialogComponent>,
              private formBuilder: FormBuilder,
              private doctorService: DoctorService,
              private medicalProcedureService: MedicalProcedureService,
              @Inject(MAT_DIALOG_DATA) private data: DialogData) {
    this.selectedDoctor = data.doctor;
    this.updateOperationType = data.updateOperationType;
    this.title = data.title;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      medicalProcedureId: ['', Validators.required],
      updateOperation: [this.updateOperationType]
    });
    this.getMedicalProcedures();
  }

  private getMedicalProcedures(): void {
    if (this.updateOperationType === UpdateOperation.ADD) {
      this.medicalProcedureService.getMedicalProcedureList().subscribe(
        mpList => this.medicalProcedures = mpList.filter(mp => !this.selectedDoctor.medicalProcedures.includes(mp.name)));
    } else if (this.updateOperationType === UpdateOperation.DELETE) {
      this.medicalProcedureService.getMedicalProcedureList().subscribe(
        mpList => this.medicalProcedures = mpList.filter(mp => this.selectedDoctor.medicalProcedures.includes(mp.name)));
    }
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.updateOperationType === UpdateOperation.ADD) {
      this.addMedicalProcedure();
    } else if (this.updateOperationType === UpdateOperation.DELETE) {
      this.deleteMedicalProcedure();
    }
  }

  private addMedicalProcedure(): void {
    this.doctorService.updateMedicalProceduresWithinDoctor(this.selectedDoctor.id.toString(), this.form.value).subscribe(
      () => this.dialogRef.close({event: DialogEvent.ADD_MEDICAL_PROCEDURE})
    );
  }

  private deleteMedicalProcedure(): void {
    this.doctorService.updateMedicalProceduresWithinDoctor(this.selectedDoctor.id.toString(), this.form.value).subscribe(
      () => this.dialogRef.close({event: DialogEvent.DELETE_MEDICAL_PROCEDURE})
    );
  }

  public closeDialog(): void {
    this.dialogRef.close({event: DialogEvent.CLOSE});
  }

  public isAddOperationType(): boolean {
    return this.updateOperationType === UpdateOperation.ADD;
  }

}

interface DialogData {
  title: string;
  doctor: Doctor;
  updateOperationType: UpdateOperation;
}
