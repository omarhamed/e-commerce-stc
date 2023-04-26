import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): any {
    console.log('Url: ' + url);
    let val = localStorage.getItem('isUserLoggedIn');

    if (val != null && val == 'true') {
      if (url == '/login') this.router.parseUrl('/products');
      else return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
