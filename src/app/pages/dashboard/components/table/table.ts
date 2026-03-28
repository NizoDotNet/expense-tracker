import { Component, input } from '@angular/core';
import { TransactionResponse } from '../../../../services/transaction-service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-table',
  imports: [DatePipe],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  data = input<TransactionResponse[]>([]);

  Abs(value: number) {
    return value >= 0 ? value : -value;
  }
}
