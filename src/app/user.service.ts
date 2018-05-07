import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private static logged = false;
  private static token = '';
  private static permissions = '';

  constructor() { }

  getToken() {
    return UserService.token;
  }

  isLogged() {
    return UserService.logged;
  }

  getPermissions(){
    return UserService.permissions;
  }

  login(token, permissions) {
    UserService.token = token;
    UserService.permissions = permissions;
    UserService.logged = true;
  }

  logoff() {
    UserService.token = '';
    UserService.permissions = '';
    UserService.logged = false;
  }

}
