import { TestBed } from '@angular/core/testing';

import { MedicalProcedureService } from './medical-procedure.service';

describe('MedicalProcedureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicalProcedureService = TestBed.get(MedicalProcedureService);
    expect(service).toBeTruthy();
  });
});
