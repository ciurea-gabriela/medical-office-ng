import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {PatientListComponent} from '../patient-list/patient-list.component';
import {DialogEvent} from 'src/app/model/enums/dialog-event.enum';
import {CreateEditPatientDialogComponent} from '../create-edit-patient-dialog/create-edit-patient-dialog.component';

@Component({
  selector: 'app-patient-screen',
  templateUrl: './patient-screen.component.html',
  styleUrls: ['./patient-screen.component.scss']
})
export class PatientScreenComponent implements OnInit {

  @ViewChild(PatientListComponent) patientListComponent: PatientListComponent;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateEditPatientDialogComponent, {
      width: '250px',
      data: {title: 'Create', type: DialogEvent.CREATE}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === DialogEvent.CREATE) {
        this.patientListComponent.snackBar.openSnackBar('Patient created successfully!', 'close');
        this.patientListComponent.getPatientList();
      }
    });
  }
}
