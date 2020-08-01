import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {AppointmentService} from '../../../core/services/appointment.service';
import {DialogEvent} from 'src/app/model/enums/dialog-event.enum';
import {MedicalProcedureService} from '../../../core/services/medical-procedure.service';
import {DoctorService} from '../../../core/services/doctor.service';
import {Appointment} from '../../../model/appointment.interface';
import {Doctor} from '../../../model/doctor.interface';
import {PatientService} from '../../../core/services/patient.service';
import {Patient} from '../../../model/patient.interface';
import {MedicalProcedure} from '../../../model/medical-procedure.interface';

@Component({
  selector: 'app-create-appointment-dialog',
  templateUrl: './create-edit-appointment-dialog.component.html',
  styleUrls: ['./create-edit-appointment-dialog.component.scss']
})
export class CreateEditAppointmentDialogComponent implements OnInit {
  private appointmentForm: FormGroup;
  private submitted = false;
  private patientId: string;
  private title: string;
  readonly dialogType: DialogEvent;
  private selectedAppointment: Appointment;
  private medicalProcedures: Array<MedicalProcedure> = [];
  private doctors: Array<Doctor> = [];
  private patients: Array<Patient> = [];
  private emptyAppointment: Appointment = {
    status: null,
    startTime: null,
    endTime: null,
    description: '-',
    medicalProcedureId: '',
    doctorId: '',
    patientId: ''
  };

  constructor(
    private dialogRef: MatDialogRef<CreateEditAppointmentDialogComponent>,
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private medicalProcedureService: MedicalProcedureService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: DialogData) {
    this.patientId = data.patientId;
    this.title = data.title;
    this.dialogType = data.type;
    this.selectedAppointment = data.appointment || this.emptyAppointment;
  }

  ngOnInit() {
    this.appointmentForm = this.formBuilder.group({
      status: [this.selectedAppointment.status, Validators.required],
      startTime: [this.selectedAppointment.startTime, Validators.required],
      endTime: [this.selectedAppointment.endTime, Validators.required],
      description: [this.selectedAppointment.description],
      medicalProcedureId: [this.selectedAppointment.medicalProcedureId, Validators.required],
      doctorId: [{value: this.selectedAppointment.doctorId, disabled: true}, Validators.required],
      patientId: [this.selectedAppointment.patientId, Validators.required]
    });
    if (this.dialogType === DialogEvent.EDIT) {
      this.enableDoctor();
    }
    if (this.dialogType === DialogEvent.ADD_APPOINTMENT) {
      this.getPatients();
    }
    if (this.dialogType === DialogEvent.EDIT_APPOINTMENT) {
      this.enableDoctor();
      this.getPatients();
    }
    this.getMedicalProcedures();
    this.onChanges();
  }

  enableDoctor() {
    this.appointmentForm.get('doctorId').enable();
    this.getDoctors();
  }

  onChanges(): void {
    this.appointmentForm.get('medicalProcedureId').valueChanges.subscribe(val => {
      this.enableDoctor();
    });
  }

  getPatients() {
    this.patientService.getPatientList().subscribe(patients => {
      this.patients = patients;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.appointmentForm.invalid) {
      return;
    }
    if (this.dialogType === DialogEvent.CREATE) {
      this.createAppointmentForSpecificPatient();
    } else if (this.dialogType === DialogEvent.EDIT) {
      this.editAppointmentForSpecificPatient();
    } else if (this.dialogType === DialogEvent.ADD_APPOINTMENT) {
      this.addAppointment();
    } else if (this.dialogType === DialogEvent.EDIT_APPOINTMENT) {
      this.editAppointment();
    }
  }

  createAppointmentForSpecificPatient() {
    this.appointmentService.createAppointment(this.patientId, this.appointmentForm.value).subscribe(
      success => {
        this.dialogRef.close({event: DialogEvent.CREATE});
      }
    );
  }

  addAppointment() {
    this.appointmentService.createAppointment(this.appointmentForm.value.patientId, this.appointmentForm.value).subscribe(
      success => {
        this.dialogRef.close({event: DialogEvent.ADD_APPOINTMENT});
      }
    );
  }

  editAppointmentForSpecificPatient() {
    this.appointmentForm.addControl('id', new FormControl([this.selectedAppointment.id]));
    this.appointmentService.editAppointmentWithPatient(this.patientId, this.appointmentForm.value).subscribe(
      success => {
        this.dialogRef.close({event: DialogEvent.EDIT});
      }
    );
  }

  editAppointment() {
    this.appointmentForm.addControl('id', new FormControl([this.selectedAppointment.id]));
    this.appointmentService.editAppointment(this.appointmentForm.value).subscribe(
      success => {
        this.dialogRef.close({event: DialogEvent.EDIT_APPOINTMENT});
      }
    );
  }

  closeDialog() {
    this.dialogRef.close({event: DialogEvent.CLOSE});
  }

  getMedicalProcedures() {
    this.medicalProcedureService.getMedicalProcedureList().subscribe(mpList => this.medicalProcedures = mpList);
  }

  getDoctors() {
    this.doctorService.getDoctorListWithMedicalProcedure(this.appointmentForm.value.medicalProcedureId).subscribe(
      doctors => this.doctors = doctors);
  }

  isAddDialog(): boolean {
    return this.dialogType === DialogEvent.ADD_APPOINTMENT || this.dialogType === DialogEvent.EDIT_APPOINTMENT;
  }
}

interface DialogData {
  patientId: string;
  title: string;
  type: DialogEvent;
  appointment?: Appointment;
}
