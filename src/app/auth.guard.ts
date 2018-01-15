import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { isNullOrUndefined } from 'util';
import { CanActivateChild } from '@angular/router/src/interfaces';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const id = Cookie.get('id');
    const canNavigate = !isNullOrUndefined(id);
    if (!canNavigate) {
      this.router.navigate(['/login']);
    }
    return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const id = Cookie.get('id');
    const canNavigate = !isNullOrUndefined(id);
    if (!canNavigate) {
      this.router.navigate(['/login']);
    }
    return true;
  }
}
