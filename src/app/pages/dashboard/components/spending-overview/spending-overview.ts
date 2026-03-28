import { Component, input } from '@angular/core';
import { LineChart } from '../../../../components/charts/line-chart/line-chart';
import { PieChart } from '../../../../components/charts/pie-chart/pie-chart';
import {
  TransactionExpenseByCategoryResponse,
  TransactionIncomeExpenseResponse,
  TransactionResponse,
} from '../../../../services/transaction-service';

import { Table } from '../table/table';
@Component({
  selector: 'app-spending-overview',
  imports: [LineChart, PieChart, Table],
  templateUrl: './spending-overview.html',
  styleUrl: './spending-overview.css',
})
export class SpendingOverview {
  incomeExpense = input.required<TransactionIncomeExpenseResponse>();
  incomeByCategory = input.required<TransactionExpenseByCategoryResponse[]>();
  transactionResponse = input<TransactionResponse[]>([]);
}
