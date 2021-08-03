import { Component, OnInit } from '@angular/core';
import { User, UserService, Type } from "../user.service";
import { Router } from "@angular/router";
import { Doctor, DoctorService } from "../doctor.service";
import { Patient, PatientService } from "../patient.service";

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.css']
})
export class PageInfoComponent implements OnInit {

  navbar = false;
  home_doctor = false;
  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};
  doc: Doctor = {_id: '', dob: Date.prototype, mail: '', phone: '', role: ''};
  pat: Patient = {_id: '', dob: Date.prototype, mail: '', phone: '', dor: Date.prototype, address: '', doctor: ''};

  constructor(private router: Router, private userService: UserService, private doctorService: DoctorService,
              private patientService: PatientService) {
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
    if(this.user.type == Type.DOCTOR){
      console.log(this.user);
      this.navbar = true;
      this.home_doctor = true;
      this.doctorService.info(this.user._id).subscribe((data: Doctor) => {
        this.doctorService.setDoctor(data);
        this.doc = this.doctorService.getDoctor();
      });
    }
    else if(this.user.type == Type.ADMIN){
      this.navbar = true;
      this.home_doctor = true;
    }
  }

}
