import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginFormComponent} from './login-form.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {Type, User, UserService} from "../user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Observable, of, EMPTY} from "rxjs";

class MockUserService extends UserService {

  login(uname: String, psw: String): Observable<User> {
    if(uname == 'luca' && psw == '12345') {
      return of({_id: '1', name: 'Luca', surname: 'Grassi', username: 'luca', password: '12345',
        dob: new Date('14/07/1997'), phone: '3333415523', mail: 'lucagra97@gmail.com', type: Type.DOCTOR});
    }
    else {
      return EMPTY;
    }
  }

}

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
        { provide: UserService, useClass: MockUserService }
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
    expect(sessionStorage.getItem('user')).not.toEqual(JSON.stringify({_id: '1', name: 'Luca',
      surname: 'Grassi', username: 'luca', password: '12345', dob: new Date('14/07/1997'),
      phone: '3333415523', mail: 'lucagra97@gmail.com', type: Type.DOCTOR}));
  });

  it('control valid user value form login', () => {
    component.username.setValue('luca');
    component.password.setValue('12345');
    component.login();
    expect(JSON.parse(sessionStorage.getItem('login')!)).toEqual(JSON.parse('true'));
    expect(sessionStorage.getItem('user')).toEqual(JSON.stringify({_id: '1', name: 'Luca',
      surname: 'Grassi', username: 'luca', password: '12345', dob: new Date('14/07/1997'),
      phone: '3333415523', mail: 'lucagra97@gmail.com', type: Type.DOCTOR}));
  });

});
