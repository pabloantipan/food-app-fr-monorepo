import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type CarouselAction = 'next' | 'prev' | 'pause';

@Injectable()
export class CarouselProvider {
  private _index = 0;
  private _indexSubject = new Subject<number>();
  private _actionSubject = new Subject<CarouselAction>();
  private _itemsQuantity = new Subject<number>();

  constructor() { }

  public updateItemsQuantity(quantity: number) {
    this._itemsQuantity.next(quantity);
  }

  public observeIndex() {
    return this._indexSubject.asObservable();
  }

  public observeAction() {
    return this._actionSubject.asObservable();
  }

  public observeItemsQuantity() {
    return this._itemsQuantity.asObservable();
  }

  public updateIndex(index: number) {
    this._index = index;
    this._indexSubject.next(this._index);
  }

  public updateQuantity(quantity: number) {
    this._itemsQuantity.next(quantity);
  }

  public sendAction(action: CarouselAction) {
    this._actionSubject.next(action);
  }
}
