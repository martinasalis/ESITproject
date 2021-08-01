import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService, User } from "../user.service";
import { Doctor, DoctorService } from "../doctor.service";
import { Patient, PatientService } from "../patient.service";
import { NoticeDialogComponent, Result } from "../notice-dialog/notice-dialog.component";
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
  clickedRow: User = {_id: '', name: '', surname: '', username: '', password: '', type: ''};
  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: ''};
  doc: Doctor = {_id: '', dob: Date.prototype, mail: '', phone: '', role: ''};
  pats: User[] = [];

  constructor(private router: Router, private userService: UserService, private doctorService: DoctorService,
              private patientService: PatientService, public dialog: MatDialog) {
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
    if(this.user.type == 'DOCTOR'){
      this.home_doctor = true;
      this.navbar = true;
      this.doc = this.doctorService.getDoctor();
      this.patientService.getAllPatients().subscribe((data: Patient[]) => {
        let pats_id = data.map(({ _id }) => _id);
        this.userService.getUsersData(pats_id).subscribe((data: User[]) => {
          this.userService.setUsers(data);
          this.pats = this.userService.getUsers();
        });
      });
    }
    else if(this.user.type == 'ADMIN'){
      this.home_admin = true;
      this.navbar = true;
    }
    else{
      this.page_info = true;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(NoticeDialogComponent, {
      width: '250px',
      data: {res: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  selectPatient(clicked: User) {
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
