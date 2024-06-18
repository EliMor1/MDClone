

import { Component, Input, Output, EventEmitter, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-popup',
  templateUrl: './report-popup.component.html',
  styleUrl: './report-popup.component.css'
})
export class ReportPopupComponent {
  @Input() managerId!: number;
  @Input() employeeId!: number;
  @Output() reportSubmitted = new EventEmitter<void>();
  fb = inject(FormBuilder);
  form = this.fb.group({
    reportText: ['', [Validators.required, Validators.minLength(10)]]
  })

  constructor(public dialogRef: MatDialogRef<ReportPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  submitReport(): void {
    const values = this.form.value;
    if(!values.reportText){
      return
    }
    this.dialogRef.close({
      reportText: values.reportText,
      reportDate: new Date()
    });
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}
