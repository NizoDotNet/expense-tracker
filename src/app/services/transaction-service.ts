import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

export enum TimePeriod {
  day = 0,
  month = 1,
}

export interface CreateTransactionRequest {
  name: string;
  desciprtion?: string | null;
  amount: number;
  transactionCategoryId: number;
}

export interface TransactionCategoryResponse {
  id: number;
  name: string;
}

export interface TransactionResponse {
  id: string;
  name: string;
  description: string;
  dateTime: string;
  amount: number;
  category: TransactionCategoryResponse;
}
export interface TransactionExpenseByCategoryResponse {
  category: string;
  amount: number;
}

export interface TransactionIncomeExpenseResponse {
  labels: string[];
  income: {
    amount: number;
  };
  expense: {
    amount: number;
  };
}

export interface PagedResult<T> {
  page: number;
  pageSize: number;
  total: number;
  values: T[];
}
export interface UserBalanceCalculatedStats {
  balance: number;
  balanceChange: number;
  income: number;
  expense: number;
  savingRate: number;
}
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private categories = signal<TransactionCategoryResponse[] | null>([]);
  private balanceStats = signal<UserBalanceCalculatedStats | null>(null);

  readonly http = inject(HttpClient);
  readonly baseUrl = '/api/transactions';

  getAllTransactions(page: number, pageNumber: number) {
    return this.http.get<PagedResult<TransactionResponse>>(`${this.baseUrl}`, {
      withCredentials: true,
      params: {
        page,
        pageNumber,
      },
    });
  }

  getByCategory(timePeriod: TimePeriod, date: string) {
    return this.http.get<TransactionExpenseByCategoryResponse[]>(`${this.baseUrl}/by-category`, {
      withCredentials: true,
      params: {
        timePeriod,
        date,
      },
    });
  }

  getIncomeExpense(timePeriod: TimePeriod, dateTime: string) {
    return this.http.get<TransactionIncomeExpenseResponse>(`${this.baseUrl}/income-expense`, {
      withCredentials: true,
      params: {
        timePeriod,
        dateTime,
      },
    });
  }

  getCategories() {
    if (this.categories() === null) {
      this.http
        .get<TransactionCategoryResponse[]>(`${this.baseUrl}/categories`, {
          withCredentials: true,
        })
        .subscribe({
          next: (value) => {
            this.categories.set(value);
          },
        });
    }
    return this.categories();
  }

  getUserBalanceStats() {
    return this.http
      .get<UserBalanceCalculatedStats>(`${this.baseUrl}/calculated-balance`, {
        withCredentials: true,
      })
      .pipe(
        tap((c) => {
          this.balanceStats.set(c);
        }),
      );
  }

  createTransaction(createTransactionRequest: CreateTransactionRequest) {
    return this.http
      .post(`${this.baseUrl}`, createTransactionRequest, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.balanceStats.update(
            (c) =>
              ({
                ...c,
                balance: c!.balance + createTransactionRequest.amount,
              }) as UserBalanceCalculatedStats,
          );
        }),
      );
  }

  deleteTransaction(transactionId: string) {
    return this.http.delete(`${this.baseUrl}/${transactionId}`, {
      withCredentials: true,
    });
  }
}
