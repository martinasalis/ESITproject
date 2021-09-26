import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { UserService } from "../user.service";

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
              @Inject(MAT_DIALOG_DATA) public data: Result, private userService: UserService, private dialog: MatDialog) {
  }

  onNoClick(): void {
    if(this.data.flag == 10 || this.data.flag == 11){
      this.dialogRef.close();
      this.router.navigate(['login']);
    }
    else {
      console.log('close');
      this.dialogRef.close();
      this.router.navigate(['home']);
    }
  }

  recovery(): void{
    this.userService.recoveryPassword(this.mail.value).subscribe(data => {
      if(data.nModified == 0) {
        const dialogRef = this.dialog.open(NoticeDialogComponent, {
          width: '250px',
          data: {flag: 11}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
      else {
        console.log(data);
        this.dialogRef.close();
      }
    });
  }

  getErrorMessage() {
    if (this.mail.hasError('required')) {
      return 'Devi inserire la mail';
    }

    return this.mail.hasError('email') ? 'E-mail non valida' : '';
  }

}
