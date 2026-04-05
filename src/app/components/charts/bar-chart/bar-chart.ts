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
  expensesData = input.required<CategoryExpenseChartData[]>();

  ngOnInit(): void {
    console.log(this.expensesData());
    this.barChartData.set({
      labels: this.expensesData().map((c) => c.category),
      datasets: [
        {
          data: this.expensesData().map((c) => c.expense),
          label: 'Test',
          backgroundColor: this.generateColors(this.expensesData().length),
        },
      ],
    });

    console.log;
  }

  generateColors(count: number): string[] {
    return Array.from({ length: count }, () => `hsl(${Math.random() * 360}, 70%, 60%)`);
  }

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
}
