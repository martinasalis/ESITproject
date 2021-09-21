import { TestBed } from '@angular/core/testing';

import { SensorService } from './sensor.service';
import { HttpClientModule } from "@angular/common/http";

describe('SensorService', () => {
  let service: SensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(SensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
