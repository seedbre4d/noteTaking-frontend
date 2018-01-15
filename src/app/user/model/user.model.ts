export class UserModel {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  id: number;

  constructor() {
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.username = '';
    this.password = '';
  }
}
