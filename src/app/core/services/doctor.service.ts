import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Doctor} from '../../model/doctor.interface';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private doctorsUri = 'https://medical-office-app.herokuapp.com/doctors';

  constructor(private http: HttpClient) {
  }

  getDoctor(id: string): Observable<Doctor> {
    return this.http.get<Doctor>(this.doctorsUri + `/${id}`);
  }

  getDoctorListWithMedicalProcedure(medicalProcedureId: string): Observable<Doctor[]> {
    const params = new HttpParams().set('medicalProcedureId', medicalProcedureId);
    return this.http.get<Doctor[]>(this.doctorsUri, {params});
  }

  getDoctorList(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.doctorsUri);
  }

  createDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.doctorsUri, doctor);
  }

  editDoctor(doctor: Doctor): Observable<{}> {
    return this.http.put<{}>(this.doctorsUri + `/${doctor.id}`, doctor);

  }

  deleteDoctor(id: string): Observable<{}> {
    return this.http.delete(this.doctorsUri + `/${id}`);
  }

  updateMedicalProceduresWithinDoctor(doctorId: string, updateDTO): Observable<{}> {
    return this.http.patch(this.doctorsUri + `/${doctorId}/procedures`, updateDTO);
  }
}
