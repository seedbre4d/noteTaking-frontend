import { Component, OnInit } from '@angular/core';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
   }

  user: UserModel = new UserModel();
  passwordConf: string;
  newPassword: string;

  getUser() {
    this.userService.get().subscribe(res => {
      for (const r of res) {
        if (r.id === +Cookie.get('id')) {
          this.user = r;
          break;
        }
      }
    });
  }
  save() {
    if (this.newPassword) {
      this.user.password = this.newPassword;
    }
    this.userService.put(this.user.id, this.user).subscribe(res => {
      this.snackBar.open(`User saved successfuly!`, 'Ok', {
        duration: 5000
      });
      this.passwordConf = null;
      this.newPassword = null;
    });
  }

  delete() {
    this.userService.delete(this.user.id).subscribe(res => {
      this.snackBar.open(`User deleted successfuly!`, 'Ok', {
        duration: 5000
      });
    });
    Cookie.deleteAll('/');
    this.router.navigateByUrl('/');

  }
  ngOnInit() {
    this.getUser();
  }

}
