import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../service/auth/auth.service';
import { SnackbarService } from '../../service/snackbart/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userName!: string;

  constructor(
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private router:Router
  ) {}

  ngOnInit(): void {
    // if(this.authService.isUserLoggedIn()){
    //   this.router.navigate(["/create-order"])
    // }
    
  }

  login() {
    if (!this.userName) {
      this.snackbarService.showMessage('Enter Username');
    } else {
      this.authService.login(this.userName);
      this.router.navigate(["/create-order"])
      this.snackbarService.showMessage('Login Successful');
    }
  }
}
