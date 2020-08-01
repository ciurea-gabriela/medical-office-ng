import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogEvent} from '../../../model/enums/dialog-event.enum';
import {MedicalProcedure} from '../../../model/medical-procedure.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MedicalProcedureService} from '../../../core/services/medical-procedure.service';

@Component({
  selector: 'app-create-edit-mp-dialog',
  templateUrl: './create-edit-mp-dialog.component.html',
  styleUrls: ['./create-edit-mp-dialog.component.scss']
})
export class CreateEditMpDialogComponent implements OnInit {
  public medicalProcedureForm: FormGroup;
  public title: string;
  readonly dialogType: DialogEvent;
  private selectedMedicalProcedure?: MedicalProcedure;
  private emptyMedicalProcedure: MedicalProcedure = {
    name: '',
    price: null,
    description: ''
  };
  private submitted = false;

  constructor(
    private dialogRef: MatDialogRef<CreateEditMpDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private medicalProcedureService: MedicalProcedureService
  ) {
    this.title = data.title;
    this.dialogType = data.type;
    this.selectedMedicalProcedure = data.medicalProcedure || this.emptyMedicalProcedure;
  }

  ngOnInit(): void {
    this.medicalProcedureForm = this.formBuilder.group({
      name: [this.selectedMedicalProcedure.name, Validators.required],
      price: [this.selectedMedicalProcedure.price, Validators.required],
      description: [this.selectedMedicalProcedure.description]
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.medicalProcedureForm.invalid) {
      return;
    }
    if (this.dialogType === DialogEvent.CREATE) {
      this.createMedicalProcedure();
    } else if (this.dialogType === DialogEvent.EDIT) {
      this.editMedicalProcedure();
    }
  }

  public closeDialog(): void {
    this.dialogRef.close({event: DialogEvent.CLOSE});
  }

  private createMedicalProcedure(): void {
    this.medicalProcedureService.createMedicalProcedure(this.medicalProcedureForm.value).subscribe(
      () => this.dialogRef.close({event: DialogEvent.CREATE})
    );
  }

  private editMedicalProcedure(): void {
    this.medicalProcedureForm.addControl('id', new FormControl([this.selectedMedicalProcedure.id]));
    this.medicalProcedureService.editMedicalProcedure(this.medicalProcedureForm.value).subscribe(
      () => this.dialogRef.close({event: DialogEvent.EDIT})
    );
  }
}

interface DialogData {
  title: string;
  type: DialogEvent;
  medicalProcedure?: MedicalProcedure;
}
