import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  arrUsers: User[] = [
    { userName: 'user', password: 'user', role: 'user' },
    { userName: 'admin', password: 'admin', role: 'admin' },
  ];
  isUserLoggedIn: boolean = false;
  role: string = '';

  login(userName: string, password: string): Observable<any> {
    console.log(userName);
    console.log(password);

    for (let i = 0; i < this.arrUsers.length; i++) {
      this.isUserLoggedIn =
        userName == this.arrUsers[i].userName &&
        password == this.arrUsers[i].password;
      if (this.isUserLoggedIn) {
        this.role = this.arrUsers[i].role;
        break;
      }
    }
    localStorage.setItem(
      'isUserLoggedIn',
      this.isUserLoggedIn ? 'true' : 'false'
    );
    if (this.isUserLoggedIn) {
      localStorage.setItem('role', this.role);
    }

    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap((val) => {
        console.log('Is User Authentication is successful: ' + val);
      })
    );
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn');
    localStorage.removeItem('role');
  }

  constructor() {}
}
