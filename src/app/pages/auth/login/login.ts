import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  errorMessage = '';
  isSubmitting = false;
  showPassword = false;

  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  toastService = inject(ToastrService);

  form = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  email() {
    return this.form.get('email');
  }

  password() {
    return this.form.get('password');
  }
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
          this.router.navigate(['/dashboard']);
          this.toastService.info('You logged in succesfully');
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage = 'Email or password is incorrect';
          this.toastService.error('Error');
        },
      });
  }
}
