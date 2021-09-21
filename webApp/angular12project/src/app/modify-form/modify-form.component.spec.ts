import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyFormComponent } from './modify-form.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('ModifyFormComponent', () => {
  let component: ModifyFormComponent;
  let fixture: ComponentFixture<ModifyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyFormComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatDialogModule,
        BrowserModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('control invalid form modify doctor', () => {
    if(component.modify_doctor){
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

  it('control valid form modify doctor', () => {
    if(component.modify_doctor){
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

  it('control invalid form modify patient', () => {
    if(component.modify_patient) {
      component.username.setValue('');
      component.name.setValue('');
      component.surname.setValue('');
      component.mail.setValue('');
      component.dob.setValue('');
      component.tc.setValue('');
      component.role.setValue('');
      component.phone.setValue('');
      component.dor.setValue('');
      component.address.setValue('');
      expect(component.username.valid).toBeFalsy();
      expect(component.name.valid).toBeFalsy();
      expect(component.surname.valid).toBeFalsy();
      expect(component.mail.valid).toBeFalsy();
      expect(component.dob.valid).toBeFalsy();
      expect(component.tc.valid).toBeFalsy();
      expect(component.role.valid).toBeFalsy();
      expect(component.phone.valid).toBeFalsy();
      expect(component.dor.valid).toBeFalsy();
      expect(component.address.valid).toBeFalsy();
    }
  });

  it('control valid form modify patient', () => {
    if(component.modify_patient) {
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
    }
  });

  it('control invalid form modify sensor', () => {
    if(component.modify_sensor) {
      component.name_sensor.setValue('');
      component.um.setValue('');
      expect(component.name_sensor.valid).toBeFalsy();
      expect(component.um.valid).toBeFalsy();
    }
  });

  it('control valid form modify sensor', () => {
    if(component.modify_sensor) {
      component.name_sensor.setValue('aaa');
      component.um.setValue('aaa');
      expect(component.name_sensor.valid).toBeTruthy();
      expect(component.um.valid).toBeTruthy();
    }
  });

  it('control invalid form modify sensor by doctor', () => {
    if(component.modify_sensor_doctor) {
      component.thr.setValue(-1);
      expect(component.thr.valid).toBeFalsy();
    }
  });

  it('control valid form modify sensor by doctor', () => {
    if(component.modify_sensor_doctor) {
      component.thr.setValue(10);
      expect(component.thr.valid).toBeTruthy();
    }
  });

});
