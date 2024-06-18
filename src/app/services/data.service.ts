import { Injectable } from '@angular/core';
import { Manager, ManagerEntity } from '../interfaces/manager.interface';
import { Employee } from '../interfaces/employee.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private employees: Employee[] = [
    { id: 12345, firstName: 'John', lastName: 'Doe', position: 'Developer', managerId: 222, tasks: [], reports:[] },
    { id: 22222, firstName: 'Jane', lastName: 'Smith', position: 'Designer', managerId: 222, tasks: [], reports:[] },
    { id: 3333, firstName: 'Alice', lastName: 'Johnson', position: 'CEO', managerId :null, tasks:[], reports:[{reportId: 1341,reportText:"We need a fun room!", reportDate:new Date(), employeeId:12345}] },
    { id: 4444, firstName: 'Brandon', lastName: 'Mor', position: 'Senior Team Lead', managerId :111, tasks:[], reports:[{reportId: 1342,reportText:"We need more code reviews!", reportDate:new Date(), employeeId:22222}] }
  ];

  private managers: Manager[] = [
    { id: 111, employee:3333, subordinates:[4444] },
    { id: 222, employee:4444, subordinates:[12345,22222] }
  ];

  constructor() { }

  getManagers(): Observable<ManagerEntity[]> {
    const managers = this.managers.map<ManagerEntity>(manager => {
      const subordinates = manager.subordinates.map(subordinateId => this.employees.find(employee => employee.id === subordinateId))
      return {
        id: manager.id,
        employee: this.employees.find(employee => manager.employee === employee.id),
        subordinates
      };
    });
    return of(managers);
  }

  getEmployees(): Observable<Employee[]> {
    const employees = this.employees.map<Employee>(employee => {
      const manager = this.managers.find(manager => manager.id === employee.managerId);
      return {
        ...employee,
        manager,
      };
    });
    return of(employees);
  }
}