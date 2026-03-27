import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
export interface UserResponse {
  id: string;
  email: string;
  username: string;
  balance: {
    id: string;
    amount: string;
  };
}

export interface LoginUserRequest {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = signal<UserResponse | null>(null);
  isLoading = signal(false);
  private readonly baseUrl = '/api/auth';
  http = inject(HttpClient);
  router = inject(Router);

  login(login: LoginUserRequest) {
    this.isLoading.set(true);
    return this.http
      .post(`${this.baseUrl}/login`, login, {
        withCredentials: true,
      })
      .pipe(
        switchMap(() => this.getUser()),
        tap((user) => {
          this.user.set(user);
          this.isLoading.set(false);
        }),
        catchError((error) => {
          this.user.set(null);
          this.isLoading.set(false);

          if (error.status === 401) {
            return throwError(() => new Error('Invalid credentials'));
          }

          return throwError(() => error);
        }),
      );
  }

  getUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/user`);
  }

  getUserState() {
    if (this.user() === null) {
      this.getUser().subscribe({
        next: (data) => {
          this.user.set(data);
        },
        error: (error) => this.router.navigate(['/auth/login']),
      });
    }
    return this.user();
  }
}
