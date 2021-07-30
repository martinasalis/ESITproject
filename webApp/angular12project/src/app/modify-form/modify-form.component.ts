import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {User, UserService} from "../user.service";
import {Doctor, DoctorService} from "../doctor.service";
import {Router} from "@angular/router";
import {Patient, PatientService} from "../patient.service";

@Component({
  selector: 'app-modify-form',
  templateUrl: './modify-form.component.html',
  styleUrls: ['./modify-form.component.css']
})
export class ModifyFormComponent implements OnInit {

  username = new FormControl('');
  name = new FormControl('');
  surname = new FormControl('');
  mail = new FormControl('');
  dob = new FormControl('');
  tc = new FormControl('');
  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: ''};
  doc: Doctor = {_id: '', dob: Date.prototype, mail: '', phone: '', role: ''};
  pat: Patient = {_id: '', dob: Date.prototype, mail: '', phone: '', dor: Date.prototype, address: ''};

  constructor(private userService: UserService, private router: Router, private doctorService: DoctorService, private patientService: PatientService) {
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
    this.save();
  }

  save(): void {
    if(this.user.type == 'DOCTOR') {
      this.doctorService.info(this.user._id).subscribe((data: Doctor) => {
        this.doctorService.update(this.user._id, data);
        console.log(data);
        this.doc = this.doctorService.getDoctor();
      });
    }
    else if(this.user.type == 'PATIENT') {
      this.patientService.info(this.user._id).subscribe((data: Patient) => {
        this.patientService.update(this.user._id, data);
        console.log(data);
        this.pat = this.patientService.getPatient();
      });
    }
  }

}
