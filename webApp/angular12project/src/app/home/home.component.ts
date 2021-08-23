import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService, User, Type } from "../user.service";
import { Doctor, DoctorService, Notice } from "../doctor.service";
import { Patient, PatientService } from "../patient.service";
import { NoticeDialogComponent } from "../notice-dialog/notice-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { FormControl } from "@angular/forms";

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
        if(result) {
          // Delete user
          this.userService.delete(this.clickedRow._id).subscribe(data => {
            console.log(data);
          });
          // Delete doctor
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
        if(result) {
          // Delete user
          this.userService.delete(this.clickedRow._id).subscribe(data => {
            console.log(data);
          });
          // Delete patient
          this.patientService.delete(this.clickedRow._id).subscribe(data => {
            console.log(data);
          });
        }
      });
    }
    else {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 3, flag: 1}
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

  /**
   * This function get the user (patient or doctor) selected by the user in the table
   * @param {User} clicked - User selected
   */
  selectedUser(clicked: User) {
    this.clickedRow = clicked;
  }

  /**
   * This function search a patient of a doctor in the database which matches with param
   */
  searchPatient() {
    this.userService.searchDoctorPatient(this.searchString.value, Type.PATIENT, this.pats_id).subscribe((data: User[]) => {
      this.userService.setPatients(data);
      this.pats = this.userService.getPatients();
    });
  }

  /**
   * This function search a patient in the database which matches with param
   */
  searchAllPatient() {
    this.userService.searchAll(this.searchString.value, Type.PATIENT).subscribe((data: User[]) => {
      this.userService.setPatients(data);
      this.pats = this.userService.getPatients();
    });
  }

  /**
   * This function search a doctor in the database which matches with param
   */
  searchAllDoctor() {
    this.userService.searchAll(this.searchString.value, Type.DOCTOR).subscribe((data: User[]) => {
      this.userService.setDoctors(data);
      this.docs = this.userService.getDoctors();
    });
  }

  visualize(): void {
    this.router.navigate(['patient'], {state: {clickedUser: this.clickedRow}}).then();
  }

  modify(): void {
    this.router.navigate(['modify-form'], {state: {clickedUser: this.clickedRow}}).then();
  }

  add(): void {
    if(this.selected.value == 0 && this.home_doctor){
      this.router.navigate(['add-form'], {state: {data: 1}}).then();
    }
    else {
      this.router.navigate(['add-form'], {state: {data: this.selected.value}}).then();
    }
  }

}
