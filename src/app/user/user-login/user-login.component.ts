import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserLoginDialogComponent } from './user-login-dialog/user-login-dialog.component';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    if (Cookie.get('id')) {
      this.router.navigate(['/note']);
      return;
    }
    const dialogref = this.dialog.open(UserLoginDialogComponent, {
      height: '400px',
      width: '400px',
      disableClose: true
    });
    dialogref.componentInstance.onLogin.subscribe(res => {
      dialogref.close();
    });
  }

}
