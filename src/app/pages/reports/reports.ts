import { Component, inject, OnInit, signal } from '@angular/core';
import {
  TimePeriod,
  TransactionExpenseByCategoryResponse,
  TransactionIncomeExpenseResponse,
  TransactionResponse,
  TransactionService,
} from '../../services/transaction-service';
import { FinancialOverview } from './components/financial-overview/financial-overview';

@Component({
  selector: 'app-reports',
  imports: [FinancialOverview],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit {
  transactionService = inject(TransactionService);
  incomeExpense = signal<TransactionIncomeExpenseResponse | null>(null);
  byCategory = signal<TransactionExpenseByCategoryResponse[] | null>(null);
  timePeriod = signal<TimePeriod>(TimePeriod.month);
  transactions = signal<TransactionResponse[]>([]);
  date = signal<string>(new Date().toUTCString());

  ngOnInit(): void {
    this.getIncomeExpense();
    this.getExpensesByCategory();
  }

  private getExpensesByCategory() {
    this.transactionService.getByCategory(this.timePeriod(), this.date()).subscribe({
      next: (value) => {
        this.byCategory.set(value);
      },
    });
  }

  private getIncomeExpense() {
    this.transactionService.getIncomeExpense(this.timePeriod(), this.date()).subscribe({
      next: (value) => {
        this.incomeExpense.set(value);
      },
    });
  }
}
