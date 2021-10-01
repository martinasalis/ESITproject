import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Type, User, UserService} from "../user.service";
import {Doctor, DoctorService, Notice} from "../doctor.service";
import {Patient, PatientService} from "../patient.service";
import {MatDialog} from "@angular/material/dialog";
import {SensorService} from "../sensor.service";
import {FormControl, Validators} from "@angular/forms";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-page-sensor',
  templateUrl: './page-sensor.component.html',
  styleUrls: ['./page-sensor.component.css']
})
export class PageSensorComponent implements OnInit {

  // Flags type of element to add
  navbar = false;
  page_doctor = false;
  page_patient = false;

  source = interval(2000);
  subscription: Subscription = Subscription.prototype;

  user: User = {_id: '', name: '', surname: '', username: '', password: '', mail: '', phone: '', dob: Date.prototype, type: Type.DEFAULT};
  doc: Doctor = {_id: '', role: '', notice: Notice.DEFAULT};
  pat: Patient = {_id: '', dor: Date.prototype, address: '', doctor: '', board: '', description: ''};
  clickedSensor: any;
  clickedPatient: User = {_id: '', name: '', surname: '', username: '', password: '', mail: '', phone: '', dob: Date.prototype, type: Type.DEFAULT};

  // Variables for charts
  index: number = 0;
  chartData: any;
  charSingleData: any;
  chartOptions: any;
  last_day: any[] = [];
  last2_day: any[] = [];
  last3_day: any[] = [];
  mean_last_n: number = 0;
  date_last_day: string = '';
  date_last2_day: string = '';
  date_last3_day: string = '';
  date: string = '';
  um: String = '';
  N: number = 0;
  last_n = new FormControl('');
  last_values: any;

  constructor(private router: Router, private userService: UserService, private doctorService: DoctorService,
              private patientService: PatientService, public dialog: MatDialog, private sensorService: SensorService) {
    if(JSON.parse(sessionStorage.getItem('login')!)) {
      this.user = JSON.parse(sessionStorage.getItem('user')!);
      // Set informations previous page
      this.clickedSensor = this.router.getCurrentNavigation()?.extras.state?.boardData;
      this.index = this.router.getCurrentNavigation()?.extras.state?.index;
      this.clickedPatient = this.router.getCurrentNavigation()?.extras.state?.clickedUser;

      // The current value is update every 2 seconds
      this.subscription = this.source.subscribe(val => this.get_last_value());

      this.last_values = this.clickedSensor.Items[0].device_data.data[this.index];

      // Compute data time
      let last_date = new Date(this.clickedSensor.Items[this.clickedSensor.Items.length - 1].data_timestamp);
      let start_last_date = new Date(last_date.getFullYear(), last_date.getMonth(), last_date.getDate()).getTime();
      let end_last_date = new Date(last_date.getFullYear(), last_date.getMonth(), last_date.getDate(), 23,59,59).getTime();

      // Set unit of measure
      this.sensorService.getUnitMeasure(this.clickedSensor.Items[0].device_data.data[this.index].sensor).subscribe((data: String) => {
        this.um = data;
      });

      this.last_n.setValidators([Validators.min(0), Validators.max(this.clickedSensor.Items.length), Validators.required]);

      // Create arrays to data graph for 3 days
      for(let i = this.clickedSensor.Items.length - 1; i >= 0; i--) {

        if(this.clickedSensor.Items[i].data_timestamp >= start_last_date && this.clickedSensor.Items[i].data_timestamp <= end_last_date) {
          const d = new Date(this.clickedSensor.Items[i].data_timestamp);
          this.date_last_day = d.toLocaleDateString();
          this.last_day.push({x: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(), y: this.clickedSensor.Items[i].device_data.data[this.index].data});
        }
        else if(this.clickedSensor.Items[i].data_timestamp >= (start_last_date - 86400000) && this.clickedSensor.Items[i].data_timestamp <= (end_last_date - 86400000)) {
          const d = new Date(this.clickedSensor.Items[i].data_timestamp);
          this.date_last2_day = d.toLocaleDateString();
          this.last2_day.push({x: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(), y: this.clickedSensor.Items[i].device_data.data[this.index].data});
        }
        else if(this.clickedSensor.Items[i].data_timestamp >= (start_last_date - 172800000) && this.clickedSensor.Items[i].data_timestamp <= (end_last_date - 172800000)) {
          const d = new Date(this.clickedSensor.Items[i].data_timestamp);
          this.date_last3_day = d.toLocaleDateString();
          this.last3_day.push({x: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(), y: this.clickedSensor.Items[i].device_data.data[this.index].data});
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

      this.patientService.info(this.clickedPatient._id).subscribe((data: Patient) => {
        this.patientService.setPatient(data);
        this.pat = this.patientService.getPatient();
      });
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
            unitStepSize: 1,
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
   * This function insert in the chart the last value saved in DynamoDB and
   * update the current value shown with the last value saved in DynamoDB
   */
  get_last_value(): void {
    this.patientService.getBoardSensorData(this.pat).subscribe(data => {
      this.last_values = data.Items[data.Items.length - 1].device_data.data[this.index];
      const d = new Date(data.Items[data.Items.length - 1].data_timestamp);
      this.clickedSensor.Items.unshift(data.Items[data.Items.length - 1]);

      if(this.user.type == Type.DOCTOR) {
        this.chartData[0].data.unshift({x: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(), y: this.last_values.data});
      }
      else {
        this.charSingleData[0].data.unshift({x: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(), y: this.last_values.data});
      }
    });
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
    console.log(typeof N);
    console.log(N);
    if(N) {
      this.N = N;
      this.mean_last_n = 0;
      let i = this.clickedSensor.Items.length - 1;

      for (let j = 0; j < N; j++) {
        this.mean_last_n = this.mean_last_n + this.clickedSensor.Items[i].device_data.data[this.index].data;
        i = i - 1;
      }

      this.mean_last_n = this.mean_last_n / N;
    }
    else {
      this.N = 0;
      this.mean_last_n = 0;
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
