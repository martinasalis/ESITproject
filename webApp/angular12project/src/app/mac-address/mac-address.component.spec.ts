import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MACAddressComponent } from './mac-address.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from "@angular/material/dialog";

describe('MACAddressComponent', () => {
  let component: MACAddressComponent;
  let fixture: ComponentFixture<MACAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MACAddressComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatDialogModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MACAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
