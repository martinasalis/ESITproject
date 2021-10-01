import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { UserService, User, Type } from "../user.service";
import { MatDialog } from "@angular/material/dialog";
import { NoticeDialogComponent } from "../notice-dialog/notice-dialog.component";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  recovery_password = false;

  // Form fields
  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);

  user: User = {_id: '', name: '', surname: '', username: '', password: '', mail: '', phone: '', dob: Date.prototype, type: Type.DEFAULT};

  constructor(private userService: UserService, private router: Router, public dialog: MatDialog) {
    if(JSON.parse(sessionStorage.getItem('login')!)) {
      this.router.navigate(['home']).then();
    }
  }

  ngOnInit(): void {
    this.login();
  }

  /**
   * This function login a user to the system
   */
  login(): void {
    if(this.username.value != '' && this.password.value != '') {
      this.userService.login(this.username.value, this.password.value).subscribe((data: User) => {
        if(data != null) {
          sessionStorage.setItem('user', JSON.stringify(data));
          sessionStorage.setItem('login', JSON.stringify(true));
          this.router.navigate(['home']).then();
        }
        else {
          this.openDialog();
        }
      });

    }
  }

  /**
   * This function open a dialog with a form to recovery password
   */
  recoveryPassword(): void {
    this.recovery_password = true;
    this.openDialog();
    this.recovery_password = false;
  }

  /**
   * This function open the dialog message
   */
  openDialog() {
    // Dialog recovery password
    if(this.recovery_password) {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '640px',
        data: {flag: 10}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    // Dialog Error empty fields
    else {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {flag: 4}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }
}
