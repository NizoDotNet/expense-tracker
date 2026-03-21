import { Component } from '@angular/core';
import { LineChart } from '../../../../components/charts/line-chart/line-chart';
import { PieChart } from '../../../../components/charts/pie-chart/pie-chart';
@Component({
  selector: 'app-spending-overview',
  imports: [LineChart, PieChart],
  templateUrl: './spending-overview.html',
  styleUrl: './spending-overview.css',
})
export class SpendingOverview {}
