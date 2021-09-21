import { TestBed } from '@angular/core/testing';

import { PatientService } from './patient.service';
import { HttpClientModule } from "@angular/common/http";

describe('PatientService', () => {
  let service: PatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(PatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
