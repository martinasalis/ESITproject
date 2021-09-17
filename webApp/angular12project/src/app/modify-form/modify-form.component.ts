import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Type, User, UserService } from "../user.service";
import { Doctor, DoctorService, Notice } from "../doctor.service";
import { Router } from "@angular/router";
import { Patient, PatientService } from "../patient.service";
import * as moment from "moment";
import { NoticeDialogComponent } from "../notice-dialog/notice-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import {Sensor, SensorService} from "../sensor.service";

@Component({
  selector: 'app-modify-form',
  templateUrl: './modify-form.component.html',
  styleUrls: ['./modify-form.component.css']
})
export class ModifyFormComponent implements OnInit {

  modify_doctor = false;
  modify_patient = false;
  modify_sensor = false;

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
  description = new  FormControl('');
  image = new FormControl('');
  um = new FormControl('');
  name_sensor = new FormControl('');

  patientDoctor: String = '';
  doctorNotice: Notice = Notice.DEFAULT;

  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};
  doc: Doctor = {_id: '', dob: Date.prototype, mail: '', phone: '', role: '', notice: Notice.DEFAULT, img: {data: Buffer.prototype, contentType: ""}};
  pat: Patient = {_id: '', dob: Date.prototype, mail: '', phone: '', dor: Date.prototype, address: '', doctor: '', description: ''};
  clickedRow: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};
  clickedSensor: Sensor = {_id: 0, name: '', um: ''};

  constructor(private userService: UserService, private router: Router, private doctorService: DoctorService,
              private patientService: PatientService, public dialog: MatDialog, private  sensorService: SensorService) {
    if(JSON.parse(sessionStorage.getItem('login')!)) {
      this.clickedRow = this.router.getCurrentNavigation()?.extras.state?.clickedUser;
      this.clickedSensor = this.router.getCurrentNavigation()?.extras.state?.clickedSensor;
      console.log(this.clickedSensor);
      this.user = JSON.parse(sessionStorage.getItem('user')!);
    }
    else {
      this.router.navigate(['']).then();
    }
  }

  ngOnInit(): void {

    if(this.clickedRow.type == Type.DOCTOR && this.clickedSensor._id == 0) {
      this.modify_doctor = true;

      // Set values
      this.name.setValue(this.clickedRow.name);
      this.surname.setValue(this.clickedRow.surname);
      this.username.setValue(this.clickedRow.username);
      this.tc.setValue(this.clickedRow._id);

      // Set current values
      this.doctorService.info(this.clickedRow._id).subscribe((data: Doctor) => {
        this.dob.setValue(moment(new Date(data.dob)).format('YYYY-MM-DD'));
        this.mail.setValue(data.mail);
        this.phone.setValue(data.phone);
        this.doctorNotice = data.notice;
      });
    }
    else if(this.clickedRow.type == Type.PATIENT && this.clickedSensor._id == 0) {
      this.modify_patient = true;

      // Set values
      this.name.setValue(this.clickedRow.name);
      this.surname.setValue(this.clickedRow.surname);
      this.username.setValue(this.clickedRow.username);
      this.tc.setValue(this.clickedRow._id);

      // Set current values
      this.patientService.info(this.clickedRow._id).subscribe((data: Patient) => {
        this.dob.setValue(moment(new Date(data.dob)).format('YYYY-MM-DD'));
        this.mail.setValue(data.mail);
        this.phone.setValue(data.phone);
        this.dor.setValue(moment(new Date(data.dor)).format('YYYY-MM-DD'));
        this.address.setValue(data.address);
        this.patientDoctor = data.doctor;
        this.description.setValue(data.description);
      });
    }
    else if(this.clickedSensor._id != 0 && this.clickedRow.type == Type.DEFAULT){
      console.log(this.clickedSensor);
      this.modify_sensor = true;

      // Set current values
      this.sensorService.info(this.clickedSensor._id).subscribe((data: Sensor) => {
        this.name_sensor.setValue(data.name);
        this.um.setValue(data.um);
        console.log(data);
      });
    }
    else{
      this.router.navigate(['home']).then();
      this.openDialog();
    }
  }

  /**
   * This function perform the save of the new data inserted by the user
   */
  save(): void {
    // Update user's data
    let newUser: User = {_id: this.clickedRow._id, name: this.name.value, surname: this.surname.value,
      username: this.username.value, password: this.clickedRow.password, type: this.clickedRow.type};
    this.userService.update(this.clickedRow._id, newUser).subscribe(data => {
      console.log(data);
    });

    // Check if the user is a patient or a doctor
    if(this.clickedRow.type == Type.DOCTOR) {
      let newDoctor: Doctor = {_id: this.clickedRow._id, dob: this.dob.value, mail: this.mail.value,
        phone: this.phone.value, role: this.role.value, notice: this.doctorNotice, img: {data: this.image.value, contentType: this.doc.img.contentType}};
      this.doctorService.update(this.clickedRow._id, newDoctor).subscribe(data => {
        console.log(data);
      });
      this.router.navigate(['home']).then();
      this.openDialog();
    }
    else if(this.clickedRow.type == Type.PATIENT) {
      let newPatient: Patient = {_id: this.clickedRow._id, dob: this.dob.value, mail: this.mail.value,
        phone: this.phone.value, dor: this.dor.value, address: this.address.value, doctor: this.patientDoctor, description: this.description.value};
      this.patientService.update(this.clickedRow._id, newPatient).subscribe(data => {
        console.log(data);
      });
      this.router.navigate(['home']).then();
      this.openDialog();
    }
    else{
      let newSensor: Sensor = {_id: this.clickedSensor._id, name: this.name_sensor.value, um: this.um.value};
      this.sensorService.update(this.clickedSensor._id, newSensor).subscribe(data =>{
        console.log(data);
      });
      this.router.navigate(['home']).then();
      this.openDialog();
    }
  }

  openDialog() {

    if (this.clickedRow.type == Type.DOCTOR && this.clickedSensor._id == 0) {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 1, flag: 2}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    else if (this.clickedRow.type == Type.PATIENT && this.clickedSensor._id == 0) {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 2, flag: 2}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    else if(this.clickedSensor._id != 0 && this.clickedRow.type == Type.DEFAULT){
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 3, flag: 2}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      })
    }
    else{
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {flag: 8}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      })
    }
  }

}
