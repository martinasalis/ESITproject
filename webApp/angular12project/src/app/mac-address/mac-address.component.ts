import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Type, User, UserService } from "../user.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { NoticeDialogComponent } from "../notice-dialog/notice-dialog.component";
import { BoardService, Board } from "../board.service";

@Component({
  selector: 'app-mac-address',
  templateUrl: './mac-address.component.html',
  styleUrls: ['./mac-address.component.css']
})
export class MACAddressComponent implements OnInit {

  user: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};
  mac = new FormControl('');

  constructor(private userService: UserService, private router: Router, public dialog: MatDialog,
              private boardService: BoardService) {
    if(JSON.parse(sessionStorage.getItem('login')!)) {
      this.user = JSON.parse(sessionStorage.getItem('user')!);
    }
    else {
      this.router.navigate(['']).then();
    }
  }

  ngOnInit(): void {
  }

  insert(): void {
    let newBoard: Board = {mac: this.mac.value, patient: "FRRMRC80M08E048O"};
    this.boardService.insert(newBoard).subscribe(data => {
      console.log(data);
    });
    this.router.navigate(['home']).then();
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(NoticeDialogComponent, {
      width: '250px',
      data: {flag: 5}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
