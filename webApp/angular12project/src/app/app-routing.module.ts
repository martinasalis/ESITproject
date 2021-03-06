import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from "./login-form/login-form.component";
import { HomeComponent } from "./home/home.component";
import { PageInfoComponent } from "./page-info/page-info.component";
import { PatientComponent } from "./patient/patient.component";
import { ModifyFormComponent } from "./modify-form/modify-form.component";
import { AddFormComponent } from "./add-form/add-form.component";
import { PageSensorComponent } from "./page-sensor/page-sensor.component";
import { MACAddressComponent } from "./mac-address/mac-address.component";

const routes: Routes = [
  {path: '', component: LoginFormComponent},
  {path: 'home', component: HomeComponent},
  {path: 'page-info', component: PageInfoComponent},
  {path: 'patient', component: PatientComponent},
  {path: 'modify-form', component: ModifyFormComponent},
  {path: 'add-form', component: AddFormComponent},
  {path: 'page-sensor', component: PageSensorComponent},
  {path: 'mac-address', component: MACAddressComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
