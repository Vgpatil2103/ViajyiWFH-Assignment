import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'order-app';
  username!: string;
  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const userDetails = localStorage.getItem('username');
    if (userDetails) {
      this.username = JSON.parse(userDetails);
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
