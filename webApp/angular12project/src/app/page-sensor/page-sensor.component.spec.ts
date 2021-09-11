import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSensorComponent } from './page-sensor.component';

describe('PageSensorComponent', () => {
  let component: PageSensorComponent;
  let fixture: ComponentFixture<PageSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSensorComponent ]
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
