import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MedicalProcedure} from '../../model/medical-procedure.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicalProcedureService {

  private medicalProceduresUri = 'https://medical-office-app.herokuapp.com/medical-procedures';

  constructor(private http: HttpClient) {
  }

  getMedicalProcedure(id: string): Observable<MedicalProcedure> {
    return this.http.get<MedicalProcedure>(this.medicalProceduresUri + `/${id}`);
  }

  getMedicalProcedureList(): Observable<MedicalProcedure[]> {
    return this.http.get<MedicalProcedure[]>(this.medicalProceduresUri);
  }

  createMedicalProcedure(medicalProcedure: MedicalProcedure): Observable<MedicalProcedure> {
    return this.http.post<MedicalProcedure>(this.medicalProceduresUri, medicalProcedure);
  }

  editMedicalProcedure(medicalProcedure: MedicalProcedure): Observable<{}> {
    return this.http.put(this.medicalProceduresUri + `/${medicalProcedure.id}`, medicalProcedure);

  }

  deleteMedicalProcedure(id: string): Observable<{}> {
    return this.http.delete(this.medicalProceduresUri + `/${id}`);
  }
}
