import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService, User, Type } from "../user.service";
import { Doctor, DoctorService, Notice } from "../doctor.service";
import { Patient, PatientService } from "../patient.service";
import { NoticeDialogComponent } from "../notice-dialog/notice-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import {FormControl} from "@angular/forms";

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

  displayedColumns: String[] = ['_id', 'name', 'surname'];
  clickedRow: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};
  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};
  doc: Doctor = {_id: '', dob: Date.prototype, mail: '', phone: '', role: '', notice: Notice.DEFAULT};
  pats: User[] = [];
  docs: User[] = [];

  constructor(private router: Router, private userService: UserService, private doctorService: DoctorService,
              private patientService: PatientService, public dialog: MatDialog) {
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
    if(this.user.type == Type.DOCTOR){
      this.home_doctor = true;
      this.navbar = true;
      this.doc = this.doctorService.getDoctor();
      this.patientService.allPatients().subscribe((data: Patient[]) => {
        let pats_id = data.map(({ _id }) => _id);
        this.userService.patientsData(pats_id).subscribe((data: User[]) => {
          this.userService.setPatients(data);
          this.pats = this.userService.getPatients();
        });
      });
    }
    else if(this.user.type == Type.ADMIN){
      this.home_admin = true;
      this.navbar = true;

      this.patientService.allPatients().subscribe((data: Patient[]) => {
        let pats_id = data.map(({ _id }) => _id);
        this.userService.patientsData(pats_id).subscribe((data: User[]) => {
          this.userService.setPatients(data);
          this.pats = this.userService.getPatients();
        });
      });

      this.doctorService.allDoctors().subscribe((data: Doctor[]) => {
        let docs_id = data.map(({ _id }) => _id);
        this.userService.doctorsData(docs_id).subscribe((data: User[]) => {
          this.userService.setDoctors(data);
          this.docs = this.userService.getDoctors();
        });
      });

    }
    else{
      this.page_info = true;
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

  /**
   * This function get the user (patient or doctor) selected by the user in the table
   * @param {User} clicked - User selected
   */
  selectedUser(clicked: User) {
    this.clickedRow = clicked;
  }

  visualize(): void {
    this.router.navigate(['']).then();
  }

  modify(): void {
    this.router.navigate(['modify-form'], {state: {clickedUser: this.clickedRow}}).then();
  }

  add(): void {
    this.router.navigate(['add-form'], {state: {data: this.selected.value}}).then();
  }

}
