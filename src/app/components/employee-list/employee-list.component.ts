// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { EmployeeService } from '../../services/employee.service';
// import { Employee } from '../../interfaces/employee.interface';

// @Component({
//   selector: 'app-employee-list',
//   templateUrl: './employee-list.component.html'
// })
// export class EmployeeListComponent implements OnInit {
//   employees!: Employee[];

//   constructor(private employeeService: EmployeeService, private router: Router) { }

//   ngOnInit(): void {
//     this.employees = this.employeeService.getEmployees();
//   }

//   viewDetails(id: number): void {
//     this.router.navigate(['/employees', id]);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../interfaces/employee.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  private readonly destroy$ = new Subject<void>();
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().pipe(
      takeUntil(this.destroy$)
    ).subscribe(employees => {
      this.employees = employees;
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/employees', id]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
