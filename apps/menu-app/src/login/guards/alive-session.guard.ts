import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AliveSessionGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): Observable<boolean> {
    this.router.navigate(['/login/sign-in']);
    return of(true);
  }
}
