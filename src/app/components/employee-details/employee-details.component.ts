import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { ManagerService } from '../../services/manager.service';
import { Employee } from '../../interfaces/employee.interface';
import { ManagerEntity } from '../../interfaces/manager.interface';
import { MatDialog } from '@angular/material/dialog';
import { ReportPopupComponent } from '../report-popup/report-popup.component';
import { TaskPopupComponent } from '../task-popup/task-popup.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  employee!: Employee | null;
  directManager!: ManagerEntity | null;
  manager!: ManagerEntity | null;
  isManager = false;
  managerData = {};

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private managerService: ManagerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployeeById(Number(id)).pipe(takeUntil(this.destroy$)).subscribe(employee => {
      this.employee = employee;
      if (employee) {
        this.managerService.getManagers().pipe(takeUntil(this.destroy$)).subscribe(managers => {
          const foundManager = managers.find(manager => manager.employee?.id === employee.id);
          if (foundManager) {
            this.manager = foundManager;
            this.isManager = true;
          }
          if (employee.managerId) {
            this.managerService.getManagerById(employee.managerId).pipe(takeUntil(this.destroy$)).subscribe(manager => {
              this.directManager = manager;
              if (manager) {
                this.managerData = {
                  firstName: manager.employee?.firstName,
                  lastName: manager.employee?.lastName
                };
              }
            });
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openReportPopup(id: number): void {
    if (id) {
      this.managerService.getManagerById(id).pipe(takeUntil(this.destroy$)).subscribe(foundManager => {
        const managerId = foundManager?.employee?.id;
        const dialogRef = this.dialog.open(ReportPopupComponent, {
          width: '600px',
          data: { managerId: managerId }
        });

        dialogRef.afterClosed()
          .pipe(takeUntil(this.destroy$))
          .subscribe(result => {
            if (result && managerId) {
              this.employeeService.addReport(managerId, result);
            }
          });
      });
    }
  }

  openTaskPopup(subordinateId: number | undefined): void {
    if (subordinateId) {
      const dialogRef = this.dialog.open(TaskPopupComponent, {
        width: '600px',
        data: { subordinateId: subordinateId }
      });

      dialogRef.afterClosed()
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          if (result && subordinateId) {
            this.managerService.addTask(subordinateId, result);
          }
        });
    }
  }
}


