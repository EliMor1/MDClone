import { Component, Input, Output, EventEmitter, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-popup',
  templateUrl: './task-popup.component.html',
  styleUrl: './task-popup.component.css'
})
export class TaskPopupComponent {
  @Input() employeeId!: number;
  @Output() taskAssigned = new EventEmitter<void>();
  private fb = inject(FormBuilder);
  form = this.fb.group({
    taskText : ['',[Validators.required, Validators.minLength(10)]],
    dueDate : ['', [Validators.required]]
  });


  constructor(public dialogRef: MatDialogRef<TaskPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  assignTask(): void {
    const values = this.form.value;
    if(!values.dueDate){
      return
    }
    this.dialogRef.close({
      taskText: values.taskText,
      assignDate: new Date(),
      dueDate: new Date(values.dueDate)
    });
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}
