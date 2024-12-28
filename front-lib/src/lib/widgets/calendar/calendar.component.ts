import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CALENDAR_TEXTS } from './constants/constants';
import { CalendarSelectionProvider } from './providers/calendar-selection.provider';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  providers: [
    // CalendarSelectionProvider,
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnDestroy {
  @Input() maxSelection = 4;
  @Input() orderSelection = false;
  @Input() language: 'es' | 'en' = 'es';
  @Output() selectedDays: Date[] = [];
  @Output() shadowedSelection: Date[] = [];

  calendarSelectionProviderSubscription = new Subscription();

  days = CALENDAR_TEXTS[this.language].days;
  months = CALENDAR_TEXTS[this.language].months;

  matrix: Date[][] = [];
  selection: Date[][] = [];

  selectedYear = (new Date()).getFullYear();
  selectedMonth = (new Date()).getMonth();

  constructor(
    private calendarSelectionProvider: CalendarSelectionProvider,
  ) {
    this.matrix = this.generateMatrix(this.selectedYear);
    this.selection = this.selectMonth(this.selectedMonth);

    this.calendarSelectionProviderSubscription = this.calendarSelectionProvider.observeSelectedDays()
      .subscribe((selectedDays: Date[]) => {
        // console.log('selectedDays:', selectedDays);
        this.updateShadowedSelection(selectedDays);
      });
  }

  ngOnDestroy(): void {
    this.calendarSelectionProviderSubscription.unsubscribe();
  }

  public nextMonth() {
    if (this.selectedMonth === 11) {
      this.selectedYear++;
      this.matrix = this.generateMatrix(this.selectedYear);
      this.selectedMonth = 0;
      this.selection = this.selectMonth(this.selectedMonth, this.selectedYear);
      return;
    }
    this.selectedMonth = (this.selectedMonth + 1) % 12;
    this.selection = this.selectMonth(this.selectedMonth, this.selectedYear);
  }

  public previousMonth() {
    if (this.selectedMonth === 0) {
      this.selectedYear--;
      this.matrix = this.generateMatrix(this.selectedYear);
      this.selectedMonth = 11;
      this.selection = this.selectMonth(this.selectedMonth, this.selectedYear);
      return;
    }
    this.selectedMonth = (this.selectedMonth - 1) % 12;
    this.selection = this.selectMonth(this.selectedMonth, this.selectedYear);
  }

  public selectDay(day: Date) {
    if (this.isSelectedDay(day)) {
      this.removeSelectedDay(day);
    } else {
      this.selectedDays = this.addSelectedDay(day);
    }
    this.calendarSelectionProvider.updateSelection(this.selectedDays);
  }

  public selectMonth(month: number, year = 2024): Date[][] {
    let init = -1;

    for (let weekIdx = 0; weekIdx < this.matrix.length; weekIdx++) {
      for (const day of this.matrix[weekIdx]) {
        if (day.getMonth() === month && day.getFullYear() === year) {
          console.log(day);
          init = weekIdx;
          break;
        }
      }
      if (init >= 0) {
        console.log('init', init);
        break;
      }
    }
    if (init >= 0) {
      return this.matrix.slice(init, init + 5);
    }
    return [];
  }

  public getDayClass(day: Date): string {
    const isSelectedMonth = day.getMonth() === this.selectedMonth ? '' : 'no-current-month';

    const isSelected = this.isSelectedDay(day) ? 'selected' : '';

    const isToday = this.isTodayDay(day) ? 'today' : '';

    const isShadowed = this.isShadowedDay(day) ? 'shadowed' : '';

    return `${isSelectedMonth} ${isToday} ${isSelected} ${isShadowed}`;
  }

  private updateShadowedSelection(selectedDays: Date[]) {
    if (selectedDays.length < 2) {
      this.shadowedSelection = [];
      return;
    }

    const orderedSelection = [...selectedDays];
    orderedSelection.sort((a, b) => a.getTime() - b.getTime());

    if (new Date(orderedSelection[0].getDate() + 1) === orderedSelection[orderedSelection.length - 1]) {
      this.shadowedSelection = [];
      return;
    }

    const newShadowedSelection = [];
    for (
      let currentDate = this.addDays(orderedSelection[0], 1);
      currentDate < orderedSelection[orderedSelection.length - 1];
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      newShadowedSelection.push(new Date(currentDate));
    }
    this.shadowedSelection = [...newShadowedSelection];
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  private isShadowedDay(day: Date): boolean {
    return this.shadowedSelection.some(selectedDay =>
      selectedDay.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' })
      === day.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' }));
  }

  private addSelectedDay(day: Date) {
    const newSelection = [...this.selectedDays, day];
    if (this.orderSelection) {
      newSelection.sort((a, b) => a.getTime() - b.getTime());
    }
    return newSelection.slice(-this.maxSelection);

  }

  private removeSelectedDay(day: Date): boolean {
    const idx = this.selectedDays.findIndex(selectedDay =>
      selectedDay.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' })
      === day.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' }));
    if (idx >= 0) {
      this.selectedDays.splice(idx, 1);
      return true;
    }
    return false;
  }

  private isSelectedDay(day: Date): boolean {
    return this.selectedDays.some(selectedDay =>
      selectedDay.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })
      === day.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }));
  }

  private isTodayDay(day: Date): boolean {
    return day.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })
      === (new Date()).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  private generateMatrix(year: number) {
    const matrix = [];
    const date = new Date(year, 0, 1);
    const day = date.getDay();
    const firstDay = new Date(year, 0, 1 - day);
    let week = [];
    for (let i = 0; i < 373; i++) {
      const currentDate = new Date(firstDay);
      currentDate.setDate(currentDate.getDate() + i);
      week.push(currentDate);
      if (currentDate.getDay() === 6) {
        matrix.push(week);
        week = [];
      }
    }
    return matrix;
  }
}

