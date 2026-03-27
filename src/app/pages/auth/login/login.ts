import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  errorMessage = '';
  isSubmitting = false;

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  form = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const { email, password } = this.form.value;

    this.authService
      .login({
        email: email!,
        password: password!,
      })
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          console.log('Logged in');
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage = err.message;
        },
      });
  }
}
