import { Component, input, OnInit, signal } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CategoryExpenseChartData } from '../pie-chart/pie-chart';
@Component({
  selector: 'app-bar-chart',
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.css',
})
export class BarChart implements OnInit {
  barChartData = signal<ChartData<'bar'> | null>(null);

  ngOnInit(): void {
    this.barChartData.set({
      labels: this.expensesData().map((c) => c.category),
      datasets: [{ data: this.expensesData().map((c) => c.expense), label: 'Test' }],
    });
  }
  expensesData = input<CategoryExpenseChartData[]>([]);

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
}
