import { Component, input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.css',
})
export class LineChart {
  incomeData = input<any[]>([]);
  expenseData = input<any[]>([]);
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        label: 'Income',
        borderColor: 'rgb(0, 184, 148)',
        data: this.incomeData(),
      },
      {
        label: 'Expense',
        borderColor: 'rgb(239, 68, 68)',
        data: this.expenseData(),
      },
    ],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  };
}
