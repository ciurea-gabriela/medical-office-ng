import {Sex} from './enums/sex.enum';

export interface Doctor {
  id?: number;
  name: string;
  cnp: string;
  sex: Sex;
  specialization: string;
  phoneNumber: string;
  medicalProcedureId?: number;
  medicalProcedures?: Array<string>;
}
