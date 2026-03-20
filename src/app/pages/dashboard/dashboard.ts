import { Component } from '@angular/core';
import { BalanceCard } from '../../components/balance-card/balance-card';
@Component({
  selector: 'app-dashboard',
  imports: [BalanceCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
