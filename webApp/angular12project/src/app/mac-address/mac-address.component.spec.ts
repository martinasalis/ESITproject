import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MACAddressComponent } from './mac-address.component';

describe('MACAddressComponent', () => {
  let component: MACAddressComponent;
  let fixture: ComponentFixture<MACAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MACAddressComponent ]
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
