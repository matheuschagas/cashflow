import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {UserService} from "./user.service";

@Injectable()
export class HttpService {

  apiUrl: string = 'https://cashflowapi.herokuapp.com/';

  constructor(private http: Http, private userService: UserService) { }

  private createUrl(url, params) {
    let first = true;
    url = this.apiUrl + url;
    if (this.userService.isLogged()) {
      url += '?token=' + this.userService.getToken();
      first = false;
    }
    for (let key in params) {
      if (first) {
        url += '?' + key + '=' + params[key];
        first = false;
      }else {
        url += '&' + key + '=' + params[key];
      }
    }
    return url;
  }

  get(url, params) {
    return new Promise<any>((resolve) => {
      url = this.createUrl(url, params);
      console.log(url);
      this.http.get(url).toPromise().then((result) => {
        resolve(result.json());
      }).catch((error) => {
        resolve(false);
      });
    });
  }

  post(url, params) {
    return new Promise<any>((resolve) => {
      url = this.createUrl(url, {});
      console.log(url);
      this.http.post(url, params).toPromise().then((result) => {
        resolve(result.json());
      }).catch((error) => {
        resolve(false);
      });
    });
  }

  delete(url, params) {
    return new Promise<any>((resolve) => {
      url = this.createUrl(url, params);
      console.log(url);
      this.http.delete(url).toPromise().then((result) => {
        resolve(result.json());
      }).catch((error) => {
        resolve(false);
      });
    });
  }

  patch(url, params) {
    return new Promise<any>((resolve) => {
      url = this.createUrl(url, {});
      console.log(url);
      this.http.patch(url, params).toPromise().then((result) => {
        resolve(result.json());
      }).catch((error) => {
        resolve(false);
      });
    });
  }

}
