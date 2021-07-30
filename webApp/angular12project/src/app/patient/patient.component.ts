import { Component, OnInit } from '@angular/core';
import {User, UserService} from "../user.service";
import {Doctor, DoctorService} from "../doctor.service";
import {Patient, PatientService} from "../patient.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  navbar = false;
  page_patient = false;
  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: ''};
  pat: Patient = {_id: '', dob: Date.prototype, mail: '', phone: '', dor: Date.prototype, address: ''};

  constructor(private router: Router, private userService: UserService, private doctorService: DoctorService, private patientService: PatientService) {
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
    if(this.user.type == 'PATIENT'){
      this.page_patient = true;
      this.navbar = true;
      this.patientService.info(this.user._id).subscribe((data: Patient) => {
        this.patientService.setPatient(data);
        this.pat = this.patientService.getPatient();
        console.log(data);
      });
    }
  }

}
