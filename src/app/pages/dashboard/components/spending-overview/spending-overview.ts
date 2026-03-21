import { Component } from '@angular/core';
import { LineChart } from '../../../../components/charts/line-chart/line-chart';
@Component({
  selector: 'app-spending-overview',
  imports: [LineChart],
  templateUrl: './spending-overview.html',
  styleUrl: './spending-overview.css',
})
export class SpendingOverview {}
