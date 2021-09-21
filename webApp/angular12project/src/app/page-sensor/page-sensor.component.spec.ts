import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSensorComponent } from './page-sensor.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from "@angular/material/dialog";

describe('PageSensorComponent', () => {
  let component: PageSensorComponent;
  let fixture: ComponentFixture<PageSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSensorComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatDialogModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
