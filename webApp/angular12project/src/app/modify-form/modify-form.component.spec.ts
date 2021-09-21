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
});
