import {TestBed} from '@angular/core/testing';

import {Doctor, DoctorService, Notice} from './doctor.service';
import {HttpClientModule} from "@angular/common/http";

describe('DoctorService', () => {
  let service: DoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(DoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*
  it('should verified update notice', (done)=> {
    service.updateNotice('SLSMTN96D60B354H', Notice.SMS).subscribe((data: Doctor) => {
      service.info(data._id).subscribe((doc: Doctor) => {
        expect(Notice.SMS).toEqual(doc.notice);
        done();
      });
    });
  });

  it('should verified update doctor', (done)=> {
    service.update('SLSMTN96D60B354H', {_id: 'SLSMTN96D60B354H', role: 'Ortopedico', notice: Notice.SMS}).subscribe((data: Doctor) => {
      service.info(data._id).subscribe((data: Doctor) => {
        let doctor: Doctor = {_id: 'SLSMTN96D60B354H', role: 'Ortopedico', notice: Notice.SMS};
        expect(doctor).toEqual({_id: data._id, role: data.role, notice: data.notice});
      });
      done();
    });
  });



  it('should verified insert doctor', (done)=> {
    service.insert({_id: 'SLSMTN96D60B354H', role: 'Ortopedico', notice: Notice.SMS}).subscribe((data: Doctor) => {
      service.info(data._id).subscribe((data: Doctor) => {
        expect({_id: data._id, role: data.role, notice: data.notice}).toEqual({_id: 'SLSMTN96D60B354H', role: 'Ortopedico', notice: Notice.SMS});
      });
      done();
    });
  });

  it('should verified delete doctor', (done)=> {
    service.delete('SLSMTN96D60B354H').subscribe((data: Doctor) => {
      service.info(data._id).subscribe((data: Doctor) => {
        expect(data).toEqual(null as any);
      });
      done();
    });
  });

   */
});
