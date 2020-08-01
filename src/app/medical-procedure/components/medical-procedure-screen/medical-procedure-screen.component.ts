import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MedicalProcedureCardListComponent} from '../medical-procedure-card-list/medical-procedure-card-list.component';
import {CreateEditMpDialogComponent} from '../create-edit-mp-dialog/create-edit-mp-dialog.component';
import {DialogEvent} from '../../../model/enums/dialog-event.enum';
import {SnackBarUtil} from '../../../util/SnackBarUtil';

@Component({
  selector: 'app-medical-procedure-screen',
  templateUrl: './medical-procedure-screen.component.html',
  styleUrls: ['./medical-procedure-screen.component.scss']
})
export class MedicalProcedureScreenComponent implements OnInit {
  @ViewChild(MedicalProcedureCardListComponent) private medicalProcedureCardListComponent: MedicalProcedureCardListComponent;

  constructor(private dialog: MatDialog,
              private snackBar: SnackBarUtil) {
  }

  ngOnInit(): void {
  }

  public openCreateMedicalProcedureDialog(): void {
    const dialogRef = this.dialog.open(CreateEditMpDialogComponent, {
      width: '300px',
      data: {title: 'Create', type: DialogEvent.CREATE}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === DialogEvent.CREATE) {
        this.snackBar.openSnackBar('Medical Procedure created successfully', 'close');
        this.medicalProcedureCardListComponent.getMedicalProcedureList();
      }
    });
  }

}
