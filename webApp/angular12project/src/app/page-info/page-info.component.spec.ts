import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInfoComponent } from './page-info.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";

describe('PageInfoComponent', () => {
  let component: PageInfoComponent;
  let fixture: ComponentFixture<PageInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageInfoComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatDialogModule,
        FormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
