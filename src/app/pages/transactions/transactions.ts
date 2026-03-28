import { Component, input } from '@angular/core';
import { PagedResult, TransactionResponse } from '../../services/transaction-service';

@Component({
  selector: 'app-transactions',
  imports: [],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions {
  transactions = input<PagedResult<TransactionResponse>>();

  Abs(value: number) {
    return value >= 0 ? value : -value;
  }
}
