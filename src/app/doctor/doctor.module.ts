import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DoctorScreenComponent} from './components/doctor-screen/doctor-screen.component';
import {DoctorListComponent} from './components/doctor-list/doctor-list.component';
import {CreateEditDoctorDialogComponent} from './components/create-edit-doctor-dialog/create-edit-doctor-dialog.component';
import {DeleteDialogComponent} from '../shared/components/delete-dialog/delete-dialog.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material-module';
import {SharedModule} from '../shared/shared.module';
import { NewMpDialogComponent } from './components/new-mp-dialog/new-mp-dialog.component';


@NgModule({
  declarations: [DoctorScreenComponent, DoctorListComponent, CreateEditDoctorDialogComponent, NewMpDialogComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
  entryComponents: [
    CreateEditDoctorDialogComponent,
    DeleteDialogComponent,
    NewMpDialogComponent
  ]
})
export class DoctorModule {
}
