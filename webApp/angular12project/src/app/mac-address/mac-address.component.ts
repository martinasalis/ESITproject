import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { Type, User, UserService } from "../user.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { NoticeDialogComponent } from "../notice-dialog/notice-dialog.component";
import { Patient, PatientService } from "../patient.service";

@Component({
  selector: 'app-mac-address',
  templateUrl: './mac-address.component.html',
  styleUrls: ['./mac-address.component.css']
})
export class MACAddressComponent implements OnInit {

  user: User = {_id: '', name: '', surname: '', username: '', password: '', mail: '', phone: '', dob: Date.prototype, type: Type.DEFAULT};
  mac = new FormControl('', [Validators.required, Validators.maxLength(12)]);
  patientControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  pats: User[] = [];
  pats_id: any;

  constructor(private userService: UserService, private router: Router, public dialog: MatDialog,
              private patientService: PatientService) {
    if(JSON.parse(sessionStorage.getItem('login')!)) {
      this.user = JSON.parse(sessionStorage.getItem('user')!);
    }
    else {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.patientService.allFreePatients().subscribe((data: Patient[]) => {
      this.pats_id = data.map(({ _id }) => _id);
      this.userService.patientsData(this.pats_id).subscribe((data: User[]) => {
        this.userService.setPatients(data);
        this.pats = this.userService.getPatients();
      });
    });

  }

  insert(): void {
    if(this.patientControl.value != '' && this.mac.value != '') {
      this.patientService.info(this.patientControl.value._id).subscribe((pat: Patient) => {
        this.patientService.insertBoard(pat, this.mac.value).subscribe(data => {
          console.log(data);
        });
        this.router.navigate(['home']);
        this.openDialog();
      });
    }
    else {
      this.openDialog();
    }
  }

  openDialog() {
    if(this.patientControl.value != '' && this.mac.value != '') {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {flag: 5}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    else {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {flag: 7}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }
}
