import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MedicalProcedure} from '../../../model/medical-procedure.interface';
import {DialogEvent} from '../../../model/enums/dialog-event.enum';
import {CreateEditMpDialogComponent} from '../create-edit-mp-dialog/create-edit-mp-dialog.component';
import {SnackBarUtil} from '../../../util/SnackBarUtil';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../../../shared/components/delete-dialog/delete-dialog.component';
import {MedicalProcedureService} from '../../../core/services/medical-procedure.service';

@Component({
  selector: 'app-medical-procedure-card',
  templateUrl: './medical-procedure-card.component.html',
  styleUrls: ['./medical-procedure-card.component.scss']
})
export class MedicalProcedureCardComponent implements OnInit {
  @Input() public medicalProcedure: MedicalProcedure;
  @Output() public refreshList: EventEmitter<boolean> = new EventEmitter();

  constructor(public snackBar: SnackBarUtil,
              private dialog: MatDialog,
              private medicalProcedureService: MedicalProcedureService) {
  }

  ngOnInit(): void {
  }

  public openEditDialog(): void {
    const dialogRef = this.dialog.open(CreateEditMpDialogComponent, {
      width: '300px',
      data: {title: 'Edit', type: DialogEvent.EDIT, medicalProcedure: this.medicalProcedure}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.event === DialogEvent.EDIT) {
        this.snackBar.openSnackBar('Medical Procedure updated successfully!', 'close');
        this.refreshList.emit(true);
      }
    });
  }

  public openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {title: 'Medical Procedure', name: this.medicalProcedure.name}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.medicalProcedureService.deleteMedicalProcedure(this.medicalProcedure.id.toString()).subscribe(
          () => {
            this.snackBar.openSnackBar('Medical procedure deleted successfully!', 'close');
            this.refreshList.emit(true);
          }
        );
      }
    });
  }
}
