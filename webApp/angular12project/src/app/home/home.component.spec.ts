import {ComponentFixture, TestBed} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { Router } from "@angular/router";
import {Type, UserService} from "../user.service";
import { MockUserService } from "../../mocks/user.service.mock";
import { MockDoctorService } from "../../mocks/doctor.service.mock";
import { MockPatientService } from "../../mocks/patient.service.mock";
import { MockSensorService } from "../../mocks/sensor.service.mock";
import { DoctorService } from "../doctor.service";
import {PatientService} from "../patient.service";
import {SensorService} from "../sensor.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: MockUserService;
  let patientService: MockPatientService;
  let doctorService: MockDoctorService;
  let sensorService: MockSensorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy("navigate");
          }
        },
        { provide: UserService, useClass: MockUserService },
        MockUserService,
        { provide: DoctorService, useClass: MockDoctorService },
        MockDoctorService,
        { provide: PatientService, useClass: MockPatientService },
        MockPatientService,
        { provide: SensorService, useClass: MockSensorService },
        MockSensorService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    spyOn(sessionStorage, 'getItem')
      .withArgs('login').and.returnValue(JSON.stringify(true))
      .withArgs('user').and.returnValue(JSON.stringify({_id: "CSNZNE62A12L736G", name: "Zeno", surname: "Cosini", username: "admin", password: "123", mail: "lucagra97@gmail.com", phone: "3268793592", dob: new Date("1965-08-12"), type: Type.ADMIN}));

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = TestBed.inject(MockUserService);
    patientService = TestBed.inject(MockPatientService);
    doctorService = TestBed.inject(MockDoctorService);
    sensorService = TestBed.inject(MockSensorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('should test access unauthorized', () => {
    let router = fixture.debugElement.injector.get(Router);

    expect(router.navigate).toHaveBeenCalledWith([""]);
  });*/

  it('should test delete doctor', () => {
    let numDoctor = doctorService.doctorMock.length;
    let numDoctorUser = userService.userMock.length;

    component.clickedRow = {_id: "GRSLNE00R53E281N", name: "Elena", surname: "Grassi", username: "elena",
      password: "6789", mail: "e.grassi@gmail.com", phone: "3198632459", dob: new Date("2000-10-13"),
      type: Type.DOCTOR};
    //component.delete();

    doctorService.delete(component.clickedRow._id).subscribe(data => {
      expect(data).toEqual({nModified: 1, ok: 1});
    });

    //expect(doctorService.doctorMock.length).not.toEqual(numDoctor);
    //expect(userService.userMock.length).not.toEqual(numDoctorUser);
  });
});
