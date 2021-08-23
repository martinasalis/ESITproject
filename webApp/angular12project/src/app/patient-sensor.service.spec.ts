import { TestBed } from '@angular/core/testing';

import { PatientSensorService } from './patient-sensor.service';

describe('PatientSensorService', () => {
  let service: PatientSensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientSensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
