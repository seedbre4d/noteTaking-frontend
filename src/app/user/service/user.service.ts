import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserModel } from '../model/user.model';
import { ApiService } from '../../service/api.service';

@Injectable()
export class UserService extends ApiService<UserModel>  {

  constructor(http: Http) {
    super(http);
    this.path = 'user';
 }

}
