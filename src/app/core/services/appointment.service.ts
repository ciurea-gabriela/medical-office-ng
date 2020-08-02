import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {Appointment} from 'src/app/model/appointment.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private patientsUri = 'https://medical-office-app.herokuapp.com/patients/';

  private simpleApi = 'https://medical-office-app.herokuapp.com/';

  constructor(private http: HttpClient) {
  }

  getAppointmentList(patientId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.patientsUri + `${patientId}/appointments`);
  }

  getAllAppointmentList(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.simpleApi + `appointments`);
  }

  createAppointment(patientId: string, appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.patientsUri + `${patientId}/appointments`, appointment);
  }

  editAppointmentWithPatient(patientId: string, appointment: Appointment): Observable<{}> {
    return this.http.put(this.patientsUri + `${patientId}/appointments/${appointment.id}`, appointment);
  }

  editAppointment(appointment: Appointment): Observable<{}> {
    return this.http.put(this.simpleApi + `appointments/${appointment.id}`, appointment);
  }

  deleteAppointment(patientId: string, appointmentId: string): Observable<{}> {
    return this.http.delete(this.patientsUri + `${patientId}/appointments/${appointmentId}`);
  }
}
