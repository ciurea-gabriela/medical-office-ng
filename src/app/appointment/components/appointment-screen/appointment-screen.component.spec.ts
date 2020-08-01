import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentScreenComponent } from './appointment-screen.component';

describe('AppointmentScreenComponent', () => {
  let component: AppointmentScreenComponent;
  let fixture: ComponentFixture<AppointmentScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
