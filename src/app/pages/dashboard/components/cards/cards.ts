import { Component, input } from '@angular/core';
import { BalanceCard } from '../../../../components/balance-card/balance-card';
@Component({
  selector: 'app-cards',
  imports: [BalanceCard],
  templateUrl: './cards.html',
  styleUrl: './cards.css',
})
export class Cards {
  cards = input<Card[]>([]);
}

export interface Card {
  topText: string;
  balance: number;
  bottomText: string;
  isGrowth: boolean;
}
