import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService, User, Type } from "../user.service";
import { Doctor, DoctorService, Notice } from "../doctor.service";
import { Patient, PatientService } from "../patient.service";
import { NoticeDialogComponent } from "../notice-dialog/notice-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { FormControl } from "@angular/forms";
import { Sensor, SensorService } from "../sensor.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  home_doctor = false;
  navbar = false;
  home_admin = false;
  page_info = false;
  selected = new FormControl(0);
  searchString = new FormControl('');
  pats_id: any;
  docs_id: any;

  displayedColumnsDesc: String[] = ['_id', 'name', 'surname', 'description'];
  displayedColumns: String[] = ['_id', 'name', 'surname'];
  displayedColumnsSensor: String[] = ['_id', 'name', 'um'];
  clickedRow: User = {_id: '', name: '', surname: '', username: '', password: '', mail: '', phone: '', dob: Date.prototype, type: Type.DEFAULT};
  clickedSensor: Sensor = {_id: '', name: '', um: '', threshold: 0.0, board: '', type: 0};
  user: User = {_id: '', name: '', surname: '', username: '', password: '', mail: '', phone: '', dob: Date.prototype, type: Type.DEFAULT};
  doc: Doctor = {_id: '', role: '', notice: Notice.DEFAULT};
  pats: User[] = [];
  docs: User[] = [];
  sens: Sensor[] = [];

  constructor(private router: Router, private userService: UserService, private doctorService: DoctorService,
              private patientService: PatientService, public dialog: MatDialog, private sensorService: SensorService) {
    if(JSON.parse(sessionStorage.getItem('login')!)) {
      this.user = JSON.parse(sessionStorage.getItem('user')!);
    }
    else {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    if(this.user.type == Type.DOCTOR){
      this.home_doctor = true;
      this.navbar = true;
      this.doc = this.doctorService.getDoctor();
      this.patientService.doctorPatients(this.user._id).subscribe((data: Patient[]) => {
        this.pats_id = data.map(({ _id }) => _id);
        this.userService.patientsData(this.pats_id).subscribe((data: User[]) => {
          this.userService.setPatients(data);
          this.pats = this.userService.getPatients();
        });
      });
    }
    else if(this.user.type == Type.ADMIN){
      this.home_admin = true;
      this.navbar = true;

      this.patientService.allPatients().subscribe((data: Patient[]) => {
        this.pats_id = data.map(({ _id }) => _id);
        this.userService.patientsData(this.pats_id).subscribe((data: User[]) => {
          this.userService.setPatients(data);
          this.pats = this.userService.getPatients();
        });
      });

      this.doctorService.allDoctors().subscribe((data: Doctor[]) => {
        this.docs_id = data.map(({ _id }) => _id);
        this.userService.doctorsData(this.docs_id).subscribe((data: User[]) => {
          this.userService.setDoctors(data);
          this.docs = this.userService.getDoctors();
        });
      });

      this.sensorService.allSensors().subscribe((data: Sensor[]) => {
        this.sensorService.setSensors(data);
        this.sens = this.sensorService.getSensors();
      });

    }
    else{
      this.page_info = true;
    }
  }

  openDialog() {

    if (this.clickedRow.type == Type.DOCTOR && this.clickedSensor._id == '') {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 1, flag: 1}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          // Delete user
          this.userService.delete(this.clickedRow._id).subscribe(data => {
            console.log(data);
          });
          // Delete doctor
          this.doctorService.delete(this.clickedRow._id).subscribe(data => {
            console.log(data);
          });
          //this.router.navigate(['home']).then();
        }
      });
    }
    else if (this.clickedRow.type == Type.PATIENT && this.clickedSensor._id == '') {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 2, flag: 1}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          // Delete sensor's patient
          this.patientService.info(this.clickedRow._id).subscribe((data: Patient) => {
            this.sensorService.deleteAllSensorBoard(data.board, data.doctor).subscribe(data => {
              console.log(data);
            });
          });
          // Delete user
          this.userService.delete(this.clickedRow._id).subscribe(data => {
            console.log(data);
          });
          // Delete patient
          this.patientService.delete(this.clickedRow._id).subscribe(data => {
            console.log(data);
          });
          //this.router.navigate(['home']).then();
        }
      });
    }
    else if(this.clickedSensor._id != '' && this.clickedRow.type == Type.DEFAULT){
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 3, flag: 1}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          // Delete sensor
          this.sensorService.delete(this.clickedSensor._id).subscribe(data => {
            console.log(data);
          });
          //this.router.navigate(['home']).then();
        }
      });
    }
    else {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {flag: 8}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  /**
   * This function get the user (patient or doctor) selected by the user in the table
   * @param {User} clicked - User selected
   */
  selectedUser(clicked: User): void {
    this.clickedRow = clicked;
  }

  /**
   * This function get the sensor selected by the user in the table
   * @param {User} clicked - Sensor selected
   */
  selectedSensor(clicked: Sensor): void {
    this.clickedSensor = clicked;
  }

  /**
   * This function search a patient of a doctor in the database which matches with param
   */
  searchPatient(): void {
    this.userService.searchDoctorPatient(this.searchString.value, Type.PATIENT, this.pats_id).subscribe((data: User[]) => {
      this.userService.setPatients(data);
      this.pats = this.userService.getPatients();
    });
  }

  /**
   * This function search a patient in the database which matches with param
   */
  searchAllPatient(): void {
    this.userService.searchAll(this.searchString.value, Type.PATIENT).subscribe((data: User[]) => {
      this.userService.setPatients(data);
      this.pats = this.userService.getPatients();
    });
  }

  /**
   * This function search a doctor in the database which matches with param
   */
  searchAllDoctor(): void {
    this.userService.searchAll(this.searchString.value, Type.DOCTOR).subscribe((data: User[]) => {
      this.userService.setDoctors(data);
      this.docs = this.userService.getDoctors();
    });
  }

  /**
   * This function search a sensor in the database which matches with param
   */
  searchAllSensor(): void {
    this.sensorService.searchAll(this.searchString.value).subscribe((data: Sensor[]) => {
      this.sensorService.setSensors(data);
      this.sens = this.sensorService.getSensors();
    });
  }

  visualize(): void {
    if(this.clickedRow._id == ''){
      this.router.navigate(['home']);
      this.openDialog();
    }
    else {
      this.router.navigate(['patient'], {state: {clickedUser: this.clickedRow}});
    }
  }

  modify(): void {
    this.router.navigate(['modify-form'], {state: {clickedUser: this.clickedRow, clickedSensor: this.clickedSensor}});
  }

  add(): void {
    if(this.selected.value == 0 && this.home_doctor){
      this.router.navigate(['add-form'], {state: {data: 1}});
    }
    else {
      this.router.navigate(['add-form'], {state: {data: this.selected.value}});
    }
  }

  modify_sensor(): void {
    console.log(this.clickedSensor);
    this.router.navigate(['modify-form'], {state: {clickedSensor: this.clickedSensor, clickedUser: this.clickedRow}});
  }

  add_sensor(): void {
    this.router.navigate(['add-form'], {state: {data: this.selected.value}});
  }

  insert_mac(): void {
    this.router.navigate(['mac-address']);
  }

  delete(): void{
    this.openDialog();
    this.router.navigate(['home']);
  }

}
