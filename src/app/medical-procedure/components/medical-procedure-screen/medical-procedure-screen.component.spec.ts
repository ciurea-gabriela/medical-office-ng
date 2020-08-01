import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalProcedureScreenComponent } from './medical-procedure-screen.component';

describe('MedicalProcedureScreenComponent', () => {
  let component: MedicalProcedureScreenComponent;
  let fixture: ComponentFixture<MedicalProcedureScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalProcedureScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalProcedureScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
