import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AliveSessionGuard implements CanActivate {
  subject = new BehaviorSubject<number>(0);

  constructor(private router: Router) {
    this.subject.next(1);
    this.getValue();
  }

  async canActivate() {
    console.log('hola');
    await this.getValue();
    // this.router.navigate(['/login/sign-in']);
    return Promise.resolve(true);
  }

  async getValue() {
    try {
      const value = await lastValueFrom(this.subject);
      console.log('Another New Value:', value); // Output: Another New Value: 2
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
