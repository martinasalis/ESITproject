import {Component, OnInit} from '@angular/core';
import {Type, User, UserService} from "../user.service";
import {DoctorService} from "../doctor.service";
import {Patient, PatientService} from "../patient.service";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {NoticeDialogComponent} from "../notice-dialog/notice-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {BoardService, Board} from "../board.service";
import {BoardSensor, BoardSensorService} from "../board-sensor.service";
import {Sensor} from "../sensor.service";

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

  selected = new FormControl(0);
  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};
  pat: Patient = {_id: '', dob: Date.prototype, mail: '', phone: '', dor: Date.prototype, address: '', doctor: '', description: ''};
  clickedRow: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};
  patBoard: Board = {mac: '', patient: ''};
  patBoardSensors: BoardSensor[] = [];
  patBoardData: any;
  sensor: BoardSensor = {_id: '', board: '', sensor: '', threshold: ''};
  clickedSensor: Sensor = {_id: 0, name: '', um: ''}

  constructor(private router: Router, private userService: UserService, private doctorService: DoctorService,
              private patientService: PatientService, private boardService: BoardService, public dialog: MatDialog,
              private  boardSensorService: BoardSensorService) {
    if(JSON.parse(sessionStorage.getItem('login')!)) {
      this.clickedRow = this.router.getCurrentNavigation()?.extras.state?.clickedUser;
      this.user = JSON.parse(sessionStorage.getItem('user')!);
    }
    else {
      this.router.navigate(['']).then();
    }
  }

  ngOnInit(): void {
    if(this.user.type == Type.PATIENT){
      this.page_patient = true;
      this.navbar = true;
      this.patientService.info(this.user._id).subscribe((data: Patient) => {
        this.patientService.setPatient(data);
        this.pat = this.patientService.getPatient();
      });

    }
    else if(this.user.type == Type.ADMIN){
      this.page_admin = true;
      this.navbar = true;
    }

    if(this.clickedRow.type == Type.PATIENT){
      this.page_info = true;
      this.navbar = true;

      this.userService.info(this.clickedRow._id).subscribe((data: User) => {
        console.log(data);
      });

      this.patientService.info(this.clickedRow._id).subscribe((data: Patient) => {
        this.patientService.setPatient(data);
        this.pat = this.patientService.getPatient();

        console.log(this.pat);
        this.boardService.getBoardMAC(this.pat._id).subscribe((data: Board) => {
          this.patBoard = data;
          console.log(data);

          this.boardSensorService.boardSensors(this.patBoard).subscribe((data: BoardSensor[]) => {
            this.patBoardSensors = data;
            console.log(this.patBoardSensors);
          });

          this.boardService.getBoardSensorData(this.patBoard).subscribe((data: any) => {
            this.patBoardData = data;
            console.log(this.patBoardData);
          });
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
    this.router.navigate(['modify-form'], {state: {clickedUser: this.clickedRow, clickedSensor: this.clickedSensor}}).then();
  }

  add_sensor(): void {
    this.router.navigate(['add-form'], {state: {data: 3}}).then();
  }

  visualize(i: Number): void {
    this.router.navigate(['page-sensor'], {state: {boardData: this.patBoardData, index: i, clickedUser: this.clickedRow}}).then();
  }

}
