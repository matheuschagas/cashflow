import { Component, OnInit } from '@angular/core';
import {PaymentType} from '../payment-type.enum';
import {HttpService} from '../http.service';
import {Transaction} from '../transaction';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {

  paymentType = PaymentType;
  paymentTypes = [];
  transaction = {
    amount: 0.0,
    description: '',
    paymentType: -1
  };

  constructor(private httpService: HttpService, private _router: Router) {
    this.loadPaymentTypes();
  }

  ngOnInit() {
  }

  async loadPaymentTypes() {
    const paymentTypes = await this.httpService.get('paymentTypes', {});
    if (paymentTypes) {
      for (const paymentType of paymentTypes){
        this.paymentTypes.push(paymentType);
      }
    }
  }

  resetTransaction(){
    this.transaction = {
      amount: 0.0,
      description: '',
      paymentType: -1
    };
  }

  async addTransaction() {
    if (this.transaction.paymentType === -1) {
      alert('you need to fill all the fields');
    } else {
      let create = await this.httpService.post('transactions', this.transaction);
      if (create && create.success) {
        this.resetTransaction();
        this._router.navigate(['/transaction-list']);
      } else {
        alert('The creation of transaction fails');
      }
    }
  }

}
