import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Type, User, UserService } from "../user.service";
import { Doctor, DoctorService, Notice } from "../doctor.service";
import { Patient, PatientService } from "../patient.service";
import { MatDialog } from "@angular/material/dialog";
import { SensorService } from "../sensor.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-page-sensor',
  templateUrl: './page-sensor.component.html',
  styleUrls: ['./page-sensor.component.css']
})
export class PageSensorComponent implements OnInit {

  navbar = false;
  page_doctor = false;
  page_patient = false;
  user: User = {_id: '', name: '', surname: '', username: '', password: '', mail: '', phone: '', dob: Date.prototype, type: Type.DEFAULT};
  doc: Doctor = {_id: '', role: '', notice: Notice.DEFAULT};
  pat: Patient = {_id: '', dor: Date.prototype, address: '', doctor: '', board: '', description: ''};
  clickedSensor: any;
  clickedPatient: User = {_id: '', name: '', surname: '', username: '', password: '', mail: '', phone: '', dob: Date.prototype, type: Type.DEFAULT};
  index: number = 0;
  indices: string[] = [];
  chartData: any;
  charSingleData: any;
  chartLabels: any;
  chartOptions: any;
  last_day: number[] = [];
  last2_day: number[] = [];
  last3_day: number[] = [];
  mean_last_n: number = 0;
  date_last_day: string = '';
  date_last2_day: string = '';
  date_last3_day: string = '';
  date: string = '';
  um: String = '';
  N: number = 0;
  last_n = new FormControl('');

  constructor(private router: Router, private userService: UserService, private doctorService: DoctorService,
              private patientService: PatientService, public dialog: MatDialog, private sensorService: SensorService) {
    if(JSON.parse(sessionStorage.getItem('login')!)) {
      this.user = JSON.parse(sessionStorage.getItem('user')!);
      this.clickedSensor = this.router.getCurrentNavigation()?.extras.state?.boardData;
      this.index = this.router.getCurrentNavigation()?.extras.state?.index;
      this.clickedPatient = this.router.getCurrentNavigation()?.extras.state?.clickedUser;

      let last_date = new Date(this.clickedSensor.Items[this.clickedSensor.Items.length - 1].data_timestamp);
      let start_last_date = new Date(last_date.getFullYear(), last_date.getMonth(), last_date.getDate()).getTime();
      let end_last_date = new Date(last_date.getFullYear(), last_date.getMonth(), last_date.getDate(), 23,59,59).getTime();

      this.sensorService.getUnitMeasure(this.clickedSensor.Items[0].device_data.data[this.index].sensor).subscribe((data: String) => {
        this.um = data;
      });

      this.last_n.setValidators([Validators.min(0), Validators.max(this.clickedSensor.Items.length), Validators.required]);

      for(let i = this.clickedSensor.Items.length - 1; i >= 0; i--) {

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

    // Data for page doctor
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

    // Data for page patient
    this.charSingleData = [
      {
        data: this.last_day,
        label: 'Dati sensore in data: ' + this.date_last_day
      }
    ];

    this.chartLabels = this.indices;

    this.chartOptions = {
      responsive: true,
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'valore sensore'
          }
        }],
        xAxes:[{
          scaleLabel: {
            display: true,
            labelString: 'minuti (m)'
          },
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

  /**
   * This function send to the previous page
   */
  undo(): void {
    this.router.navigate(['patient'], {state: {clickedUser: this.clickedPatient}}).then();
  }

  /**
   * This function compute the average to N data
   * @param {number} N - Number of data
   */
  last_n_data(N: number): void {
    if(Number.isNaN(N)) {
      this.mean_last_n = 0;
    }
    else {
      this.N = N;
      this.mean_last_n = 0;
      let i = this.clickedSensor.Items.length - 1;

      for (let j = 0; j < N; j++) {
        this.mean_last_n = this.mean_last_n + this.clickedSensor.Items[i].device_data.data[this.index].data;
        i = i - 1;
      }

      this.mean_last_n = this.mean_last_n / N;
    }
  }

  /**
   * This function open the error message for form fied
   */
  getErrorMessage() {
    if(this.last_n.hasError('required')) {
      return 'Devi inserire un valore';
    }
    else if(this.last_n.hasError('min')) {
      return 'Devi inserire un valore maggiore di 0';
    }
    return this.last_n.hasError('max') ? 'Devi inerire un valore inferiore a ' +  this.clickedSensor.Items.length : '';
  }

}
