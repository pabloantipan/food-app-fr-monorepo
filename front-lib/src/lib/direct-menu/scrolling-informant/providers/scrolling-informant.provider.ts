import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WindowScrollingInterface } from '../interfaces/scrolling.interfaces';

@Injectable(
  // { providedIn: 'root' }
)
export class ScrollingInformantProvider {
  private _verticalScroll = new BehaviorSubject({
    actualValue: 0,
    previousValue: undefined,
    direction: 'none',
    variation: undefined,
    distanceToBottom: undefined,
    isAtBottom: undefined,
    isAtTop: undefined,
  } as unknown as WindowScrollingInterface);


  constructor() { }

  public observeVerticalScroll() {
    return this._verticalScroll.asObservable();
  }

  public get scrollY$() {
    return this._verticalScroll.asObservable();
  }

  updateScrollY(newValues: WindowScrollingInterface): void {
    console.log('scrollingInformantProvider updateScrollY', newValues);
    this._verticalScroll.next(newValues);
  }
}
