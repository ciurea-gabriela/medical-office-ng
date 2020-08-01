import {Component, OnInit, ViewChild} from '@angular/core';
import {DoctorListComponent} from '../doctor-list/doctor-list.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogEvent} from '../../../model/enums/dialog-event.enum';
import {CreateEditDoctorDialogComponent} from '../create-edit-doctor-dialog/create-edit-doctor-dialog.component';

@Component({
  selector: 'app-doctor-screen',
  templateUrl: './doctor-screen.component.html',
  styleUrls: ['./doctor-screen.component.scss']
})
export class DoctorScreenComponent implements OnInit {

  @ViewChild(DoctorListComponent) private doctorListComponent: DoctorListComponent;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CreateEditDoctorDialogComponent, {
      width: '300px',
      data: {title: 'Create', type: DialogEvent.CREATE}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === DialogEvent.CREATE) {
        this.doctorListComponent.snackBar.openSnackBar('Doctor created successfully!', 'close');
        this.doctorListComponent.getDoctorList();
      }
    });
  }

}
