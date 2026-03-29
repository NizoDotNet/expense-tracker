import { Component, inject, input, OnInit, signal } from '@angular/core';
import {
  PagedResult,
  TransactionResponse,
  TransactionService,
} from '../../services/transaction-service';

import { Pagination } from '../../components/pagination/pagination';

@Component({
  selector: 'app-transactions',
  imports: [Pagination],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions implements OnInit {
  readonly transactionService = inject(TransactionService);
  page = signal<number>(1);
  pageSize = signal<number>(10);

  transactions = signal<PagedResult<TransactionResponse> | null>(null);
  ngOnInit(): void {
    this.getTransactions();
  }

  changePage(value: number) {
    this.page.set(value);
    this.getTransactions();
  }
  private getTransactions() {
    this.transactionService.getAllTransactions(this.page(), this.pageSize()).subscribe({
      next: (value) => {
        this.transactions.set(value);
      },
    });
  }

  Abs(value: number) {
    return value >= 0 ? value : -value;
  }
}
