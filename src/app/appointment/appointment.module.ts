import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppointmentListComponent} from './components/appointment-list/appointment-list.component';
import {AppointmentScreenComponent} from './components/appointment-screen/appointment-screen.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material-module';
import {CoreModule} from '../core/core.module';
import {AppRoutingModule} from '../app-routing.module';
import {CreateEditAppointmentDialogComponent} from './components/create-edit-appointment-dialog/create-edit-appointment-dialog.component';
import {SharedModule} from '../shared/shared.module';
import {DeleteDialogComponent} from '../shared/components/delete-dialog/delete-dialog.component';
import {AllAppointmentsScreenComponent} from './components/all-appointments-screen/all-appointments-screen.component';


@NgModule({
  declarations: [
    AppointmentListComponent,
    AppointmentScreenComponent,
    CreateEditAppointmentDialogComponent,
    AllAppointmentsScreenComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule,
    AppRoutingModule,
    SharedModule
  ],
  entryComponents: [
    CreateEditAppointmentDialogComponent,
    DeleteDialogComponent
  ]
})
export class AppointmentModule {
}
