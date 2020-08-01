import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {Appointment} from 'src/app/model/appointment.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private localHost = 'https://medical-office-app.herokuapp.com/patients/';

  private simpleLocalHost = 'https://medical-office-app.herokuapp.com/';

  constructor(private http: HttpClient) {
  }

  getAppointmentList(patientId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.localHost + `${patientId}/appointments`);
  }

  getAllAppointmentList(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.simpleLocalHost + `appointments`);
  }

  createAppointment(patientId: string, appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.localHost + `${patientId}/appointments`, appointment);
  }

  editAppointmentWithPatient(patientId: string, appointment: Appointment): Observable<{}> {
    return this.http.put(this.localHost + `${patientId}/appointments/${appointment.id}`, appointment);
  }

  editAppointment(appointment: Appointment): Observable<{}> {
    return this.http.put(this.simpleLocalHost + `appointments/${appointment.id}`, appointment);
  }

  deleteAppointment(patientId: string, appointmentId: string): Observable<{}> {
    return this.http.delete(this.localHost + `${patientId}/appointments/${appointmentId}`);
  }
}
