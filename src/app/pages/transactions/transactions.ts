import { Component, inject, input, OnInit, signal } from '@angular/core';
import {
  CreateTransactionRequest,
  PagedResult,
  TransactionCategoryResponse,
  TransactionResponse,
  TransactionService,
} from '../../services/transaction-service';
import { AddTransaction } from '../../components/modals/add-transaction/add-transaction';
import { Pagination } from '../../components/pagination/pagination';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-transactions',
  imports: [Pagination, AddTransaction, DatePipe],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions implements OnInit {
  readonly transactionService = inject(TransactionService);
  page = signal<number>(1);
  pageSize = signal<number>(10);

  isModalOpen = signal<boolean>(false);
  categories: TransactionCategoryResponse[] = [
    {
      id: 1,
      name: 'cart',
    },
  ];

  saveTransaction(createTransaction: CreateTransactionRequest) {
    this.transactionService.createTransaction(createTransaction).subscribe((c) => {
      alert();
    });
  }
  closeModal() {
    this.isModalOpen.set(false);
  }
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
