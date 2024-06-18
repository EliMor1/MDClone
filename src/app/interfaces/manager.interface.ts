import { Employee, Task } from './employee.interface';
export interface Manager {
  id: number;
  employee:number;
  subordinates: number[];
}

export interface ManagerEntity {
  id: number;
  employee?:Employee;
  subordinates: (Employee | undefined)[];
}

export interface Report {
  reportId: number;
  reportText: string;
  reportDate: Date;
  employeeId: number;
}
