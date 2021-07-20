import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { LoginService, User } from "../login.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  username = new FormControl('');
  password = new FormControl('');
  public user: User = {nome: '', cognome: '', cf: '', username: '', password: ''};

  constructor(private service: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.login();
  }

  login(): void {
    if(this.username.value != '' && this.password.value != '') {
      this.service.login(this.username.value, this.password.value).subscribe(data => {
        // @ts-ignore
        this.user.nome = data[0].nome;
        // @ts-ignore
        this.user.cognome = data[0].cognome;
        // @ts-ignore
        this.user.cf = data[0].cf;
        // @ts-ignore
        this.user.username = data[0].username;
        // @ts-ignore
        this.user.password = data[0].password;

        this.router.navigate(['home'], {state: {user: this.user}});
      });
    }
  }

  logout(): void {

  }

}
