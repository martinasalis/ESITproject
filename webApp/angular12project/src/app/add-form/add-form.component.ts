import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Type, User, UserService} from "../user.service";
import {Doctor, DoctorService, Notice} from "../doctor.service";
import {Patient, PatientService} from "../patient.service";
import {Router} from "@angular/router";
import * as moment from "moment";

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  add_doctor = false;
  add_patient = false;

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
  }

  ngOnInit(): void {


    // Set values
    /*
    this.name.setValue(this.clickedRow.name);
    this.surname.setValue(this.clickedRow.surname);
    this.username.setValue(this.clickedRow.username);
    this.tc.setValue(this.clickedRow._id);

    if(this.clickedRow.type == Type.DOCTOR) {
      this.add_doctor = true;

      // Set current values
      this.doctorService.info(this.clickedRow._id).subscribe((data: Doctor) => {
        this.dob.setValue(moment(new Date(data.dob)).format('YYYY-MM-DD'));
        this.mail.setValue(data.mail);
        this.phone.setValue(data.phone);
      });
    }
    else if(this.clickedRow.type == Type.PATIENT) {
      this.add_patient = true;

      // Set current values
      this.patientService.info(this.clickedRow._id).subscribe((data: Patient) => {
        this.dob.setValue(moment(new Date(data.dob)).format('YYYY-MM-DD'));
        this.mail.setValue(data.mail);
        this.phone.setValue(data.phone);
        this.dor.setValue(moment(new Date(data.dor)).format('YYYY-MM-DD'));
        this.address.setValue(data.address);
        this.patientDoctor = data.doctor;
      });
    }*/
  }

  add(){

    // Check if the user is a patient or a doctor
    if(this.add_doctor) {
      // @ts-ignore
      let newUser: User = {_id: this.tc, name: this.name, surname: this.surname, username: this.username, password: '', type: Type.DOCTOR};
      this.userService.insert(newUser).subscribe(data => {
        console.log(data);
      });

      // @ts-ignore
      let newDoctor: Doctor = {_id: this.tc, dob: this.dob, mail: this.mail, phone: this.phone, role: this.role};
      this.doctorService.insert(newDoctor).subscribe(data => {
        console.log(data);
      });
    }
    else if(this.add_patient) {
      // @ts-ignore
      let newUser: User = {_id: this.tc, name: this.name, surname: this.surname, username: this.username, password: '', type: Type.DOCTOR};
      this.userService.insert(newUser).subscribe(data => {
        console.log(data);
      });

      // @ts-ignore
      let newPatient: Patient = {_id: this.tc, dob: this.dob, mail: this.mail, phone: this.phone, dor: this.dor, address: this.address, doctor: this.doctor};
      this.patientService.insert(newPatient).subscribe(data => {
        console.log(data);
      });
    }
  }

}
