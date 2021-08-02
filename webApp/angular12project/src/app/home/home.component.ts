import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService, User, Type } from "../user.service";
import { Doctor, DoctorService } from "../doctor.service";
import { Patient, PatientService } from "../patient.service";
import { NoticeDialogComponent } from "../notice-dialog/notice-dialog.component";
import { MatDialog } from "@angular/material/dialog";

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
  displayedColumns: String[] = ['_id', 'name', 'surname'];
  clickedRow: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};
  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};
  doc: Doctor = {_id: '', dob: Date.prototype, mail: '', phone: '', role: ''};
  pats: User[] = [];

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


    }
    else{
      this.page_info = true;
    }
  }

  openDialog() {

    if (this.clickedRow.type == Type.DOCTOR) {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 1}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    else if (this.clickedRow.type == Type.PATIENT) {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 2}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        this.userService.delete(this.clickedRow._id);
      });
    }
    else{
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 3}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      })
    }
  }

  /**
   * This function get the patient selected by the user in the table
   * @param {User} clicked - Patient selected
   */
  selectedPatient(clicked: User) {
    this.clickedRow = clicked;
  }

  visualize(): void {
    this.router.navigate(['']);
  }

  modify(): void {
    this.router.navigate(['modify-form']);
  }

  add(): void {
    this.router.navigate(['']);
  }

}
