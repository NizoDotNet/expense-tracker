import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

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
  private user: UserResponse | null = null;
  private readonly baseUrl = '/auth';
  http = inject(HttpClient);

  loginUser(request: LoginUserRequest) {
    let errors: any;
    this.http.post(`${this.baseUrl}/login`, request).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUserState(): UserResponse | null {
    return this.user;
  }
}
