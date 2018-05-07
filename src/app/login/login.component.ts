import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {UserService} from '../user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  constructor(private httpService: HttpService, private userService: UserService, private _router: Router) { }

  ngOnInit() {
  }

  async login() {
    let response = await this.httpService.get('users/auth', {username: this.username, password: this.password});
    if(response) {
      console.log(response);
      this.userService.login(response.token, response.permissions);
      this._router.navigate(['home']);
    }else{
      alert('User or password invalid!');
    }
  }
}
