import { Component, input, output, signal } from '@angular/core';
import {
  CreateTransactionRequest,
  TransactionCategoryResponse,
} from '../../../services/transaction-service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-transaction',
  imports: [ReactiveFormsModule],
  templateUrl: './add-transaction.html',
  styleUrl: './add-transaction.css',
})
export class AddTransaction {
  isOpen = input.required<boolean>();
  categories = input.required<TransactionCategoryResponse[]>();

  close = output();
  saveTrasaction = output<CreateTransactionRequest>();

  createTransactionForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    amount: new FormControl(1, [Validators.required]),
    description: new FormControl(null, [Validators.maxLength(255)]),
    transactionCategoryId: new FormControl(1, [Validators.required]),
    dateTime: new FormControl(new Date().toDateString()),
  });

  submit() {
    if (this.createTransactionForm.invalid) {
      return;
    }

    const createTransactionRequest: CreateTransactionRequest = {
      name: this.createTransactionForm.value.name!,
      amount: this.createTransactionForm.value.amount!,
      description: this.createTransactionForm.value.description,
      transactionCategoryId: this.createTransactionForm.value.transactionCategoryId!,
      dateTime: this.createTransactionForm.value.dateTime!,
    };

    this.saveTrasaction.emit(createTransactionRequest);
  }

  get name() {
    return this.createTransactionForm.get('name');
  }

  get description() {
    return this.createTransactionForm.get('description');
  }

  get amount() {
    return this.createTransactionForm.get('amount');
  }
}
