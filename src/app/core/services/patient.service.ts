import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Patient} from '../../model/patient.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private localHost = 'https://medical-office-app.herokuapp.com/patients';

  constructor(private http: HttpClient) {
  }

  getPatient(id: string): Observable<Patient> {
    return this.http.get<Patient>(this.localHost + `/${id}`);
  }

  getPatientList(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.localHost);
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.localHost, patient);
  }

  editPatient(patient: Patient): Observable<{}> {
    return this.http.put(this.localHost + `/${patient.id}`, patient);

  }

  deletePatient(id: string): Observable<{}> {
    return this.http.delete(this.localHost + `/${id}`);
  }

}
