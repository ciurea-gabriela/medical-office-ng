import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Doctor} from '../../model/doctor.interface';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private localHost = 'https://medical-office-app.herokuapp.com/doctors';

  constructor(private http: HttpClient) {
  }

  getDoctor(id: string): Observable<Doctor> {
    return this.http.get<Doctor>(this.localHost + `/${id}`);
  }

  getDoctorListWithMedicalProcedure(medicalProcedureId: string): Observable<Doctor[]> {
    const params = new HttpParams().set('medicalProcedureId', medicalProcedureId);
    return this.http.get<Doctor[]>(this.localHost, {params});
  }

  getDoctorList(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.localHost);
  }

  createDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.localHost, doctor);
  }

  editDoctor(doctor: Doctor): Observable<{}> {
    return this.http.put<{}>(this.localHost + `/${doctor.id}`, doctor);

  }

  deleteDoctor(id: string): Observable<{}> {
    return this.http.delete(this.localHost + `/${id}`);
  }

  updateMedicalProceduresWithinDoctor(doctorId: string, updateDTO): Observable<{}> {
    return this.http.patch(this.localHost + `/${doctorId}/procedures`, updateDTO);
  }
}
