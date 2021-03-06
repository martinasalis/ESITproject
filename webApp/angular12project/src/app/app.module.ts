import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HttpClientModule } from "@angular/common/http";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { PageInfoComponent } from './page-info/page-info.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PatientComponent } from './patient/patient.component';
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { NoticeDialogComponent } from './notice-dialog/notice-dialog.component';
import { ModifyFormComponent } from './modify-form/modify-form.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { AddFormComponent } from "./add-form/add-form.component";
import { MatRadioModule } from "@angular/material/radio";
import { MatMenuModule } from "@angular/material/menu";
import { PageSensorComponent } from './page-sensor/page-sensor.component';
import { MACAddressComponent } from './mac-address/mac-address.component';
import { MatFileUploadModule } from "angular-material-fileupload";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent,
    PageInfoComponent,
    NavbarComponent,
    PatientComponent,
    ModifyFormComponent,
    PatientComponent,
    NoticeDialogComponent,
    AddFormComponent,
    PageSensorComponent,
    MACAddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    MatMenuModule,
    MatFileUploadModule,
    MatCardModule,
    MatSelectModule,
    ChartsModule
  ],
  providers: [
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
