import { Pipe, PipeTransform } from '@angular/core';
import {PaymentType} from './payment-type.enum';

@Pipe({
  name: 'paymentType'
})
export class PaymentTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let payment = null;
    if (parseInt(value) === PaymentType.creditCard){
      payment = 'Credit Card';
    }else if(parseInt(value) === PaymentType.money){
      payment = 'Money';
    }
    return payment;
  }

}
