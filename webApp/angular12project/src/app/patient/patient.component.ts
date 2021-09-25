import { Component, OnInit } from '@angular/core';
import { Type, User, UserService } from "../user.service";
import { DoctorService } from "../doctor.service";
import { Patient, PatientService } from "../patient.service";
import { Router } from "@angular/router";
import { NoticeDialogComponent } from "../notice-dialog/notice-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { Sensor, SensorService } from "../sensor.service";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  navbar = false;
  page_patient = false;
  page_info = false;
  page_admin = false;

  user: User = {_id: '', name: '', surname: '', username: '', password: '', mail: '', phone: '', dob: Date.prototype, type: Type.DEFAULT};
  pat: Patient = {_id: '', dor: Date.prototype, address: '', doctor: '', board: '', description: ''};
  clickedRow: User = {_id: '', name: '', surname: '', username: '', password: '', mail: '', phone: '', dob: Date.prototype, type: Type.DEFAULT};
  patBoardSensors: Sensor[] = [];
  patBoardData: any;
  clickedSensor: Sensor = {_id: '', name: '', um: '', threshold: 0.0, board: '', type: 0};

  constructor(private router: Router, private userService: UserService, private doctorService: DoctorService,
              private patientService: PatientService, public dialog: MatDialog, private sensorService: SensorService) {
    if(JSON.parse(sessionStorage.getItem('login')!)) {
      this.clickedRow = this.router.getCurrentNavigation()?.extras.state?.clickedUser;
      this.user = JSON.parse(sessionStorage.getItem('user')!);
    }
    else {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    let patient: User = {_id: '', name: '', surname: '', username: '', password: '', mail: '', phone: '', dob: Date.prototype, type: Type.DEFAULT};

    if(this.user.type == Type.PATIENT) {
      this.page_patient = true;
      this.navbar = true;
      this.patientService.info(this.user._id).subscribe((data: Patient) => {
        this.patientService.setPatient(data);
        this.pat = this.patientService.getPatient();
      });
      patient = this.user;
    }
    else if(this.user.type == Type.ADMIN) {
      this.page_admin = true;
      this.navbar = true;
    }
    else {
      patient = this.clickedRow;
    }

    if(patient.type == Type.PATIENT) {
      this.page_info = true;
      this.navbar = true;

      this.userService.info(patient._id).subscribe((data: User) => {
        console.log(data);
      });

      this.patientService.info(patient._id).subscribe((data: Patient) => {
        this.patientService.setPatient(data);
        this.pat = this.patientService.getPatient();

        this.sensorService.boardSensors(this.pat.board).subscribe((data: Sensor[]) => {
          this.patBoardSensors = data;
        });

        this.patientService.getBoardSensorData(this.pat).subscribe((data: any) => {
          this.patBoardData = data;
        });
      });
    }
  }

  openDialog() {

    if (this.clickedRow.type == Type.DOCTOR) {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 1, flag: 1}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if(result) {
          this.userService.delete(this.clickedRow._id).subscribe(data => {
            console.log(data);
          });
          this.doctorService.delete(this.clickedRow._id).subscribe(data => {
            console.log(data);
          });
        }
      });
    }
    else if (this.clickedRow.type == Type.PATIENT) {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 2, flag: 1}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if(result) {
          this.userService.delete(this.clickedRow._id).subscribe(data => {
            console.log(data);
          });
          this.patientService.delete(this.clickedRow._id).subscribe(data => {
            console.log(data);
          });
        }
      });
    }
    else{
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 3, flag: 1}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      })
    }
  }


  modify(): void {
    this.router.navigate(['modify-form'], {state: {clickedUser: this.clickedRow, clickedSensor: this.clickedSensor}});
  }

  modify_sensor(sensor: Sensor): void {
    this.router.navigate(['modify-form'], {state: {clickedUser: this.clickedRow, clickedSensor: sensor}});
  }

  add_sensor(): void {
    this.router.navigate(['add-form'], {state: {clickedUser: this.clickedRow, data: 3}});
  }

  visualize(i: Number): void {
    this.router.navigate(['page-sensor'], {state: {boardData: this.patBoardData, index: i, clickedUser: this.clickedRow}});
  }

}
