import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {MedicalProcedureModule} from './medical-procedure/medical-procedure.module';
import {DoctorModule} from './doctor/doctor.module';
import {AppointmentModule} from './appointment/appointment.module';
import {HomeModule} from './home/home.module';
import {PatientModule} from './patient/patient.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PatientModule,
    AppointmentModule,
    MedicalProcedureModule,
    DoctorModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
