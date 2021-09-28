import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { Type, User, UserService } from "../user.service";
import { Doctor, DoctorService, Notice } from "../doctor.service";
import { Patient, PatientService } from "../patient.service";
import { Router } from "@angular/router";
import { NoticeDialogComponent } from "../notice-dialog/notice-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { Sensor, SensorService } from "../sensor.service";

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  // Flags type of element to add
  add_doctor = false;
  add_patient = false;
  add_sensor = false;
  add_sensor_patient = false;
  empty_field = false;
  duplicate_user = false;
  button = Number();

  // Form fields
  username = new FormControl('');
  name = new FormControl('');
  surname = new FormControl('');
  mail = new FormControl('', Validators.email);
  dob = new FormControl('');
  tc = new FormControl('', Validators.maxLength(16));
  phone = new FormControl('', Validators.maxLength(10));
  dor = new FormControl('');
  address = new FormControl('');
  role = new FormControl('');
  doctor = new FormControl('', Validators.maxLength(16));
  description = new FormControl('');
  um = new FormControl('');
  thr = new FormControl('', Validators.min(0));
  type = new FormControl('');
  typeSensor = new FormControl('', [Validators.min(1)]);
  sensorControl = new FormControl('', Validators.required);

  user: User = {_id: '', name: '', surname: '', username: '', password: '', mail: '', phone: '',  dob: Date.prototype, type: Type.DEFAULT};
  selectedPat: User = {_id: '', name: '', surname: '', username: '', password: '', mail: '', phone: '',  dob: Date.prototype, type: Type.DEFAULT};
  pat: Patient = {_id: '', dor: Date.prototype, address: '', doctor: '', board: '', description: ''};
  sens: Sensor[] = [];

  constructor(private userService: UserService, private router: Router, private doctorService: DoctorService,
              private patientService: PatientService, public dialog: MatDialog, private sensorService: SensorService) {
    if(JSON.parse(sessionStorage.getItem('login')!)) {
      this.user = JSON.parse(sessionStorage.getItem('user')!);
      // Set informations previous page
      this.button = this.router.getCurrentNavigation()?.extras.state?.data;
      this.selectedPat = this.router.getCurrentNavigation()?.extras.state?.clickedUser;
      this.thr.setValue(0);

      // If is selected a patient
      if(this.selectedPat) {
        this.patientService.info(this.selectedPat._id).subscribe((data: Patient) => {
          console.log(data);
          this.patientService.setPatient(data);
          this.pat = this.patientService.getPatient();

          // If the board of patient isn't empty
          if(this.pat.board != '') {
            this.add_sensor_patient = true;
            this.sensorService.allFreeSensors().subscribe((data: Sensor[]) => {
              this.sensorService.setSensors(data);
              this.sens = this.sensorService.getSensors();
              console.log(this.sens);

              // If there aren't available sensor
              if(this.sens.length == 0) {
                this.router.navigate(['patient'], {state: {clickedUser: this.selectedPat}});
                // Show error message
                this.openDialog();
              }
            });
          }
          else {
            this.router.navigate(['patient'], {state: {clickedUser: this.selectedPat}});
            // Show error message
            this.openDialog();
          }
        });
      }
    }
    else {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    // If the clicked button is in page doctor
    if(this.button == 0) {
      this.add_doctor = true;
    }
    // If the clicked button is in page patient
    else if(this.button == 1) {
      this.add_patient = true;
    }
    // If the clicked button is in page sensor
    else if(this.button == 2) {
      this.add_sensor = true;
    }
  }

  /**
   * This function added the element on db
   */
  add(): void {

    // If the user is a doctor
    if(this.add_doctor) {
      let newUser: User = {_id: this.tc.value, name: this.name.value, surname: this.surname.value, username: this.username.value, password: '', mail: this.mail.value, phone: this.phone.value, dob: this.dob.value, type: Type.DOCTOR};
      let newDoctor: Doctor = {_id: this.tc.value, role: this.role.value, notice: Notice.SMS};

      // If the fields are empty
      if(newUser.name == '' || newUser._id == '' || newUser.surname == '' || newUser.username == '' || this.dob.value == '' || newUser.mail == '' || newUser.phone == '' || newDoctor.role == '') {
        this.empty_field = true;
        // Show error message
        this.openDialog();
      }
      // Add doctor in db
      else {
        this.userService.info(this.tc.value).subscribe(data => {
          // If the doctor isn't in db
          if(data == null) {
            this.userService.insert(newUser).subscribe(data => {
              console.log(data);
            });
            this.doctorService.insert(newDoctor, newUser.mail, newUser.phone).subscribe(data => {
              console.log(data);
            });

            this.router.navigate(['home']);
            this.openDialog();
          }
          // Show error message
          else {
            this.duplicate_user = true;
            this.openDialog();
            this.duplicate_user = false;
          }
        });
      }
    }
    // If the user is a patient
    else if(this.add_patient) {
      let doctor_patient: String = '';

      if(this.user.type == Type.DOCTOR)
        doctor_patient = this.user._id;
      else
        doctor_patient = this.doctor.value;

      let newUser: User = {_id: this.tc.value, name: this.name.value, surname: this.surname.value, username: this.username.value, password: '', mail: this.mail.value, phone: this.phone.value, dob: this.dob.value, type: Type.PATIENT};
      let newPatient: Patient = {_id: this.tc.value, dor: this.dor.value, address: this.address.value, doctor: doctor_patient, board: '', description: this.description.value};

      // If the fields are empty
      if(newUser.name == '' || newUser._id == '' || newUser.surname == '' || newUser.username == '' || this.dob.value == '' || this.dor.value == '' || newUser.mail == '' || newUser.phone == '' || newPatient.address == '' || newPatient.doctor == '' || newPatient.description == '') {
        this.empty_field = true;
        // Show error message
        this.openDialog();
      }
      // Add patient in db
      else {
        this.userService.info(this.tc.value).subscribe(data => {
          console.log(data);
          // If the patient isn't in db
          if(data == null) {
            this.userService.insert(newUser).subscribe(data => {
              console.log(data);
            });

            this.patientService.insert(newPatient).subscribe(data => {
              console.log(data);
            });

            this.router.navigate(['home']);
            this.openDialog();
          }
          // Show error message
          else {
            this.duplicate_user = true;
            this.openDialog();
            this.duplicate_user = false;
          }
        });

      }
    }
    // Add sensor
    else if(this.add_sensor){
      let newSensor: Sensor = {_id: '', name: this.name.value, um: this.um.value, threshold: this.thr.value, type: this.typeSensor.value, board: ''};

      // If the fields are empty
      if(newSensor.name == '' || newSensor.um == '' || newSensor.threshold == 0 || newSensor.type == 0){
        this.empty_field = true;
        // Show error message
        this.openDialog();
      }
      // Add sensor in db
      else {
        this.sensorService.insert(newSensor).subscribe(data => {
          console.log(data);
        });

        this.router.navigate(['home']);
        this.openDialog();
      }
    }
    // Add sensor to patient
    else if(this.add_sensor_patient) {
      let newSensor: Sensor = {_id: this.sensorControl.value._id, name: this.sensorControl.value.name,
        type: this.sensorControl.value.type, um: this.sensorControl.value.um, board: this.pat.board, threshold: this.thr.value};

      // If the threshold isn't valid
      if(newSensor.threshold == 0){
        this.empty_field = true;
        // Show error message
        this.openDialog();
      }
      // Add sensor to patient in db
      else{
        this.sensorService.insertBoard(newSensor).subscribe(data => {
          console.log(data);
        });

        this.router.navigate(['patient'], {state: {clickedUser: this.selectedPat}});
        this.openDialog();
      }

    }
  }

  /**
   * This function open the dialog message
   */
  openDialog() {
    // Dialog Error empty field
    if(this.empty_field){
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {flag: 6}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });

      this.empty_field = false;
    }
    // Dialog Error duplicate users
    else if(this.duplicate_user){
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {flag: 12}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    // Dialog added doctor
    else if (this.add_doctor) {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 1, flag: 3}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    // Dialog added patient
    else if (this.add_patient) {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 2, flag: 3}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    // Dialog added sensor
    else if(this.add_sensor){
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 3, flag: 3}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    // Dialog added sensor to patient
    else if(this.add_sensor_patient && this.sens.length != 0) {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {res: 4, flag: 3}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    // Dialog error message no sensor available
    else if(this.add_sensor_patient && this.sens.length == 0) {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {flag: 9}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    // Dialog error no connected board
    else {
      const dialogRef = this.dialog.open(NoticeDialogComponent, {
        width: '250px',
        data: {flag: 13}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }
}
