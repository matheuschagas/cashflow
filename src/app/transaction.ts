import {PaymentType} from './payment-type.enum';

export class Transaction {
  id: number;
  description: string;
  amount: number;
  paymentType: PaymentType;
  transactionDate: Date;
}
