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
  private form: FormGroup;
  private medicalProcedures: Array<MedicalProcedure> = [];
  private selectedDoctor: Doctor;
  private submitted = false;
  private title: string;
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

  ngOnInit() {
    this.form = this.formBuilder.group({
      medicalProcedureId: ['', Validators.required],
      updateOperation: [this.updateOperationType]
    });
    this.getMedicalProcedures();
  }

  getMedicalProcedures() {
    if (this.updateOperationType === UpdateOperation.ADD) {
      this.medicalProcedureService.getMedicalProcedureList().subscribe(
        mpList => this.medicalProcedures = mpList.filter(mp => !this.selectedDoctor.medicalProcedures.includes(mp.name)));
    } else if (this.updateOperationType === UpdateOperation.DELETE) {
      this.medicalProcedureService.getMedicalProcedureList().subscribe(
        mpList => this.medicalProcedures = mpList.filter(mp => this.selectedDoctor.medicalProcedures.includes(mp.name)));
    }
  }

  onSubmit() {
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

  addMedicalProcedure() {
    this.doctorService.updateMedicalProceduresWithinDoctor(this.selectedDoctor.id.toString(), this.form.value).subscribe(
      success => this.dialogRef.close({event: DialogEvent.ADD_MEDICAL_PROCEDURE})
    );
  }

  deleteMedicalProcedure() {
    this.doctorService.updateMedicalProceduresWithinDoctor(this.selectedDoctor.id.toString(), this.form.value).subscribe(
      success => this.dialogRef.close({event: DialogEvent.DELETE_MEDICAL_PROCEDURE})
    );
  }

  closeDialog(): void {
    this.dialogRef.close({event: DialogEvent.CLOSE});
  }

  isAddOperationType() {
    return this.updateOperationType === UpdateOperation.ADD;
  }

}

interface DialogData {
  title: string;
  doctor: Doctor;
  updateOperationType: UpdateOperation;
}
