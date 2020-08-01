import {Status} from './enums/status.enum';

export interface Appointment {
  id?: number;
  status: Status;
  startTime: Date;
  endTime: Date;
  description: string;
  patientId?: string;
  patientName?: string;
  doctorId?: string;
  doctorName?: string;
  medicalProcedureId?: string;
  medicalProcedureName?: string;
}
