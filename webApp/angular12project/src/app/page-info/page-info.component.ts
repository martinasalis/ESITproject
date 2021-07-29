import { Component, OnInit } from '@angular/core';
import {User, UserService} from "../user.service";
import {Router} from "@angular/router";
import {Doctor, DoctorService} from "../doctor.service";
import {Patient, PatientService} from "../patient.service";

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.css']
})
export class PageInfoComponent implements OnInit {

  navbar = false;
  home_doctor = false;
  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: ''};
  doc: Doctor = {_id: '', dob: Date.prototype, mail: '', phone: '', role: ''};
  //pat: Patient = {_id: '', dob: Date.prototype, mail: '', phone: '', dor: Date.prototype, address: ''};

  constructor(private router: Router, private userService: UserService, private doctorService: DoctorService, private patientService: PatientService) {
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
    if(this.user.type == 'DOCTOR'){
      console.log(this.user);
      this.home_doctor = true;
      this.navbar = true;
      this.doctorService.info(this.user._id).subscribe((data: Doctor) => {
        this.doctorService.setDoctor(data);
        console.log(data);
        this.doc = this.doctorService.getDoctor();
      });

    }
  }

}
