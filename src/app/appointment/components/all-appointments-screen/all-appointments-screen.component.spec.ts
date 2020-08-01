import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAppointmentsScreenComponent } from './all-appointments-screen.component';

describe('AllAppointmentsScreenComponent', () => {
  let component: AllAppointmentsScreenComponent;
  let fixture: ComponentFixture<AllAppointmentsScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAppointmentsScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAppointmentsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
