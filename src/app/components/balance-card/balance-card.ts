import { Component, input } from '@angular/core';

@Component({
  selector: 'app-balance-card',
  imports: [],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.css',
})
export class BalanceCard {
  topText = input<string>('');
  balance = input<number>(0.0);
  bottomText = input<string>('');
  bottomTextColor = input<string>('text-green-400');
}
