import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.css']
})
export class PageInfoComponent implements OnInit {

  navbar = true;
  home_doctor = true;
  constructor() { }

  ngOnInit(): void {
  }

}
