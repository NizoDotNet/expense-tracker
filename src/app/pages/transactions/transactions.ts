import { Component, inject, input, OnInit, signal } from '@angular/core';
import {
  PagedResult,
  TransactionResponse,
  TransactionService,
} from '../../services/transaction-service';

@Component({
  selector: 'app-transactions',
  imports: [],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions implements OnInit {
  readonly transactionService = inject(TransactionService);
  page = signal<number>(1);
  pageSize = signal<number>(10);

  transactions = signal<PagedResult<TransactionResponse> | null>(null);
  ngOnInit(): void {
    this.transactionService.getAllTransactions(1, 10).subscribe({
      next: (value) => {
        this.transactions.set(value);
      },
    });
  }

  Abs(value: number) {
    return value >= 0 ? value : -value;
  }
}
