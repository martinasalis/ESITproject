import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddFormComponent} from './add-form.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NoticeDialogComponent} from "../notice-dialog/notice-dialog.component";
import {Type} from "../user.service";
import {Router} from "@angular/router";

class MockRouter {
  getCurrentNavigation() {
    return {
      extras: {
        state: {
          clickedUser: {_id: 'MRNMRZ93C30E410S', name: 'Maurizio', surname: 'Marini', username: 'maurizio',
            password: '6789', dob: new Date('1993-03-30'), phone: '1993-03-30', mail: 'maur_marini@tiscali.com',
            type: Type.PATIENT},
          data: 1
        }
      }
    };
  }
}

describe('AddFormComponent', () => {
  let component: AddFormComponent;
  let fixture: ComponentFixture<AddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AddFormComponent,
        NoticeDialogComponent
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: Router, useClass: MockRouter}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // Define session variables
    spyOn(sessionStorage, 'getItem')
      .withArgs('login').and.returnValue(JSON.stringify(true))
      .withArgs('user').and.returnValue(JSON.stringify({_id: 'GRSLCU97L14E281J', name: 'Luca',
      surname: 'Grassi', username: 'luca', password: '12345', dob: new Date('14/07/1997'),
      phone: '3333415523', mail: 'lucagra97@gmail.com', type: Type.DOCTOR}));

    fixture = TestBed.createComponent(AddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('control invalid form add doctor', () => {
    if(component.add_doctor){
      component.username.setValue('');
      component.name.setValue('');
      component.surname.setValue('');
      component.mail.setValue('');
      component.dob.setValue('');
      component.tc.setValue('');
      component.role.setValue('');
      component.phone.setValue('');
      expect(component.username.valid).toBeFalsy();
      expect(component.name.valid).toBeFalsy();
      expect(component.surname.valid).toBeFalsy();
      expect(component.mail.valid).toBeFalsy();
      expect(component.dob.valid).toBeFalsy();
      expect(component.tc.valid).toBeFalsy();
      expect(component.role.valid).toBeFalsy();
      expect(component.phone.valid).toBeFalsy();
    }
  });

  it('control valid form add doctor', () => {
    if(component.add_doctor){
      component.username.setValue('aaa');
      component.name.setValue('aaa');
      component.surname.setValue('aaa');
      component.mail.setValue('aaa@aaa');
      component.dob.setValue('25/12/2021');
      component.tc.setValue('aaa');
      component.role.setValue('aaaaaaaaaaaaaaaa');
      component.phone.setValue('aaaaaaaaaa');
      expect(component.username.valid).toBeTruthy();
      expect(component.name.valid).toBeTruthy();
      expect(component.surname.valid).toBeTruthy();
      expect(component.mail.valid).toBeTruthy();
      expect(component.dob.valid).toBeTruthy();
      expect(component.tc.valid).toBeTruthy();
      expect(component.role.valid).toBeTruthy();
      expect(component.phone.valid).toBeTruthy();
    }
  });

  it('control invalid form add patient', () => {
    if(component.add_patient) {
      component.username.setValue('');
      component.name.setValue('');
      component.surname.setValue('');
      component.mail.setValue('');
      component.dob.setValue('');
      component.tc.setValue('');
      component.phone.setValue('');
      component.dor.setValue('');
      component.address.setValue('');

      expect(component.username.valid).toBeFalsy();
      expect(component.name.valid).toBeFalsy();
      expect(component.surname.valid).toBeFalsy();
      expect(component.mail.valid).toBeFalsy();
      expect(component.dob.valid).toBeFalsy();
      expect(component.tc.valid).toBeFalsy();
      expect(component.phone.valid).toBeFalsy();
      expect(component.dor.valid).toBeFalsy();
      expect(component.address.valid).toBeFalsy();

      if(component.user.type == Type.ADMIN) {
        component.doctor.setValue('');
        expect(component.doctor.valid).toBeFalsy();
      }
    }
  });

  it('control valid form add patient', () => {
    if(component.add_patient) {
      component.username.setValue('aaa');
      component.name.setValue('aaa');
      component.surname.setValue('aa');
      component.mail.setValue('aaa@aaa');
      component.dob.setValue('25/12/2021');
      component.tc.setValue('aaaaaaaaaaaaaaaa');
      component.role.setValue('aaa');
      component.phone.setValue('aaaaaaaaaa');
      component.dor.setValue('25/12/2021');
      component.address.setValue('aaa');
      component.doctor.setValue('aaa');

      expect(component.username.valid).toBeTruthy();
      expect(component.name.valid).toBeTruthy();
      expect(component.surname.valid).toBeTruthy();
      expect(component.mail.valid).toBeTruthy();
      expect(component.dob.valid).toBeTruthy();
      expect(component.tc.valid).toBeTruthy();
      expect(component.role.valid).toBeTruthy();
      expect(component.phone.valid).toBeTruthy();
      expect(component.dor.valid).toBeTruthy();
      expect(component.address.valid).toBeTruthy();
      expect(component.doctor.valid).toBeTruthy();
    }
  });

  it('control invalid form add sensor', () => {
    if(component.add_sensor) {
      component.typeSensor.setValue('');
      component.name.setValue('');
      component.um.setValue('');
      component.thr.setValue('');

      expect(component.typeSensor.valid).toBeFalsy();
      expect(component.name.valid).toBeFalsy();
      expect(component.um.valid).toBeFalsy();
      expect(component.thr.valid).toBeFalsy();
    }
  });

  it('control valid form add sensor', () => {
    if(component.add_sensor) {
      component.typeSensor.setValue('aaa');
      component.name.setValue('aaa');
      component.um.setValue('aaa');
      component.thr.setValue(10);

      expect(component.typeSensor.valid).toBeTruthy();
      expect(component.name.valid).toBeTruthy();
      expect(component.um.valid).toBeTruthy();
      expect(component.thr.valid).toBeTruthy();
    }
  });

  it('control invalid form add sensor patient', () => {
    if(component.add_sensor_patient) {
      component.sensorControl.setValue('');
      component.thr.setValue('');

      expect(component.sensorControl.valid).toBeFalsy();
      expect(component.thr.valid).toBeFalsy();
    }
  });

  it('control valid form add sensor patient', () => {
    if(component.add_sensor_patient) {
      component.sensorControl.setValue('aaaaaaaaaaaaaa');
      component.thr.setValue(10);
      
      expect(component.sensorControl.valid).toBeTruthy();
      expect(component.thr.valid).toBeTruthy();
    }
  });

});
