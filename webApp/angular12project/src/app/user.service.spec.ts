import { TestBed } from '@angular/core/testing';

import {Type, User, UserService} from './user.service';
import { HttpClientModule } from "@angular/common/http";
import * as moment from "moment";

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should verified correct login', (done) => {
    service.login('martina', '6789').subscribe((data: User) => {

      expect({_id: data._id, name: data.name, surname: data.surname, username: data.username,
        password: data.password, phone: data.phone, mail: data.mail, type: data.type}).toEqual({
        _id: 'SLSMTN96D60B354H', name: 'Martina', surname: 'Salis', username: 'martina', password: '6789',
        phone: '3331203042', mail: 'marti.salis20@gmail.com', type: Type.DOCTOR});

      done();
    });
  });


});
