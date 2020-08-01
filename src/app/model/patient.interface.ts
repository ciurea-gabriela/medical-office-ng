import { Sex } from './enums/sex.enum';

export interface Patient {
    id?: number;
    firstName: string;
    lastName: string;
    birthDate?: Date;
    cnp: string;
    sex: Sex;
    city: string;
    phoneNumber: string;
}
