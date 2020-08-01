import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PatientScreenComponent} from './patient/components/patient-screen/patient-screen.component';
import {ErrorPageComponent} from './shared/components/error-page/error-page.component';
import {AppointmentScreenComponent} from './appointment/components/appointment-screen/appointment-screen.component';
import {MedicalProcedureScreenComponent} from './medical-procedure/components/medical-procedure-screen/medical-procedure-screen.component';
import {DoctorScreenComponent} from './doctor/components/doctor-screen/doctor-screen.component';
import {AllAppointmentsScreenComponent} from './appointment/components/all-appointments-screen/all-appointments-screen.component';
import {HomeScreenComponent} from './home/components/home-screen/home-screen.component';


const routes: Routes = [
  {path: 'home', component: HomeScreenComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'patients', component: PatientScreenComponent},
  {path: 'appointments', component: AllAppointmentsScreenComponent},
  {path: 'patients/:id/appointments', component: AppointmentScreenComponent},
  {path: 'medical-procedures', component: MedicalProcedureScreenComponent},
  {path: 'doctors', component: DoctorScreenComponent},
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
