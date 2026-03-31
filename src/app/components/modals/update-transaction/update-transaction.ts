import { Component, input, OnInit, output } from '@angular/core';
import {
  TransactionCategoryResponse,
  TransactionResponse,
  UpdateTransactionRequest,
} from '../../../services/transaction-service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-transaction',
  imports: [ReactiveFormsModule],
  templateUrl: './update-transaction.html',
  styleUrl: './update-transaction.css',
})
export class UpdateTransaction implements OnInit {
  isOpen = input.required<boolean>();
  categories = input.required<TransactionCategoryResponse[]>();
  transaction = input.required<TransactionResponse>();

  close = output();

  updateTransaction = output<{ id: string; updTransaction: UpdateTransactionRequest }>();

  updateTransactionForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    const date = new Date(this.transaction().dateTime);

    const formatted =
      date.getFullYear() +
      '-' +
      String(date.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(date.getDate()).padStart(2, '0') +
      'T' +
      String(date.getHours()).padStart(2, '0') +
      ':' +
      String(date.getMinutes()).padStart(2, '0');
    this.updateTransactionForm = new FormGroup({
      name: new FormControl(this.transaction().name, [
        Validators.required,
        Validators.minLength(2),
      ]),
      amount: new FormControl(this.transaction().amount, [Validators.required]),
      description: new FormControl(this.transaction().description, [Validators.maxLength(255)]),
      transactionCategoryId: new FormControl(this.transaction().category.id, [Validators.required]),
      dateTime: new FormControl(formatted),
    });
  }

  submit() {
    if (this.updateTransactionForm.invalid) {
      return;
    }

    const updateTransactionRequest: UpdateTransactionRequest = {
      name: this.updateTransactionForm.value.name!,
      amount: this.updateTransactionForm.value.amount!,
      description: this.updateTransactionForm.value.description,
      transactionCategoryId: this.updateTransactionForm.value.transactionCategoryId!,
      dateTime: this.updateTransactionForm.value.dateTime!,
    };

    this.updateTransaction.emit({
      id: this.transaction().id,
      updTransaction: updateTransactionRequest,
    });
  }

  get name() {
    return this.updateTransactionForm.get('name');
  }

  get description() {
    return this.updateTransactionForm.get('description');
  }

  get amount() {
    return this.updateTransactionForm.get('amount');
  }
}
