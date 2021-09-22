import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeDialogComponent } from './notice-dialog.component';
import { RouterTestingModule } from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClientModule} from "@angular/common/http";

describe('NoticeDialogComponent', () => {
  let component: NoticeDialogComponent;
  let fixture: ComponentFixture<NoticeDialogComponent>;

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
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});
