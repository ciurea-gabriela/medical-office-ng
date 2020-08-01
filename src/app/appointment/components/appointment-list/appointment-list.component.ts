import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Appointment} from 'src/app/model/appointment.interface';
import {AppointmentService} from '../../../core/services/appointment.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogEvent} from 'src/app/model/enums/dialog-event.enum';
import {DeleteDialogComponent} from '../../../shared/components/delete-dialog/delete-dialog.component';
import {SnackBarUtil} from '../../../util/SnackBarUtil';
import {CreateEditAppointmentDialogComponent} from '../create-edit-appointment-dialog/create-edit-appointment-dialog.component';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {AppointmentViewType} from '../../../model/enums/appointment-view-type.enum';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
  private displayedColumns: string[];
  @Input() patientId: string;
  @Input() appointmentViewType: AppointmentViewType;
  private selectedAppointmentId: number;
  private isPatientPresent: boolean;
  private selectedAppointment: Appointment;
  private dataSource: MatTableDataSource<Appointment>;
  private dialogType: DialogEvent;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
    public snackBar: SnackBarUtil) {
  }

  ngOnInit() {
    this.getDialogType();
    if (isNotNullOrUndefined(this.patientId)) {
      this.getAppointmentList(this.patientId);
      this.isPatientPresent = true;
    } else {
      this.getAllAppointmentList();
    }
    this.getDisplayedColumns();
  }

  getDisplayedColumns() {
    if (this.isPatientPresent) {
      this.displayedColumns = ['no', 'status', 'startTime', 'endTime', 'description', 'doctor', 'medicalProcedure', 'edit', 'delete'];
    } else {
      this.displayedColumns = ['no', 'patientName', 'status', 'startTime', 'endTime', 'description',
        'doctor', 'medicalProcedure', 'edit', 'delete'];
    }
  }

  getAllAppointmentList() {
    this.appointmentService.getAllAppointmentList().subscribe(appointments => {
      this.dataSource = new MatTableDataSource<Appointment>(appointments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  getAppointmentList(patientId: string): void {
    this.appointmentService.getAppointmentList(patientId).subscribe(appointments => {
      this.dataSource = new MatTableDataSource<Appointment>(appointments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  openEditDialog(appointment: Appointment): void {
    const dialogRef = this.dialog.open(CreateEditAppointmentDialogComponent, {
      width: '250px',
      data: {patientId: this.patientId || appointment.patientId, title: 'Edit', type: this.dialogType, appointment}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === DialogEvent.EDIT) {
        this.snackBar.openSnackBar('Appointment updated successfully!', 'close');
        this.getAppointmentList(this.patientId);
      } else if (result.event === DialogEvent.EDIT_APPOINTMENT) {
        this.snackBar.openSnackBar('Appointment updated successfully!', 'close');
        this.getAllAppointmentList();
      }
    });
  }

  openDeleteDialog(appointment: Appointment): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {title: 'Appointment', name: 'this appointment'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appointmentService.deleteAppointment(appointment.patientId, appointment.id.toString()).subscribe(
          success => {
            if (this.appointmentViewType === AppointmentViewType.PATIENT) {
              this.snackBar.openSnackBar('Appointment deleted successfully!', 'close');
              this.getAppointmentList(this.patientId);
            } else if (this.appointmentViewType === AppointmentViewType.ALL) {
              this.snackBar.openSnackBar('Appointment deleted successfully!', 'close');
              this.getAllAppointmentList();
            }
          });
      }
    });
  }

  selectRow(appointment: Appointment) {
    if (appointment.id === this.selectedAppointmentId) {
      this.selectedAppointmentId = -1;
    } else {
      this.selectedAppointment = appointment;
      this.selectedAppointmentId = appointment.id;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDialogType() {
    if (this.appointmentViewType === AppointmentViewType.ALL) {
      this.dialogType = DialogEvent.EDIT_APPOINTMENT;
    } else if (this.appointmentViewType === AppointmentViewType.PATIENT){
      this.dialogType = DialogEvent.EDIT;
    }
  }
}
