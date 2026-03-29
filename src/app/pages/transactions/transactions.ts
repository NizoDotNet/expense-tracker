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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transactions',
  imports: [Pagination, AddTransaction, DatePipe],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions implements OnInit {
  readonly transactionService = inject(TransactionService);
  readonly toastService = inject(ToastrService);

  transactions = signal<PagedResult<TransactionResponse> | null>(null);

  page = signal<number>(1);
  pageSize = signal<number>(10);

  isModalOpen = signal<boolean>(false);
  categories: TransactionCategoryResponse[] = [
    {
      name: 'Food',
      id: 1,
    },
    {
      name: 'Joy',
      id: 2,
    },
    {
      name: 'Electronics',
      id: 3,
    },
    {
      name: 'For Home',
      id: 4,
    },
    {
      name: 'Transport',
      id: 5,
    },
    {
      name: 'Salary',
      id: 6,
    },
    {
      name: 'Other',
      id: 7,
    },
  ];

  saveTransaction(createTransaction: CreateTransactionRequest) {
    this.transactionService.createTransaction(createTransaction).subscribe({
      next: () => {
        this.closeModal();
        this.transactions.update((tr) => {
          if (!tr) return tr;
          this.toastService.success('Transaction added');

          return {
            page: tr.page,
            pageSize: tr.pageSize,
            total: tr.total,
            values: [
              {
                id: c as string,
                name: createTransaction.name,
                dateTime: createTransaction.dateTime,
                description: createTransaction.description ?? '',
                amount: createTransaction.amount,
                category: {
                  id: createTransaction.transactionCategoryId,
                  name: this.categories[createTransaction.transactionCategoryId - 1].name,
                },
              },
              ...tr.values,
            ],
          };
        });
      },
      error: () => {
        this.toastService.error('Error occured');
      },
    });
  }

  deleteTransaction(id: string) {
    this.transactionService.deleteTransaction(id).subscribe({
      next: () => {
        this.transactions.update((tr) => {
          if (!tr) return tr;

          const deletedTransaction = tr.values.find((c) => c.id === id);
          if (!deletedTransaction) return tr;
          const deletedTransactionId = tr.values.indexOf(deletedTransaction);
          if (deletedTransactionId === -1) {
            return tr;
          }

          this.toastService.warning('Transaction was deleted');

          tr.values.splice(deletedTransactionId, 1);
          return {
            page: tr.page,
            pageSize: tr.pageSize,
            total: tr.total,
            values: tr.values,
          };
        });
      },
      error: () => {
        this.toastService.error('Error occured');
      },
    });
  }
  closeModal() {
    this.isModalOpen.set(false);
  }
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
