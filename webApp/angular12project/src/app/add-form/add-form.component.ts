import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import { Type, User, UserService } from "../user.service";
import { Doctor, DoctorService, Notice } from "../doctor.service";
import { Patient, PatientService } from "../patient.service";
import { Router } from "@angular/router";
import { NoticeDialogComponent } from "../notice-dialog/notice-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import {Sensor, SensorService} from "../sensor.service";
import { MatFileUploadModule } from 'angular-material-fileupload';
import * as moment from "moment";
import {BoardSensor, BoardSensorService} from "../board-sensor.service";
import { ViewChild, ElementRef } from '@angular/core';
import {Board, BoardService} from "../board.service";

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  add_doctor = false;
  add_patient = false;
  add_sensor = false;
  add_sensor_patient = false;
  empty_field = false;
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
  description = new FormControl('');
  image = new FormControl('');
  um = new FormControl('');
  thr = new FormControl('');
  type = new FormControl('');
  typeSensorControl = new FormControl('', Validators.required);


  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};
  doc: Doctor = {_id: '', dob: Date.prototype, mail: '', phone: '', role: '', notice: Notice.DEFAULT, img: {data: Buffer.prototype, contentType: ""}};
  pat: Patient = {_id: '', dob: Date.prototype, mail: '', phone: '', dor: Date.prototype, address: '', doctor: '', description: ''};
  sens: Sensor[] = [];

  // Variable to store shortLink from api response
  loading: boolean = false; // Flag variable
  file: Buffer = require('buffer/').Buffer; // Variable to store file


  @ViewChild('UploadFileInput') uploadFileInput: ElementRef = {} as ElementRef;
  myfilename = 'Select File';





  constructor(private userService: UserService, private router: Router, private doctorService: DoctorService,
              private patientService: PatientService, public dialog: MatDialog, private sensorService: SensorService,
              private boardService: BoardService, private boardSensorService: BoardSensorService) {
    if(JSON.parse(sessionStorage.getItem('login')!)) {
      this.user = JSON.parse(sessionStorage.getItem('user')!);
      this.button = this.router.getCurrentNavigation()?.extras.state?.data;
    }
    else {
      this.router.navigate(['']).then();
    }
  }

  ngOnInit(): void {

    if(this.button == 0){
      this.add_doctor = true;
    }else if(this.button == 1){
      this.add_patient = true;
    }else if(this.button == 2){
      this.add_sensor = true;
    }else{
      this.add_sensor_patient = true;
      this.sensorService.allSensors().subscribe((data: Sensor[]) => {
        this.sens = data;
      });
    }

  }

  add(): void {

    // Check if the user is a patient or a doctor
    if(this.add_doctor) {
      let newUser: User = {_id: this.tc.value, name: this.name.value, surname: this.surname.value, username: this.username.value, password: '', type: Type.DOCTOR};
      let newDoctor: Doctor = {_id: this.tc.value, dob: this.dob.value, mail: this.mail.value, phone: this.phone.value, role: this.role.value, notice: Notice.SMS, img: {data: this.file, contentType: "profile-image"}};

      console.log(typeof newDoctor.dob);
      if(newUser.name == '' || newUser._id == '' || newUser.surname == '' || newUser.username == '' || this.dob.value == '' || newDoctor.mail == '' || newDoctor.phone == '' || newDoctor.role == '' || newDoctor.img == {data: Buffer.prototype, contentType: ""}){
        console.log(newDoctor.dob);
        this.empty_field = true;
        this.openDialog();
      }
      else {
        this.userService.insert(newUser).subscribe(data => {
          console.log(data);
        });
        this.doctorService.insert(newDoctor).subscribe(data => {
          console.log(data);
        });

        this.router.navigate(['home']).then();
        this.openDialog();
      }
    }
    else if(this.add_patient) {
      let newUser: User = {_id: this.tc.value, name: this.name.value, surname: this.surname.value, username: this.username.value, password: '', type: Type.PATIENT};
      let newPatient: Patient = {_id: this.tc.value, dob: this.dob.value, mail: this.mail.value, phone: this.phone.value, dor: this.dor.value, address: this.address.value, doctor: this.doctor.value, description: this.description.value};

      if(newUser.name == '' || newUser._id == '' || newUser.surname == '' || newUser.username == '' || newPatient.dob == Date.prototype || newPatient.dor == Date.prototype ||newPatient.mail == '' || newPatient.phone == '' || newPatient.address == '' || newPatient.doctor == '' || newPatient.description == ''){
        this.empty_field = true;
        this.openDialog();
      }
      else {
        this.userService.insert(newUser).subscribe(data => {
          console.log(data);
        });

        this.patientService.insert(newPatient).subscribe(data => {
          console.log(data);
        });

        this.router.navigate(['home']).then();
        this.openDialog();
      }
    }
    else if(this.add_sensor){
      let newSensor: Sensor = {_id: 0, name: this.name.value, um: this.um.value};
      console.log(newSensor);

      if(newSensor.name == '' || newSensor.um == ''){
        this.empty_field = true;
        this.openDialog();
      }
      else {
        this.sensorService.insert(newSensor).subscribe(data => {
          console.log(data);
        });

        this.router.navigate(['home']).then();
        this.openDialog();
      }
    }
    else if(this.add_sensor_patient){
      this.boardService.getBoardMAC(this.pat._id).subscribe((data:Board) => {
        console.log(data.mac);

        let newBoardSensor: BoardSensor = {_id: '', board: data.mac, sensor: this.typeSensorControl.value._id, threshold: this.thr.value};
        console.log(newBoardSensor);

        if(newBoardSensor.threshold == ''){
          this.empty_field = true;
          this.openDialog();
        }
        else{
          this.boardSensorService.insert(newBoardSensor).subscribe(data => {
            console.log(data);
          });

          this.router.navigate(['home']).then();
          this.openDialog();
        }
      });



    }
  }

  openDialog() {

    if(this.empty_field){
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {flag: 6}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      })
    }
    else if (this.add_doctor) {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 1, flag: 3}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    else if (this.add_patient) {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 2, flag: 3}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    else if(this.add_sensor){
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 3, flag: 3}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      })
    }
    else if(this.add_sensor_patient){
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 4, flag: 3}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      })
    }
  }

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.doctorService.setImageProfile(this.file);
    this.loading = !this.loading;
    console.log(this.file);
  }

  fileChangeEvent(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {


      this.myfilename = '';
      Array.from(fileInput.target.files).forEach((file: any) => {
        console.log(file);
        this.myfilename += file.name + ',';
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {

          // Return Base64 Data URL
          const imgBase64Path = e.target.result;

        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);

      // Reset File Input to Selct Same file again
      this.uploadFileInput.nativeElement.value = "";
    } else {
      this.myfilename = 'Select File';
    }
  }


}
