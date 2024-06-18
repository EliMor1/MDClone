import { Injectable, inject } from '@angular/core';
import { Employee, Task } from '../interfaces/employee.interface';
import { DataService } from './data.service';
import { Report } from '../interfaces/manager.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  dataService = inject(DataService);

  constructor() { }

  getEmployees(): Observable<Employee[]> {
    return this.dataService.getEmployees();
  }

  getEmployeeById(id: number): Observable<Employee | null> {
    return this.getEmployees().pipe(
      map(employees => employees.find(emp => emp.id === id) || null)
    );
  }

  addReport(managerId: number, report: Report): void {
    this.getEmployeeById(managerId).subscribe(manager => {
      if (manager) {
        manager.reports.push(report);
      }
    });
  }
}