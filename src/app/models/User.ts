import { PersonalData } from "./PersonalData";

export class User{
    idUser !: number;
	codDatosPersonales !: PersonalData;
    password !: string;
	dateEntry !: Date;
	dateLastLogin !: Date;
	isActive !: boolean;
	isNotLocked !: boolean;
}