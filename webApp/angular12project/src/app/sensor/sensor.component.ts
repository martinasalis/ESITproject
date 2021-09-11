import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  visualize(): void {
    this.router.navigate(['page-sensor']).then();
  }

}
