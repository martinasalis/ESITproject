import { Component, OnInit } from '@angular/core';
import { User, Type } from "../user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User = {_id: '', name: '', surname: '', username: '', password: '', mail: '', phone: '', dob: Date.prototype, type: Type.DEFAULT};

  constructor(private router: Router) {
    if(JSON.parse(sessionStorage.getItem('login')!)) {
      this.user = JSON.parse(sessionStorage.getItem('user')!);
    }
    else {
      this.router.navigate(['']).then();
    }
  }

  ngOnInit(): void {

  }

  page_info(): void {
    this.router.navigate(['page-info']).then();
  }

  home(): void {
    this.router.navigate(['home']).then();
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['']).then();
  }

}
