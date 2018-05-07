import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class AuthService implements CanActivate {

  constructor(private userService: UserService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise<boolean>((resolve) => {
      if (!this.userService.isLogged()) {
        this._router.navigate(['']);
      }
      resolve(this.userService.isLogged());
    });
  }
}
