import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { UserModel } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { MatSnackBar } from '@angular/material';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-user-register-dialog',
  templateUrl: './user-register-dialog.component.html',
  styleUrls: ['./user-register-dialog.component.css']
})
export class UserRegisterDialogComponent implements OnInit {

  newUser: UserModel = new UserModel();
  passwordConf: string;
  onRegister = new EventEmitter();
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }


  register() {
    this.userService.post(this.newUser).subscribe(res => {
      this.onRegister.emit();
      this.goLogin();
      this.snackBar.open(`Success! Now you can login!`, 'Ok', {
        duration: 5000
      });
    });
  }
  goLogin() {
    this.onRegister.emit();
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    if (Cookie.get('id')) {
      this.router.navigate(['/note']);
    }
  }

}
