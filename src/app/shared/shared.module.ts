import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {LogoComponent} from './components/logo/logo.component';
import {DeleteDialogComponent} from './components/delete-dialog/delete-dialog.component';
import {MaterialModule} from '../material-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';


@NgModule({
  declarations: [
    ErrorPageComponent,
    LogoComponent,
    DeleteDialogComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  exports: [
    MenuComponent,
    LogoComponent,
    DeleteDialogComponent
  ]
})
export class SharedModule {
}
