import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Patient} from '../../model/patient.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patientsUri = 'https://medical-office-app.herokuapp.com/patients';

  constructor(private http: HttpClient) {
  }

  getPatient(id: string): Observable<Patient> {
    return this.http.get<Patient>(this.patientsUri + `/${id}`);
  }

  getPatientList(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientsUri);
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.patientsUri, patient);
  }

  editPatient(patient: Patient): Observable<{}> {
    return this.http.put(this.patientsUri + `/${patient.id}`, patient);

  }

  deletePatient(id: string): Observable<{}> {
    return this.http.delete(this.patientsUri + `/${id}`);
  }

}
