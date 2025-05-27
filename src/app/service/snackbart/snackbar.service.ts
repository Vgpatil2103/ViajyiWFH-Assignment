import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(
    message: string,
    action: string = 'Close',
    duration: number = 3000
  ) {
    this.snackBar.open(`✅ ${message}`, action, {
      duration,
      panelClass: ['snackbar-success'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  showError(
    message: string,
    action: string = 'Close',
    duration: number = 3000
  ) {
    this.snackBar.open(`⚠️ ${message}`, action, {
      duration,
      panelClass: ['snackbar-error'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
