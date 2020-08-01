import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MedicalProcedure} from '../../model/medical-procedure.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicalProcedureService {

  private localHost = 'https://medical-office-app.herokuapp.com/medical-procedures';

  constructor(private http: HttpClient) {
  }

  getMedicalProcedure(id: string): Observable<MedicalProcedure> {
    return this.http.get<MedicalProcedure>(this.localHost + `/${id}`);
  }

  getMedicalProcedureList(): Observable<MedicalProcedure[]> {
    return this.http.get<MedicalProcedure[]>(this.localHost);
  }

  createMedicalProcedure(medicalProcedure: MedicalProcedure): Observable<MedicalProcedure> {
    return this.http.post<MedicalProcedure>(this.localHost, medicalProcedure);
  }

  editMedicalProcedure(medicalProcedure: MedicalProcedure): Observable<{}> {
    return this.http.put(this.localHost + `/${medicalProcedure.id}`, medicalProcedure);

  }

  deleteMedicalProcedure(id: string): Observable<{}> {
    return this.http.delete(this.localHost + `/${id}`);
  }
}
