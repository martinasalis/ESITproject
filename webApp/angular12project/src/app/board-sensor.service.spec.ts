import { TestBed } from '@angular/core/testing';

import { BoardSensorService } from './board-sensor.service';

describe('PatientSensorService', () => {
  let service: BoardSensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardSensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
