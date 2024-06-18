import { Injectable, inject } from '@angular/core';
import { Manager, ManagerEntity, Report } from '../interfaces/manager.interface';
import { DataService } from './data.service';
import { Task } from '../interfaces/employee.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  dataService = inject(DataService);

  constructor() {}

  getManagers(): Observable<ManagerEntity[]> {
    return this.dataService.getManagers();
  }

  getManagerById(id: number): Observable<ManagerEntity | null> {
    return this.getManagers().pipe(
      map(managers => managers.find(mgr => mgr.id === id) || null)
    );
  }

  addTask(employeeId: number, task: Task): void {
    this.dataService.getEmployees().subscribe(employees => {
      const employee = employees.find(emp => emp.id === employeeId);
      if (employee) {
        employee.tasks.push(task);
      }
    });
  }
}