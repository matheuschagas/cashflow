import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  month = 0;
  day = 0;

  constructor(private httpService: HttpService) {
    this.loadData();
  }

  async loadData(){
    const data = await this.httpService.get('transactions/dashboard', {});
    if (data) {
      this.day = data[0].day !== null ? data[0].day : 0;
      this.month = data[0].month !== null ? data[0].month : 0;
    }
  }

  ngOnInit() {
  }

}
