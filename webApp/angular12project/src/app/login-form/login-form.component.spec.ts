import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { UserService } from "../user.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
        UserService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('control invalid form login', () => {
    component.username.setValue('');
    component.password.setValue('');
    expect(component.username.valid).toBeFalsy();
    expect(component.password.valid).toBeFalsy();
  });
});
