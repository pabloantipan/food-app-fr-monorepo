import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CalendarSelectionProvider implements OnDestroy {
  private _selectedDays: Date[] = [];
  private _selectedDaysSubject = new BehaviorSubject<Date[]>([]);
  private _updatingSelection = new Subject<Date[]>();

  private _selectedDaysSubscription = new Subscription();
  private _updatingSubscription = new Subscription();

  constructor() {
    this._updatingSubscription = this._updatingSelection.subscribe((selection: Date[]) => {
      this._selectedDays = [...selection];
      this._selectedDaysSubject.next(this._selectedDays);
    });
  }

  ngOnDestroy(): void {
    this._selectedDaysSubscription.unsubscribe();
    this._updatingSubscription.unsubscribe();
  }

  public observeSelectedDays(): Observable<Date[]> {
    return this._selectedDaysSubject.asObservable();
  }

  public updateSelection(selection: Date[]): void {
    this._updatingSelection.next(selection);
  }

}
