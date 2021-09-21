import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormComponent } from './add-form.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoticeDialogComponent } from "../notice-dialog/notice-dialog.component";

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
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('control invalid form', () => {
    component.username.setValue('');
    expect(component.username.valid).toBeFalsy();
  });
});
