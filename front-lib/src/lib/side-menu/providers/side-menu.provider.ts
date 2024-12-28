import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SideMenuProvider {
  private _isOpen: boolean = true;
  private _isOpenSubject = new BehaviorSubject<boolean>(this._isOpen);

  observeIsOpen() {
    return this._isOpenSubject.asObservable();
  }

  toggle() {
    this._isOpen = !this._isOpen;
    this._isOpenSubject.next(this._isOpen);
  }

  open() {
    this._isOpen = true;
    this._isOpenSubject.next(this._isOpen);
  }

  close() {
    this._isOpen = false;
    this._isOpenSubject.next(this._isOpen);
  }
}
