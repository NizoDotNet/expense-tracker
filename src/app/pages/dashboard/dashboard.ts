import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Card, Cards } from './components/cards/cards';
import { SpendingOverview } from './components/spending-overview/spending-overview';
import {
  TimePeriod,
  TransactionExpenseByCategoryResponse,
  TransactionIncomeExpenseResponse,
  TransactionService,
  UserBalanceCalculatedStats,
} from '../../services/transaction-service';
@Component({
  selector: 'app-dashboard',
  imports: [Cards, SpendingOverview],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  readonly transactionService = inject(TransactionService);
  cards = signal<Card[]>([]);
  incomeExpense = signal<TransactionIncomeExpenseResponse | null>(null);
  byCategory = signal<TransactionExpenseByCategoryResponse[] | null>(null);
  timePeriod = signal<TimePeriod>(TimePeriod.month);
  date = signal<string>(new Date().toUTCString());

  ngOnInit(): void {
    this.getBalanceStats();
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

  private getBalanceStats() {
    this.transactionService.getUserBalanceStats().subscribe({
      next: (userBalance) => {
        console.log(userBalance);
        this.cards.set([
          {
            topText: 'Total Balance',
            balance: userBalance.balance,
            bottomText: `${userBalance.balanceChange >= 0 ? '+' : ''}₼${userBalance.balanceChange} from last month`,
            isGrowth: userBalance.balanceChange >= 0,
          },
          {
            topText: 'Total Income',
            balance: userBalance.income,
            bottomText: '',
            isGrowth: true,
          },
          {
            topText: 'Total Expense',
            balance: userBalance.expense,
            bottomText: '',
            isGrowth: false,
          },
          {
            topText: 'Savings Rate',
            balance: Math.floor(userBalance.savingRate),
            bottomText: ``,
            isGrowth: true,
            sign: '%',
          },
        ]);
      },
    });
  }
}
