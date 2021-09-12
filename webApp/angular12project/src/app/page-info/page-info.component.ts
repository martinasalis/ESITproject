import { Component, OnInit } from '@angular/core';
import { Type, User, UserService } from "../user.service";
import { Router } from "@angular/router";
import { Doctor, DoctorService, Notice } from "../doctor.service";
import { PatientService, Patient } from "../patient.service";
import { FormControl, FormGroup } from "@angular/forms";
import { NoticeDialogComponent } from "../notice-dialog/notice-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.css']
})
export class PageInfoComponent implements OnInit {

  navbar = false;
  home_doctor = false;
  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};
  doc: Doctor = {_id: '', dob: Date.prototype, mail: '', phone: '', role: '', notice: Notice.DEFAULT};
  pat: Patient = {_id: '', dob: Date.prototype, mail: '', phone: '', dor: Date.prototype, address: '', doctor: '', description: ''};
  selectedNotice: String = '';
  noticeOptions: String[] = ['E-mail', 'SMS', 'Telegram'];
  noticeGroup: FormGroup = new FormGroup({notice: new FormControl()});

  constructor(private router: Router, private userService: UserService, private doctorService: DoctorService,
              private patientService: PatientService, public dialog: MatDialog) {
    if(JSON.parse(sessionStorage.getItem('login')!)) {
      this.user = JSON.parse(sessionStorage.getItem('user')!);
    }
    else {
      this.router.navigate(['']).then();
    }
  }

  ngOnInit(): void {
    if(this.user.type == Type.DOCTOR){
      this.navbar = true;
      this.home_doctor = true;
      this.doctorService.info(this.user._id).subscribe((data: Doctor) => {
        this.doctorService.setDoctor(data);
        this.doc = this.doctorService.getDoctor();

        // Set default value of radio button
        if(this.doc.notice == Notice.MAIL) {
          this.noticeGroup.setControl("notice", new FormControl(this.noticeOptions[0]));
        }
        else if(this.doc.notice == Notice.SMS) {
          this.noticeGroup.setControl("notice", new FormControl(this.noticeOptions[1]));
        }
        else {
          this.noticeGroup.setControl("notice", new FormControl(this.noticeOptions[2]));
        }
      });
    }
  }

  changeNotice(notice: String) {
    this.selectedNotice = notice;
  }

  saveNotice() {
    if(this.selectedNotice == this.noticeOptions[0]) {
      this.doctorService.updateNotice(this.user._id, Notice.MAIL).subscribe(data => {
        console.log(data);
      });
      this.openDialog();
    }
    else if(this.selectedNotice == this.noticeOptions[1]) {
      this.doctorService.updateNotice(this.user._id, Notice.SMS).subscribe(data => {
        console.log(data);
      });
      this.openDialog();
    }
    else {
      this.doctorService.updateNotice(this.user._id, Notice.TELEGRAM).subscribe(data => {
        console.log(data);
      });
      this.openDialog();
    }
  }

  openDialog(){
    const dialogRef = this.dialog.open(NoticeDialogComponent, {
      width: '250px',
      data: {res: 4, flag: 2}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
