import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeDialogComponent } from './notice-dialog.component';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { HttpClientModule } from "@angular/common/http";
import { MockUserService } from "../../mocks/user.service.mock";
import { UserService } from "../user.service";

describe('NoticeDialogComponent', () => {
  let component: NoticeDialogComponent;
  let fixture: ComponentFixture<NoticeDialogComponent>;
  let service: MockUserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeDialogComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        MatDialogModule,
        HttpClientModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        { provide: UserService, useClass: MockUserService },
        MockUserService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(MockUserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('control invalid form recovery password', () => {
    component.mail.setValue('aa');
    expect(component.mail.valid).toBeFalsy();
  });

  it('control empty form field recovery password', () => {
    component.mail.setValue('');
    expect(component.mail.valid).toBeFalsy();
  });

  it('control valid form recovery password', () => {
    component.mail.setValue('aa@aa');
    expect(component.mail.valid).toBeTruthy();
  });

  it('control if a user is saved yet in the system', () => {
    component.mail.setValue('lucagra97@gmail.com');
    service.recoveryPassword(component.mail.value).subscribe(data => {
      expect(data).toEqual({nModified: 1, ok: 1});
    });
  });

  it('control if a user is not saved yet in the system', () => {
    component.mail.setValue('pluto@gmail.com');
    service.recoveryPassword(component.mail.value).subscribe(data => {
      expect(data).toEqual({nModified: 0, ok: 0});
    });
  });

  it('control if a password of the user is changed', () => {
    let old_password: String = '';
    service.info('GRSLCU97L14E281J').subscribe(data => {
      old_password = data.password;
    });

    component.mail.setValue('lucagra97@gmail.com');
    service.recoveryPassword(component.mail.value).subscribe(data => {
      expect(data).toEqual({nModified: 1, ok: 1});
    });

    service.info('GRSLCU97L14E281J').subscribe(data => {
      expect(data.password).not.toEqual(old_password);
    });
  });
});
