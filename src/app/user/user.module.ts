import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { MatDialogModule, MatCardModule, MatGridListModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatChipsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { UserLoginDialogComponent } from './user-login/user-login-dialog/user-login-dialog.component';
import { UserService } from './service/user.service';
import { FormsModule } from '@angular/forms';
import { UserRegisterDialogComponent } from './user-register/user-register-dialog/user-register-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [UserService],
  entryComponents: [UserLoginDialogComponent, UserRegisterDialogComponent],
  declarations: [UserLoginComponent, UserRegisterComponent, UserEditComponent, UserLoginDialogComponent, UserRegisterDialogComponent]
})
export class UserModule { }
