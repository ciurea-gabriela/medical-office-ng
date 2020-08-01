import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material-module';
import {CoreModule} from '../core/core.module';
import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [HomeScreenComponent],
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
  exports: [
    HomeScreenComponent
  ]
})
export class HomeModule { }
