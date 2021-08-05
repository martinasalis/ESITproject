import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface Result {
  res: number,
  flag: number
}

@Component({
  selector: 'app-notice-dialog',
  templateUrl: './notice-dialog.component.html',
  styleUrls: ['./notice-dialog.component.css']
})
export class NoticeDialogComponent {

  constructor(public dialogRef: MatDialogRef<NoticeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Result) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
