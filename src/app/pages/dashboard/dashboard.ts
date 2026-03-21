import { Component } from '@angular/core';
import { BalanceCard } from '../../components/balance-card/balance-card';
import { Card, Cards } from './components/cards/cards';
@Component({
  selector: 'app-dashboard',
  imports: [Cards],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  cards: Card[] = [
    {
      topText: 'Total Balance',
      balance: 45320,
      bottomText: '+₹2,150 this month',
      isGrowth: true,
    },
    {
      topText: 'Total Income',
      balance: 25800,
      bottomText: '+12% from last month',
      isGrowth: true,
    },
    {
      topText: 'Total Expense',
      balance: 18600,
      bottomText: '-8% from last month',
      isGrowth: false,
    },
    {
      topText: 'Savings Rate',
      balance: 28,
      bottomText: '+3% improvement',
      isGrowth: true,
    },
  ];
}
