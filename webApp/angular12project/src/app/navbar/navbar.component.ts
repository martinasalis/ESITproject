import { Component, OnInit } from '@angular/core';
import { UserService, User} from "../user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User = {nome: '', cognome: '', cf: '', username: '', password: ''};

  constructor(private router: Router, private userService: UserService) {
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
  }

  page_info(): void {
    this.router.navigate(['page-info'], {state: {user: this.user}});
  }

}
