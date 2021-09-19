import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";

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

  mail = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router, public dialogRef: MatDialogRef<NoticeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Result) {
  }

  onNoClick(): void {
    if(this.data.flag == 10){
      this.dialogRef.close();
      this.router.navigate(['login']).then();
    }
    else {
      this.dialogRef.close();
      this.router.navigate(['home']).then();
    }
  }

  recovery(): void{

  }

  getErrorMessage() {
    if (this.mail.hasError('required')) {
      return 'Devi inserire la mail';
    }

    return this.mail.hasError('email') ? 'E-mail non valida' : '';
  }

}
