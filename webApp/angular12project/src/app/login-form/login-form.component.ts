import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { UserService, User } from "../user.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  username = new FormControl('');
  password = new FormControl('');
  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: ''};

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.login();
  }

  login(): void {
    if(this.username.value != '' && this.password.value != '') {
      this.userService.login(this.username.value, this.password.value).subscribe((data: User) => {
        this.userService.setUser(data);
        console.log(data);
        this.user = this.userService.getUser();
        this.router.navigate(['home']);
      });
    }
  }

  logout(): void {

  }

}
