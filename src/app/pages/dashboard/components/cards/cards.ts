import { Component, input } from '@angular/core';
import { BalanceCard } from '../../../../components/balance-card/balance-card';
import { NgForOf } from '../../../../../../node_modules/@angular/common/types/_common_module-chunk';
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
