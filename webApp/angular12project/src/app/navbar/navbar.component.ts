import { Component, OnInit } from '@angular/core';
import { UserService, User} from "../user.service";
import { Router } from "@angular/router";
import {Doctor, DoctorService} from "../doctor.service";
import {Patient, PatientService} from "../patient.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: ''};

  constructor(private router: Router, private userService: UserService, private doctorService: DoctorService, private patintService: PatientService) {
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {

  }

  page_info(): void {
    this.router.navigate(['page-info'], {state: {user: this.user}});
  }

}
