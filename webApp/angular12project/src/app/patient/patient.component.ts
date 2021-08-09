import {Component, OnInit} from '@angular/core';
import {Type, User, UserService} from "../user.service";
import {DoctorService} from "../doctor.service";
import {Patient, PatientService} from "../patient.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  navbar = false;
  page_patient = false;
  page_info = false;
  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};
  pat: Patient = {_id: '', dob: Date.prototype, mail: '', phone: '', dor: Date.prototype, address: '', doctor: ''};
  clickedRow: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};

  constructor(private router: Router, private userService: UserService, private doctorService: DoctorService,
              private patientService: PatientService) {
    this.clickedRow = this.router.getCurrentNavigation()?.extras.state?.clickedUser;
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
    if(this.user.type == Type.PATIENT){
      this.page_patient = true;
      this.navbar = true;
      this.patientService.info(this.user._id).subscribe((data: Patient) => {
        this.patientService.setPatient(data);
        this.pat = this.patientService.getPatient();
      });

    }

    if(this.clickedRow.type == Type.PATIENT){
      this.page_info = true;
      this.navbar = true;

      this.userService.info(this.clickedRow._id).subscribe((data: User) => {
        console.log(data);
      });

      this.patientService.info(this.clickedRow._id).subscribe((data: Patient) => {
        this.patientService.setPatient(data);
        this.pat = this.patientService.getPatient();
      });
    }

  }

}
