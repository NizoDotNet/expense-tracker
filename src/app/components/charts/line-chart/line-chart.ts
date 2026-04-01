import { Component, input, OnInit, signal } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.css',
})
export class LineChart implements OnInit {
  incomeData = input.required<number[]>();
  expenseData = input.required<number[]>();
  labels = input.required<string[]>();
  lineChartData = signal<ChartConfiguration['data'] | null>(null);
  lineChartOptions = signal<ChartConfiguration['options'] | null>(null);

  ngOnInit(): void {
    this.lineChartData.set({
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
    });

    this.lineChartOptions.set({
      plugins: {
        legend: {
          labels: {
            boxHeight: 1,
          },
          position: 'bottom',
        },
      },
    });
  }
}
