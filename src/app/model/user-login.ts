export class UserLogin {
  userName: string;
  password: string;

  constructor(userName: string = '', password: string = '') {
    this.userName = userName;
    this.password = password;
  }
}
