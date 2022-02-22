import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  authError() {
    this.snackBar.open('You must be logged in!', 'OK', {
      duration: 5000,
    });

    if (this.snackBar._openedSnackBarRef) {
      return this.snackBar._openedSnackBarRef
        .onAction()
        .pipe(tap((_) => this.router.navigate(['/user/login'])))
        .subscribe();
    } else {
      return null;
    }
  }

  error(msg: string) {
    this.openSnack(msg, 'Ok!');
  }

  openSnack(msg: string, action: string) {
    this.snackBar.open(msg, action, {
      duration: 5000,
    });
  }
}
