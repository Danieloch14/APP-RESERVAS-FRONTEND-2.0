import { PersonalData } from "./PersonalData";

export interface User {
  idUser: number
  codDatosPersonales: PersonalData
  username: string
  dateEntry: string
  dateLastLogin: string
  active: boolean
  notLocked: boolean
}


