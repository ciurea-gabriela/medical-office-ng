import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogEvent} from 'src/app/model/enums/dialog-event.enum';
import {AppointmentListComponent} from '../appointment-list/appointment-list.component';
import {CreateEditAppointmentDialogComponent} from '../create-edit-appointment-dialog/create-edit-appointment-dialog.component';
import {PatientService} from 'src/app/core/services/patient.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Patient} from 'src/app/model/patient.interface';
import {AppointmentViewType} from '../../../model/enums/appointment-view-type.enum';

@Component({
  selector: 'app-appointment-screen',
  templateUrl: './appointment-screen.component.html',
  styleUrls: ['./appointment-screen.component.scss']
})
export class AppointmentScreenComponent implements OnInit {
  public patientId: string;
  public selectedPatient: Patient;
  public isDataLoaded = false;
  public appointmentViewTypePatient = AppointmentViewType.PATIENT;

  @ViewChild(AppointmentListComponent) private appointmentListComponent: AppointmentListComponent;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private patientService: PatientService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.patientId = params.get('id');
      this.patientService.getPatient(this.patientId).subscribe(patient => {
        this.selectedPatient = patient;
        this.isDataLoaded = true;
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateEditAppointmentDialogComponent, {
      width: '250px',
      data: {patientId: this.patientId, title: 'Create', type: DialogEvent.CREATE}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.event === DialogEvent.CREATE) {
        this.appointmentListComponent.snackBar.openSnackBar('Appointment created successfully!', 'close');
        this.appointmentListComponent.getAppointmentList(this.patientId);
      }
    });
  }

}
