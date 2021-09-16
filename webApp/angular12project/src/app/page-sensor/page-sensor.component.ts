import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Type, User, UserService} from "../user.service";
import {Doctor, DoctorService, Notice} from "../doctor.service";
import {Patient, PatientService} from "../patient.service";
import {MatDialog} from "@angular/material/dialog";
import {Sensor} from "../sensor.service";
import { ChartsModule } from 'ng2-charts';
import * as moment from "moment";

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
  last_day: number[] = [];
  last2_day: number[] = [];
  last3_day: number[] = [];
  date_last_day: string = '';
  date_last2_day: string = '';
  date_last3_day: string = '';
  date: string = '';

  constructor(private router: Router, private userService: UserService, private doctorService: DoctorService,
              private patientService: PatientService, public dialog: MatDialog) {
    if(JSON.parse(sessionStorage.getItem('login')!)) {
      this.user = JSON.parse(sessionStorage.getItem('user')!);
      this.clickedSensor = this.router.getCurrentNavigation()?.extras.state?.boardData;
      this.index = this.router.getCurrentNavigation()?.extras.state?.index;

      let last_date = new Date(this.clickedSensor.Items[this.clickedSensor.Items.length - 1].data_timestamp);
      let start_last_date = new Date(last_date.getFullYear(), last_date.getMonth(), last_date.getDate()).getTime();
      let end_last_date = new Date(last_date.getFullYear(), last_date.getMonth(), last_date.getDate(), 23,59,59).getTime();

      for(let i = this.clickedSensor.Items.length-1; i >= 0; i--) {

        if(this.clickedSensor.Items[i].data_timestamp >= start_last_date && this.clickedSensor.Items[i].data_timestamp <= end_last_date) {
          const d = new Date(this.clickedSensor.Items[i].data_timestamp);
          this.date_last_day = d.toLocaleDateString();
          this.indices.push(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
          this.last_day.push(this.clickedSensor.Items[i].device_data.data[this.index].data);

        }
        else if(this.clickedSensor.Items[i].data_timestamp >= (start_last_date - 86400000) && this.clickedSensor.Items[i].data_timestamp <= (end_last_date - 86400000)) {
          const d = new Date(this.clickedSensor.Items[i].data_timestamp);
          this.date_last2_day = d.toLocaleDateString();
          this.indices.push(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
          this.last2_day.push(this.clickedSensor.Items[i].device_data.data[this.index].data);
        }
        else if(this.clickedSensor.Items[i].data_timestamp >= (start_last_date - 172800000) && this.clickedSensor.Items[i].data_timestamp <= (end_last_date - 172800000)) {
          const d = new Date(this.clickedSensor.Items[i].data_timestamp);
          this.date_last3_day = d.toLocaleDateString();
          this.indices.push(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
          this.last3_day.push(this.clickedSensor.Items[i].device_data.data[this.index].data);
        }
      }

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
        data: this.last_day,
        label: 'Dati sensore in data: ' + this.date_last_day
      },
      {
        data: this.last2_day,
        label: 'Dati sensore in data: ' + this.date_last2_day
      },
      {
        data: this.last3_day,
        label: 'Dati sensore in data: ' + this.date_last3_day
      }
    ];


    this.chartLabels = this.indices;

    this.chartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        },
        xAxes:[{
          type: 'time',
          time: {
            format: "HH:mm:ss",
            unit: 'minute',
            unitStepSize: 10,
            displayFormats: {
              'second': 'HH:mm:ss',
              'minute': 'HH:mm:ss',
              'hour': 'HH:mm:ss',
              min: '00:00:00',
              max: '23:59:59'
            },
          }
        }],
      }
    };
  }



}
