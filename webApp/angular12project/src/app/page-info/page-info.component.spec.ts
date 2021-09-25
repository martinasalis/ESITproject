import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInfoComponent } from './page-info.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { Type, UserService } from "../user.service";
import { MockUserService } from "../../mocks/user.service.mock";
import { MockDoctorService } from "../../mocks/doctor.service.mock";
import { MockPatientService } from "../../mocks/patient.service.mock";
import { DoctorService, Notice } from "../doctor.service";
import { PatientService } from "../patient.service";
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from "@angular/material/radio";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PageInfoComponent', () => {
  let component: PageInfoComponent;
  let fixture: ComponentFixture<PageInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageInfoComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        MockUserService,
        { provide: DoctorService, useClass: MockDoctorService },
        MockDoctorService,
        { provide: PatientService, useClass: MockPatientService },
        MockPatientService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    spyOn(sessionStorage, 'getItem')
      .withArgs('login').and.returnValue(JSON.stringify(true))
      .withArgs('user').and.returnValue(JSON.stringify({_id: "GRSLCU97L14E281J", name: "Luca",
      surname: "Grassi", username: "luca", password: "12345", mail: "lucagra97@gmail.com", phone: "333415523",
      dob: new Date("1997-07-14"), type: Type.DOCTOR}));

    fixture = TestBed.createComponent(PageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should control if the user information is shown', () => {
    expect(component.doc).toEqual({_id: "GRSLCU97L14E281J", role: "doctor", notice: Notice.MAIL});
  });
});
