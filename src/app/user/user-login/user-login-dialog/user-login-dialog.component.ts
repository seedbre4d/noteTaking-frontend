import { Component, OnInit, EventEmitter } from '@angular/core';
import { UserModel } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-user-login-dialog',
  templateUrl: './user-login-dialog.component.html',
  styleUrls: ['./user-login-dialog.component.css']
})
export class UserLoginDialogComponent implements OnInit {
  username: string;
  password: string;
  users: UserModel[];
  onLogin = new EventEmitter();

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  login() {
    this.userService.get().subscribe(res => {
      this.users = res;
      const user = this.users.find(
        u => u.username === this.username && u.password === this.password
      );
      if (user) {
        const id = user.id.toString();
        Cookie.set('id', id, undefined, '/');
        this.snackBar.open(`Success login! Go take a note!`, 'Ok', {
          duration: 5000
        });
        this.onLogin.emit();
        this.router.navigateByUrl('/note');
      } else {
        this.snackBar.open(`Incorrect credentials. Try again.`, 'Ok', {
          duration: 5000
        });
      }
    });
  }

  goRegister() {
    this.onLogin.emit();
    this.router.navigate(['/register']);
  }
  public ngOnInit(): void {
    throw new Error('Not implemented yet.');
  }
}
