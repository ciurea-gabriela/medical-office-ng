import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalProcedureCardComponent } from './medical-procedure-card.component';

describe('MedicalProcedureListComponent', () => {
  let component: MedicalProcedureCardComponent;
  let fixture: ComponentFixture<MedicalProcedureCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalProcedureCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalProcedureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
