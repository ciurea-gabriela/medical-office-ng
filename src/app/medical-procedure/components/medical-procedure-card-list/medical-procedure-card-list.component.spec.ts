import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalProcedureCardListComponent } from './medical-procedure-card-list.component';

describe('MedicalProcedureCardListComponent', () => {
  let component: MedicalProcedureCardListComponent;
  let fixture: ComponentFixture<MedicalProcedureCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalProcedureCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalProcedureCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
