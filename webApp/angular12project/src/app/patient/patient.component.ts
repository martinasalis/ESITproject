import {Component, OnInit} from '@angular/core';
import {Type, User, UserService} from "../user.service";
import {DoctorService} from "../doctor.service";
import {Patient, PatientService} from "../patient.service";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {NoticeDialogComponent} from "../notice-dialog/notice-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  navbar = false;
  page_patient = false;
  page_info = false;
  selected = new FormControl(0);
  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};
  pat: Patient = {_id: '', dob: Date.prototype, mail: '', phone: '', dor: Date.prototype, address: '', doctor: '', description: ''};
  clickedRow: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};

  constructor(private router: Router, private userService: UserService, private doctorService: DoctorService,
              private patientService: PatientService, public dialog: MatDialog) {
    this.clickedRow = this.router.getCurrentNavigation()?.extras.state?.clickedUser;
    this.user = this.userService.getUser();
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

    if(this.clickedRow.type == Type.PATIENT){
      this.page_info = true;
      this.navbar = true;

      this.userService.info(this.clickedRow._id).subscribe((data: User) => {
        console.log(data);
      });

      this.patientService.info(this.clickedRow._id).subscribe((data: Patient) => {
        this.patientService.setPatient(data);
        this.pat = this.patientService.getPatient();
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
        this.userService.delete(this.clickedRow._id).subscribe(data => {
          console.log(data);
        });
        this.doctorService.delete(this.clickedRow._id).subscribe(data => {
          console.log(data);
        });
      });
    }
    else if (this.clickedRow.type == Type.PATIENT) {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 2, flag: 1}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        this.userService.delete(this.clickedRow._id).subscribe(data => {
          console.log(data);
        });
        this.patientService.delete(this.clickedRow._id).subscribe(data => {
          console.log(data);
        });
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
    this.router.navigate(['modify-form'], {state: {clickedUser: this.clickedRow}}).then();
  }

  add_sensor(): void {

  }

}
