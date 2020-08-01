import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material-module';
import {SharedModule} from '../shared/shared.module';
import {DeleteDialogComponent} from '../shared/components/delete-dialog/delete-dialog.component';
import {MedicalProcedureScreenComponent} from './components/medical-procedure-screen/medical-procedure-screen.component';
import {MedicalProcedureCardComponent} from './components/medical-procedure-card/medical-procedure-card.component';
import {CreateEditMpDialogComponent} from './components/create-edit-mp-dialog/create-edit-mp-dialog.component';
import {MedicalProcedureCardListComponent} from './components/medical-procedure-card-list/medical-procedure-card-list.component';


@NgModule({
  declarations: [
    MedicalProcedureScreenComponent,
    MedicalProcedureCardComponent,
    CreateEditMpDialogComponent,
    MedicalProcedureCardListComponent],
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
    CreateEditMpDialogComponent,
    DeleteDialogComponent
  ]
})
export class MedicalProcedureModule {
}
