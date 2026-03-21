import { Component, input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.css',
})
export class PieChart implements OnInit {
  expensesData = input<PieData[]>([]);
  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'right',

        labels: {
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
        },
      },
    },
    responsive: false,
    maintainAspectRatio: false,
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> | undefined = undefined;
  ngOnInit(): void {
    this.pieChartData = {
      labels: this.expensesData().map((c) => c.category),
      datasets: [
        {
          data: this.expensesData().map((c) => c.expense),
        },
      ],
    };
  }
}

export interface PieData {
  category: string;
  expense: number;
}
