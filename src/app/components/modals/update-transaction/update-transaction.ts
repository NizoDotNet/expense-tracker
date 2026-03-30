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

  updateTransaction = output<UpdateTransactionRequest>();

  updateTransactionForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.updateTransactionForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      amount: new FormControl(1, [Validators.required]),
      description: new FormControl(null, [Validators.maxLength(255)]),
      transactionCategoryId: new FormControl(1, [Validators.required]),
      dateTime: new FormControl(new Date().toDateString()),
    });
  }

  submit() {
    if (this.updateTransactionForm.invalid) {
      return;
    }

    const createTransactionRequest: UpdateTransactionRequest = {
      name: this.updateTransactionForm.value.name!,
      amount: this.updateTransactionForm.value.amount!,
      description: this.updateTransactionForm.value.description,
      transactionCategoryId: this.updateTransactionForm.value.transactionCategoryId!,
      dateTime: this.updateTransactionForm.value.dateTime!,
    };

    this.updateTransaction.emit(createTransactionRequest);
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
