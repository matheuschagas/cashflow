import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() page: string;

  constructor(private _router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  navigate(to){
    this._router.navigate([to]);
  }

  logoff() {
    this.userService.logoff();
    this._router.navigate(['/']);
  }

}
