import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Type, User, UserService} from "../user.service";
import {Doctor, DoctorService, Notice} from "../doctor.service";
import {Patient, PatientService} from "../patient.service";
import {MatDialog} from "@angular/material/dialog";
import {Sensor} from "../sensor.service";
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-page-sensor',
  templateUrl: './page-sensor.component.html',
  styleUrls: ['./page-sensor.component.css']
})
export class PageSensorComponent implements OnInit {

  navbar = false;
  page_doctor = false;
  page_patient = false;
  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};
  doc: Doctor = {_id: '', dob: Date.prototype, mail: '', phone: '', role: '', notice: Notice.DEFAULT, img: {data: Buffer.prototype, contentType: ""}};
  pat: Patient = {_id: '', dob: Date.prototype, mail: '', phone: '', dor: Date.prototype, address: '', doctor: '', description: ''};
  clickedSensor: any;
  index: number = 0;
  indices: string[] = [];
  chartData: any;
  chartLabels: any;
  chartOptions: any;
  nums: number[] = [];
  date: string = '';

  constructor(private router: Router, private userService: UserService, private doctorService: DoctorService,
              private patientService: PatientService, public dialog: MatDialog) {
    if(JSON.parse(sessionStorage.getItem('login')!)) {
      this.user = JSON.parse(sessionStorage.getItem('user')!);
      this.clickedSensor = this.router.getCurrentNavigation()?.extras.state?.boardData;
      this.index = this.router.getCurrentNavigation()?.extras.state?.index;

      this.clickedSensor.Items.forEach((obj: any, i: number) => {
        const d = new Date(obj.data_timestamp);
        this.indices.push(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
        this.nums.push(obj.device_data.data[this.index].data);
        //this.indices.push('Sec: ' + (i+1).toString());
      });
      /*
      const d = new Date(this.clickedSensor.Items[this.clickedSensor.length - 1].data_timestamp);
      this.date = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ", " + d.toLocaleDateString();
      console.log(this.date);
      console.log(this.nums.length);
      */


    }
    else {
      this.router.navigate(['']).then();
    }
  }



  ngOnInit(): void {

    if(this.user.type == Type.DOCTOR){
      this.page_doctor = true;
      this.doc = this.doctorService.getDoctor();
    }
    else if(this.user.type == Type.PATIENT){
      this.page_patient = true;
      this.pat = this.patientService.getPatient();
    }

    this.chartData = [
      {
        data: this.nums,
        label: 'Dati sensore'
      }
    ];

    this.chartLabels = this.indices;

    this.chartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
  }



}
