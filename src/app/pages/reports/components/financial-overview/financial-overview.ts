import { Component, input } from '@angular/core';
import {
  TransactionExpenseByCategoryResponse,
  TransactionIncomeExpenseResponse,
} from '../../../../services/transaction-service';
import { LineChart } from '../../../../components/charts/line-chart/line-chart';
import { PieChart } from '../../../../components/charts/pie-chart/pie-chart';
@Component({
  selector: 'app-financial-overview',
  imports: [LineChart, PieChart],
  templateUrl: './financial-overview.html',
  styleUrl: './financial-overview.css',
})
export class FinancialOverview {
  incomeExpense = input.required<TransactionIncomeExpenseResponse>();
  incomeByCategory = input.required<TransactionExpenseByCategoryResponse[]>();
}
