import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Type, User, UserService } from "../user.service";
import { Doctor, DoctorService } from "../doctor.service";
import { Router } from "@angular/router";
import { Patient, PatientService } from "../patient.service";

@Component({
  selector: 'app-modify-form',
  templateUrl: './modify-form.component.html',
  styleUrls: ['./modify-form.component.css']
})
export class ModifyFormComponent implements OnInit {

  modify_doctor = false;
  modify_patient = false;

  username = new FormControl('');
  name = new FormControl('');
  surname = new FormControl('');
  mail = new FormControl('');
  dob = new FormControl('');
  tc = new FormControl('');
  phone = new FormControl('');
  dor = new FormControl('');
  address = new FormControl('');

  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};
  doc: Doctor = {_id: '', dob: Date.prototype, mail: '', phone: '', role: ''};
  pat: Patient = {_id: '', dob: Date.prototype, mail: '', phone: '', dor: Date.prototype, address: ''};
  clickedRow: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};

  constructor(private userService: UserService, private router: Router, private doctorService: DoctorService,
              private patientService: PatientService) {
    this.clickedRow = this.userService.getUser();
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
    this.save();
  }

  save(): void {

    //controllare negli if se l'utente selezionato è paziente o dottore
    // il controllo presente è sbagliato

    if(this.clickedRow.type == Type.DOCTOR) {
      this.modify_doctor = true;
      this.doctorService.info(this.clickedRow._id).subscribe((data: Doctor) => {
        this.doctorService.update(this.clickedRow._id, data);
        console.log(data);
      });
    }
    else if(this.clickedRow.type == Type.PATIENT) {
      this.modify_patient = true;
      this.patientService.info(this.clickedRow._id).subscribe((data: Patient) => {
        this.patientService.update(this.clickedRow._id, data);
        console.log(data);
      });
    }
  }


}
