import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Type, User, UserService} from "../user.service";
import {Doctor, DoctorService, Notice} from "../doctor.service";
import {Patient, PatientService} from "../patient.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-page-sensor',
  templateUrl: './page-sensor.component.html',
  styleUrls: ['./page-sensor.component.css']
})
export class PageSensorComponent implements OnInit {

  navbar = false;
  page_doctor = false;
  page_patient = false;
  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};
  doc: Doctor = {_id: '', dob: Date.prototype, mail: '', phone: '', role: '', notice: Notice.DEFAULT, img: {data: File.prototype, contentType: ""}};
  pat: Patient = {_id: '', dob: Date.prototype, mail: '', phone: '', dor: Date.prototype, address: '', doctor: '', description: ''};

  constructor(private router: Router, private userService: UserService, private doctorService: DoctorService,
              private patientService: PatientService, public dialog: MatDialog) {
    if(JSON.parse(sessionStorage.getItem('login')!)) {
      this.user = JSON.parse(sessionStorage.getItem('user')!);
    }
    else {
      this.router.navigate(['']).then();
    }
  }

  ngOnInit(): void {
    if(this.user.type == Type.DOCTOR){
      this.page_doctor = true;
      this.doc = this.doctorService.getDoctor();
    }
    else if(this.user.type == Type.PATIENT){
      this.page_patient = true;
      this.pat = this.patientService.getPatient();
    }
  }

}
