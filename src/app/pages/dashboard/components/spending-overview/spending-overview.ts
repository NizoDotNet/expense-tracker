import { Component, computed, input, output, signal } from '@angular/core';
import { LineChart } from '../../../../components/charts/line-chart/line-chart';
import { PieChart } from '../../../../components/charts/pie-chart/pie-chart';
import {
  TimePeriod,
  TransactionExpenseByCategoryResponse,
  TransactionIncomeExpenseResponse,
  TransactionResponse,
} from '../../../../services/transaction-service';
import { NgModel, ɵInternalFormsSharedModule } from '@angular/forms';
import { Table } from '../table/table';
@Component({
  selector: 'app-spending-overview',
  imports: [LineChart, PieChart, Table, ɵInternalFormsSharedModule],
  templateUrl: './spending-overview.html',
  styleUrl: './spending-overview.css',
})
export class SpendingOverview {
  incomeExpense = input.required<TransactionIncomeExpenseResponse>();
  incomeByCategory = input.required<TransactionExpenseByCategoryResponse[]>();
  transactionResponse = input<TransactionResponse[]>([]);

  expenseData = computed(() => this.incomeExpense().expense.map((c) => c.amount));
  incomeData = computed(() => this.incomeExpense().income.map((c) => c.amount));
  chartLabels = computed(() => this.incomeExpense().labels);

  pieData = computed(() =>
    this.incomeByCategory().map((c) => ({
      category: c.category,
      expense: c.amount,
    })),
  );
}
