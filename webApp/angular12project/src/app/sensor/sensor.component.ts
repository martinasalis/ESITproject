import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BoardService } from "../board.service";

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {

  constructor(private router: Router, private boardService: BoardService) { }

  ngOnInit(): void {
  }

  visualize(): void {
    this.router.navigate(['page-sensor']).then();
  }

}
