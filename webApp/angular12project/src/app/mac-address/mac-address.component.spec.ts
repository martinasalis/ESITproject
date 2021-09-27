import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MACAddressComponent } from './mac-address.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { Type, UserService } from "../user.service";
import { MockUserService } from "../../mocks/user.service.mock";
import { PatientService } from "../patient.service";
import { MockPatientService } from "../../mocks/patient.service.mock";

describe('MACAddressComponent', () => {
  let component: MACAddressComponent;
  let fixture: ComponentFixture<MACAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MACAddressComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatDialogModule
      ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        MockUserService,
        { provide: PatientService, useClass: MockPatientService },
        MockPatientService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // Define session variables
    spyOn(sessionStorage, 'getItem')
      .withArgs('login').and.returnValue(JSON.stringify(true))
      .withArgs('user').and.returnValue(JSON.stringify({_id: "CSNZNE62A12L736G", name: "Zeno",
      surname: "Cosini", username: "admin", password: "123", mail: "lucagra97@gmail.com", phone: "3268793592",
      dob: new Date("1965-08-12"), type: Type.ADMIN}));

    fixture = TestBed.createComponent(MACAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('control empty form add mac to patient', () => {
    component.mac.setValue('');
    component.patientControl.setValue('');

    expect(component.mac.valid).toBeFalsy();
    expect(component.patientControl.valid).toBeFalsy();
  });

  it('control invalid form add mac to patient', () => {
    component.mac.setValue('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

    expect(component.mac.valid).toBeFalsy();
  });

  it('control valid form add mac to patient', () => {
    component.mac.setValue('aaaaaaaaaaaa');
    component.patientControl.setValue('aaaaaaaaaaaaaaaa');

    expect(component.mac.valid).toBeTruthy();
    expect(component.patientControl.valid).toBeTruthy();
  });

});
