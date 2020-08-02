import {Component, OnInit, ViewChild} from '@angular/core';
import {CreateEditAppointmentDialogComponent} from '../create-edit-appointment-dialog/create-edit-appointment-dialog.component';
import {DialogEvent} from '../../../model/enums/dialog-event.enum';
import {MatDialog} from '@angular/material/dialog';
import {AppointmentListComponent} from '../appointment-list/appointment-list.component';
import {AppointmentViewType} from '../../../model/enums/appointment-view-type.enum';

@Component({
  selector: 'app-all-appointments-screen',
  templateUrl: './all-appointments-screen.component.html',
  styleUrls: ['./all-appointments-screen.component.scss']
})
export class AllAppointmentsScreenComponent implements OnInit {
  @ViewChild(AppointmentListComponent) private appointmentListComponent: AppointmentListComponent;
  public appointmentViewTypeALL = AppointmentViewType.ALL;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CreateEditAppointmentDialogComponent, {
      width: '250px',
      data: {
        title: 'Create',
        type: DialogEvent.ADD_APPOINTMENT
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.event === DialogEvent.ADD_APPOINTMENT) {
        this.appointmentListComponent.snackBar.openSnackBar('Appointment created successfully!', 'close');
        this.appointmentListComponent.getAllAppointmentList();
      }
    });
  }

}
