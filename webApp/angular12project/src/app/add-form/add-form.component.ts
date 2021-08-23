import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Type, User, UserService} from "../user.service";
import {Doctor, DoctorService, Notice} from "../doctor.service";
import {Patient, PatientService} from "../patient.service";
import {Router} from "@angular/router";
import * as moment from "moment";
import {MatButton} from "@angular/material/button";
import {findAttributeOnElementWithTag} from "@angular/cdk/schematics";

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  add_doctor = false;
  add_patient = false;
  add_sensor = false;
  button = Number();

  username = new FormControl('');
  name = new FormControl('');
  surname = new FormControl('');
  mail = new FormControl('');
  dob = new FormControl('');
  tc = new FormControl('');
  phone = new FormControl('');
  dor = new FormControl('');
  address = new FormControl('');
  role = new FormControl('');
  doctor = new FormControl('');

  patientDoctor: String = '';

  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};
  doc: Doctor = {_id: '', dob: Date.prototype, mail: '', phone: '', role: '', notice: Notice.DEFAULT};
  pat: Patient = {_id: '', dob: Date.prototype, mail: '', phone: '', dor: Date.prototype, address: '', doctor: ''};
  clickedRow: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};

  constructor(private userService: UserService, private router: Router, private doctorService: DoctorService,
              private patientService: PatientService) {
    this.user = this.userService.getUser();
    this.button = this.router.getCurrentNavigation()?.extras.state?.data;
  }

  ngOnInit(): void {

    if(this.button == 0){
      this.add_doctor = true;
    }else if(this.button == 1){
      this.add_patient = true;
    }else{
      this.add_sensor = true;
    }

  }

  add(){

    // Check if the user is a patient or a doctor
    if(this.add_doctor) {
      let newUser: User = {_id: this.tc.value, name: this.name.value, surname: this.surname.value, username: this.username.value, password: '', type: Type.DOCTOR};
      this.userService.insert(newUser).subscribe(data => {
        console.log(data);
      });

      let newDoctor: Doctor = {_id: this.tc.value, dob: this.dob.value, mail: this.mail.value, phone: this.phone.value, role: this.role.value, notice: Notice.DEFAULT};
      this.doctorService.insert(newDoctor).subscribe(data => {
        console.log(data);
      });
    }
    else if(this.add_patient) {

      let newUser: User = {_id: this.tc.value, name: this.name.value, surname: this.surname.value, username: this.username.value, password: '', type: Type.PATIENT};
      this.userService.insert(newUser).subscribe(data => {
        console.log(data);
      });


      let newPatient: Patient = {_id: this.tc.value, dob: this.dob.value, mail: this.mail.value, phone: this.phone.value, dor: this.dor.value, address: this.address.value, doctor: this.doctor.value};
      this.patientService.insert(newPatient).subscribe(data => {
        console.log(data);
      });
    }
    else{

    }
  }

}