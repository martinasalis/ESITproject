import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import {Observable, of} from "rxjs";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  username: string | undefined;

  constructor(
  ) { }

  ngOnInit(): void {
    this.logout();
  }

  login(): void {
    if (this.username) {

    } else {

    }
  }

  logout(): void {

  }

}
