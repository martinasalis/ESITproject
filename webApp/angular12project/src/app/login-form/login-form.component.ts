import {Component, Injectable, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms'

import {Observable, of} from "rxjs";
import {LoginService, User} from "../login.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  username = new FormControl('');
  password = new FormControl('');
  user: User = {nome: '', cognome: '', cf: '', username: '', password: ''};

  constructor(private service: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.login();
  }

  login(): void {
    this.service.login(this.username.value, this.password.value).subscribe(data => {
      this.user = data;
    });

    this.router.navigate(['/home'], {queryParams: {user: this.user}});
  }

  logout(): void {

  }

}
