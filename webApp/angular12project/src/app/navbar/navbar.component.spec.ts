import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from "@angular/router/testing";
import { MatMenuModule } from "@angular/material/menu";
import { Type, UserService } from "../user.service";
import { Router } from "@angular/router";
import { MockUserService } from "../../mocks/user.service.mock";


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [
        RouterTestingModule,
        MatMenuModule
      ],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy("navigate");
          }
        },
        { provide: UserService, useClass: MockUserService },
        MockUserService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // Define session variables
    spyOn(sessionStorage, 'getItem')
      .withArgs('login').and.returnValue(JSON.stringify(true))
      .withArgs('user').and.returnValue(JSON.stringify({_id: 'GRSLCU97L14E281J', name: 'Luca',
      surname: 'Grassi', username: 'luca', password: '12345', dob: new Date('1997-07-14'),
      phone: '3333415523', mail: 'lucagra97@gmail.com', type: Type.DOCTOR}));

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear the session', () => {
    spyOn(component, 'logout').and.callThrough();
    spyOn(sessionStorage, 'clear').and.callThrough();

    component.logout();
    expect(component.logout).toHaveBeenCalled();
    expect(sessionStorage.clear).toHaveBeenCalled();
  });
});
