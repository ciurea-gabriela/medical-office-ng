import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PatientListComponent} from './components/patient-list/patient-list.component';
import {PatientScreenComponent} from './components/patient-screen/patient-screen.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material-module';
import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';
import {DeleteDialogComponent} from '../shared/components/delete-dialog/delete-dialog.component';
import { CreateEditPatientDialogComponent } from './components/create-edit-patient-dialog/create-edit-patient-dialog.component';


@NgModule({
  declarations: [
    PatientListComponent,
    PatientScreenComponent,
    CreateEditPatientDialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
  ],
  entryComponents: [
    DeleteDialogComponent,
    CreateEditPatientDialogComponent
  ]
})
export class PatientModule {
}
