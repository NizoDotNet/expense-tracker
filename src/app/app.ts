import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Link } from './components/link/link';
import { AuthService } from './services/auth-service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Link],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('expense-tracker');
  readonly authService = inject(AuthService);
  readonly router = inject(Router);
  ngOnInit(): void {
    this.authService.getUser().subscribe({
      error: (err) => {
        if (err.status >= 400) {
          this.router.navigate(['/auth/login']);
        }
      },
    });
  }
}
