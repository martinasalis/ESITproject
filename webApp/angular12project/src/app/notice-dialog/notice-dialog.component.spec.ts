import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeDialogComponent } from './notice-dialog.component';
import { RouterTestingModule } from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('NoticeDialogComponent', () => {
  let component: NoticeDialogComponent;
  let fixture: ComponentFixture<NoticeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeDialogComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        MatDialogModule
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
});
