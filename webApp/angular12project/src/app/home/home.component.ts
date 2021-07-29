import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService, User } from "../user.service";
import {Doctor, DoctorService} from "../doctor.service";
import {Patient, PatientService} from "../patient.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  home_doctor = false;
  navbar = false;
  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: ''};
  doc: Doctor = {_id: '', dob: Date.prototype, mail: '', phone: '', role: ''};
  //pat: Patient = {_id: '', dob: Date.prototype, mail: '', phone: '', dor: Date.prototype, address: ''};

  constructor(private router: Router, private userService: UserService, private doctorService: DoctorService, private patintService: PatientService) {
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
    if(this.user.type == 'DOCTOR'){
      this.home_doctor = true;
      this.navbar = true;
      this.doc = this.doctorService.getDoctor();
    }
  }

}
