import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  login(data: string) {
    localStorage.setItem('username', JSON.stringify(data));
  }

  isUserLoggedIn() {
    if (localStorage.getItem('username')) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.router.navigate(['/login']);
    // localStorage.clear()
  }
}
