// types/index.ts

export interface Tutor {
  MSCB: string; 
  HoVaTen: string; 
  Email: string;
}

export interface Major {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  name: string;
}

export interface RegistrationData {
  courses: number[];
  skillImprovement: string;
  supportNeeds: string;
}