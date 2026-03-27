import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export enum TimePeriod {
  day = 0,
  month = 1,
}
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  readonly http = inject(HttpClient);
  readonly baseUrl = '/api/transactions';

  getAllTransactions(page: number, pageNumber: number) {
    return this.http.get(`${this.baseUrl}`, {
      withCredentials: true,
      params: {
        page,
        pageNumber,
      },
    });
  }

  deleteTransaction(transactionId: string) {
    return this.http.delete(`${this.baseUrl}/${transactionId}`. {
      withCredentials: true
    });
  }

  getByCategory(timePeriod: TimePeriod, date: string) {
    return this.http.get(`${this.baseUrl}/by-category`, {
      withCredentials: true,
      params: {
        timePeriod,
        date,
      },
    });
  }

  getIncomeExpense(timePeriod: TimePeriod, dateTime: string) {
    return this.http.get(`${this.baseUrl}/income-expense`, {
      withCredentials: true,
      params: {
        timePeriod,
        dateTime,
      },
    });
  }
}
