import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from "./login-form/login-form.component";
import { HomeComponent } from "./home/home.component";
import { PageInfoComponent } from "./page-info/page-info.component";
import {PatientComponent} from "./patient/patient.component";

const routes: Routes = [
  {path: '', component: LoginFormComponent},
  {path: 'home', component: HomeComponent},
  {path: 'page-info', component: PageInfoComponent},
  {path: 'patient', component: PatientComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
