import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService, User } from "../user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  home_doctor = false;
  navbar = true;
  user: User = {nome: '', cognome: '', cf: '', username: '', password: ''};

  constructor(private router: Router, private userService: UserService) {
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
  }

}
