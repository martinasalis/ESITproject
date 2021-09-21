import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Type, User, UserService} from "../user.service";
import {Doctor, DoctorService, Notice} from "../doctor.service";
import {Router} from "@angular/router";
import {Patient, PatientService} from "../patient.service";
import * as moment from "moment";
import {NoticeDialogComponent} from "../notice-dialog/notice-dialog.component";
import {MatDialog} from "@angular/material/dialog";
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
  modify_sensor_doctor = false;

  username = new FormControl('');
  name = new FormControl('');
  surname = new FormControl('');
  mail = new FormControl('', Validators.email);
  dob = new FormControl('');
  tc = new FormControl('', [Validators.max(16)]);
  phone = new FormControl('', [Validators.max(10)]);
  dor = new FormControl('');
  address = new FormControl('');
  role = new FormControl('');
  description = new  FormControl('');
  um = new FormControl('');
  name_sensor = new FormControl('');
  thr = new FormControl('', [Validators.min(0)]);
  typeSensor = new FormControl('');

  patientDoctor: String = '';
  doctorNotice: Notice = Notice.DEFAULT;

  user: User = {_id: '', name: '', surname: '', username: '', password: '', mail: '', phone: '', dob: Date.prototype, type: Type.DEFAULT};
  doc: Doctor = {_id: '', role: '', notice: Notice.DEFAULT};
  pat: Patient = {_id: '', dor: Date.prototype, address: '', doctor: '', board: '', description: ''};
  clickedRow: User = {_id: '', name: '', surname: '', username: '', password: '', mail: '', phone: '', dob: Date.prototype, type: Type.DEFAULT};
  clickedSensor: Sensor = {_id: '', name: '', um: '', threshold: 0.0, board: '', type: 0};
  patBoard: String = '';

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

    if(this.clickedRow.type == Type.DOCTOR && this.clickedSensor._id == '') {
      this.modify_doctor = true;

      // Set values
      this.name.setValue(this.clickedRow.name);
      this.surname.setValue(this.clickedRow.surname);
      this.username.setValue(this.clickedRow.username);
      this.tc.setValue(this.clickedRow._id);
      this.dob.setValue(moment(new Date(this.clickedRow.dob)).format('YYYY-MM-DD'));
      this.mail.setValue(this.clickedRow.mail);
      this.phone.setValue(this.clickedRow.phone);

      // Set current values
      this.doctorService.info(this.clickedRow._id).subscribe((data: Doctor) => {
        this.doctorNotice = data.notice;
        this.role.setValue(data.role);
      });
    }
    else if(this.clickedRow.type == Type.PATIENT && this.clickedSensor._id == '') {
      this.modify_patient = true;

      // Set values
      this.name.setValue(this.clickedRow.name);
      this.surname.setValue(this.clickedRow.surname);
      this.username.setValue(this.clickedRow.username);
      this.tc.setValue(this.clickedRow._id);
      this.dob.setValue(moment(new Date(this.clickedRow.dob)).format('YYYY-MM-DD'));
      this.mail.setValue(this.clickedRow.mail);
      this.phone.setValue(this.clickedRow.phone);

      // Set current values
      this.patientService.info(this.clickedRow._id).subscribe((data: Patient) => {
        this.dor.setValue(moment(new Date(data.dor)).format('YYYY-MM-DD'));
        this.address.setValue(data.address);
        this.patientDoctor = data.doctor;
        this.description.setValue(data.description);
        this.patBoard = data.board;
      });
    }
    else if(this.clickedSensor._id != '' && this.clickedRow.type == Type.DEFAULT){
      console.log(this.clickedSensor);
      this.modify_sensor = true;

      // Set current values
      this.sensorService.info(this.clickedSensor._id).subscribe((data: Sensor) => {
        this.name_sensor.setValue(data.name);
        this.um.setValue(data.um);
        this.thr.setValue(data.threshold);
        this.typeSensor.setValue(data.type);
      });
    }
    else if(this.clickedSensor._id != '' && this.clickedRow.type == Type.PATIENT){
      this.modify_sensor_doctor = true;

      // Set current values
      this.sensorService.info(this.clickedSensor._id).subscribe((data: Sensor) => {
        this.name_sensor.setValue(data.name);
        this.um.setValue(data.um);
        this.thr.setValue(data.threshold);
        this.typeSensor.setValue(data.type);
      });
    }
    else {
      this.router.navigate(['home']).then();
      this.openDialog();
    }
  }

  /**
   * This function perform the save of the new data inserted by the user
   */
  save(): void {

    // Check if the user is a patient or a doctor
    if(this.modify_doctor) {
      // Update user's data
      let newUser: User = {_id: this.clickedRow._id, name: this.name.value, surname: this.surname.value,
        username: this.username.value, password: this.clickedRow.password, mail: this.mail.value, phone: this.phone.value,
        dob: this.dob.value, type: this.clickedRow.type};
      this.userService.update(this.clickedRow._id, newUser).subscribe(data => {
        console.log(data);
      });

      let newDoctor: Doctor = {_id: this.clickedRow._id, role: this.role.value, notice: this.doctorNotice};
      this.doctorService.update(this.clickedRow._id, newDoctor).subscribe(data => {
        console.log(data);
      });
      this.router.navigate(['home']).then();
      this.openDialog();
    }
    else if(this.modify_patient) {
      // Update user's data
      let newUser: User = {_id: this.clickedRow._id, name: this.name.value, surname: this.surname.value,
        username: this.username.value, password: this.clickedRow.password, mail: this.mail.value, phone: this.phone.value,
        dob: this.dob.value, type: this.clickedRow.type};
      this.userService.update(this.clickedRow._id, newUser).subscribe(data => {
        console.log(data);
      });

      let newPatient: Patient = {_id: this.clickedRow._id, dor: this.dor.value, address: this.address.value,
        doctor: this.patientDoctor, board: this.patBoard, description: this.description.value};
      this.patientService.update(this.clickedRow._id, newPatient).subscribe(data => {
        console.log(data);
      });
      this.router.navigate(['home']).then();
      this.openDialog();
    }
    else {
      let newSensor: Sensor = {_id: this.clickedSensor._id, name: this.name_sensor.value, um: this.um.value,
        threshold: this.thr.value, type: this.typeSensor.value, board: this.clickedSensor.board};
      this.sensorService.update(this.clickedSensor._id, newSensor).subscribe(data =>{
        console.log(data);
      });
      if(this.modify_sensor) {
        this.router.navigate(['home']).then();
        this.openDialog();
      }
      else{
        this.router.navigate(['patient'], {state: {clickedUser: this.clickedRow}}).then();
        this.openDialog();
      }
    }
  }

  openDialog() {

    if (this.modify_doctor) {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 1, flag: 2}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    else if (this.modify_patient) {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 2, flag: 2}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    else if(this.modify_sensor) {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 3, flag: 2}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    else if(this.modify_sensor_doctor) {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 3, flag: 2}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    else{
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {flag: 8}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  getErrorMessage() {
    if (this.username.hasError('required') || this.name.hasError('required')
      || this.surname.hasError('required') || this.mail.hasError('required') ||
      this.dob.hasError('required') || this.tc.hasError('required') ||
      this.phone.hasError('required') || this.dor.hasError('required') ||
      this.address.hasError('required') || this.role.hasError('required') ||
      this.description.hasError('required') || this.um.hasError('required') ||
      this.name_sensor.hasError('required') || this.thr.hasError('required') ||
      this.typeSensor.hasError('required')) {
      return 'Devi inserire il campo';
    }

    return this.thr.hasError('min') ? 'Il valore minimo è 0' : '';
  }

}
