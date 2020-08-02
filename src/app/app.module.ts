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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RequestFilter} from './security/request-filter';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';


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
    HomeModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestFilter,
      multi: true
    },
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
