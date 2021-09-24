import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginFormComponent} from './login-form.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {Type, User, UserService} from "../user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MockUserService} from "../../mocks/user.service.mock";


describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        MockUserService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sessionStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('control not set value form login', () => {
    component.username.setValue('');
    component.password.setValue('');
    expect(component.username.valid).toBeFalsy();
    expect(component.password.valid).toBeFalsy();
  });

  it('control not valid value form login', () => {
    component.username.setValue('pippo');
    component.password.setValue('pluto');
    component.login();
    expect(JSON.parse(sessionStorage.getItem('login')!)).not.toEqual(JSON.parse('true'));
    expect(sessionStorage.getItem('user')).not.toEqual(JSON.stringify({_id: "GRSLCU97L14E281J", name: "Luca",
      surname: "Grassi", username: "luca", password: "12345", mail: "lucagra97@gmail.com", phone: "333415523",
      dob: new Date("1997-07-14"), type: Type.DOCTOR}));
  });

  it('control valid user value form login', () => {
    component.username.setValue('luca');
    component.password.setValue('12345');
    component.login();
    expect(JSON.parse(sessionStorage.getItem('login')!)).toEqual(JSON.parse('true'));
    expect(sessionStorage.getItem('user')).toEqual(JSON.stringify({_id: "GRSLCU97L14E281J", name: "Luca",
      surname: "Grassi", username: "luca", password: "12345", mail: "lucagra97@gmail.com", phone: "333415523",
      dob: new Date("1997-07-14"), type: Type.DOCTOR}));
  });

});
