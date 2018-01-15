import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserRegisterDialogComponent } from './user-register-dialog/user-register-dialog.component';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    if (Cookie.get('id')) {
      this.router.navigate(['/note']);
      return;
    }
    const dialogref = this.dialog.open(UserRegisterDialogComponent, {
      height: '60%',
      width: '40%',
      disableClose: true
    });
    dialogref.componentInstance.onRegister.subscribe(res => {
      dialogref.close();
    });
  }
}
