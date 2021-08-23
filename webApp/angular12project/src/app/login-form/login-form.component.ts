import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { UserService, User, Type } from "../user.service";
import {MatDialog} from "@angular/material/dialog";
import {NoticeDialogComponent} from "../notice-dialog/notice-dialog.component";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  username = new FormControl('');
  password = new FormControl('');
  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};

  constructor(private userService: UserService, private router: Router, public dialog: MatDialog) { }

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
          this.userService.setUser(data);
          this.user = this.userService.getUser();
          this.router.navigate(['home']).then();
        }
        else{
          this.openDialog()
        }
      });
    }
  }

  openDialog(){
    const dialogRef = this.dialog.open(NoticeDialogComponent, {
      width: '250px',
      data: {flag: 4}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
