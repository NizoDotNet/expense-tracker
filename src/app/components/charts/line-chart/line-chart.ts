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
  incomeData = input<any[]>([10, 20, 30, 20, 2, 12, 30]);
  expenseData = input<any[]>([4, 12, 32]);
  labels = input<string[]>(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']);
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        label: 'Income',
        borderColor: 'rgb(0, 184, 148)',
        data: this.incomeData(),
        tension: 0.4,
      },
      {
        label: 'Expense',
        borderColor: 'rgb(239, 68, 68)',
        data: this.expenseData(),
        tension: 0.4,
      },
    ],
    labels: this.labels(),
  };

  lineChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        labels: {
          boxHeight: 1,
        },
        position: 'bottom',
      },
    },
  };
}
