import { Component, OnInit } from '@angular/core';
import {Transaction} from '../transaction';
import {PaymentType} from '../payment-type.enum';
import {HttpService} from '../http.service';
import {UserService} from "../user.service";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[] = [];
  paymentTypes = [];
  transaction = {
    id: -1,
    amount: 0.0,
    description: '',
    paymentType: -1,
    transactionDate: new Date()
  };
  manager = false;

  constructor(private httpService: HttpService, private userService: UserService) {
    this.loadPaymentTypes();
    this.isManager();
  }

  async loadPaymentTypes() {
    const paymentTypes = await this.httpService.get('paymentTypes', {});
    if (paymentTypes) {
      for (const paymentType of paymentTypes){
        this.paymentTypes.push(paymentType);
      }
    }
  }

  isManager() {
    if(parseInt(this.userService.getPermissions().charAt(1)) >= 4) {
      this.manager = true;
    }
  }

  async loadTransactions() {
    let transactions = await this.httpService.get('transactions', {});
    if (transactions){
      for (const transaction of transactions){
        this.transactions.push(transaction);
      }
    }
  }

  async delete(transaction) {
    let r = confirm('Are you sure?');
    if(r) {
      const result = await this.httpService.delete('transactions', {id: transaction.id});
      if (result && result.success) {
        for (let i = 0; i < this.transactions.length; i++) {
          if (this.transactions[i] === transaction) {
            this.transactions.splice(i, 1);
            break;
          }
        }
      } else {
        alert('Delete operation failed');
      }
    }
  }

   edit(transaction) {
    this.transaction = transaction;
     (<any>window).$('#myModal').modal('show');
  }

  async updateTransaction() {
    const result = await this.httpService.patch('transactions', this.transaction);
    if (result && result.success) {
      for (let i = 0; i < this.transactions.length; i++) {
        if (this.transactions[i].id === this.transaction.id) {
          this.transactions[i] = this.transaction;
          console.log(this.transaction);
          (<any>window).$('#myModal').modal('hide');
          break;
        }
      }
    }
  }

  ngOnInit() {
    this.loadTransactions();
  }

}
