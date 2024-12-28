import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  NgbCalendar,
  NgbDatepicker,
  NgbDatepickerI18n,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { I18n, CustomDatepickerI18nService } from './util/datepicker-i18n';

@Component({
  selector: 'app-datepicker-calendar',
  templateUrl: './datepicker-calendar.component.html',
  styleUrl: './datepicker-calendar.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, NgbDatepickerModule, FormsModule, JsonPipe],
  providers: [
    I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService },
    CustomDatepickerI18nService,
  ],
})
export class DatepickerCalendarComponent implements OnInit {
  @ViewChild('dp', { static: false }) datepicker!: NgbDatepicker;

  model: NgbDateStruct;
  @Input() currentMonth: number;
  @Input() currentYear: number;
  @Input() specialDays: number[] = [];
  @Output() dateSelected = new EventEmitter<NgbDateStruct>();
  @Output() navigateMonth = new EventEmitter<{ month: number; year: number }>();

  infoDate: string;
  selectedDate: NgbDateStruct | null = null;

  constructor(
    private calendar: NgbCalendar,
    private datepickerI18n: CustomDatepickerI18nService
  ) {
    this.model = this.calendar.getToday();
    this.currentMonth = this.model.month;
    this.currentYear = this.model.year;
    let info = datepickerI18n.monthNames;
    this.infoDate = info[this.currentMonth - 1] + ' ' + this.currentYear;
  }

  ngOnInit(): void {}

  handleDayClick(date: NgbDateStruct) {
    this.onDateSelected(date); // Llamar al método de selección de fecha
  }

  onDateSelected(selectedDate: NgbDateStruct) {
    this.selectedDate = selectedDate;
    this.dateSelected.emit(selectedDate); // Emite el día seleccionado
  }

  onDateNavigate(event: any) {
    this.currentMonth = event.next.month;
    this.currentYear = event.next.year;
  }

  isSpecialDay(date: NgbDateStruct): boolean {
    return (
      this.specialDays.includes(date.day) && date.month === this.currentMonth
    );
  }

  navigateToPreviousMonth() {
    const prevMonth = this.currentMonth === 1 ? 12 : this.currentMonth - 1;
    const prevYear =
      this.currentMonth === 1 ? this.currentYear - 1 : this.currentYear;
    this.datepicker.navigateTo({ year: prevYear, month: prevMonth });
    let info = this.datepickerI18n.monthNames;
    this.infoDate = info[prevMonth - 1] + ' ' + prevYear;
    this.navigateMonth.emit({ month: prevMonth, year: prevYear });
  }

  navigateToNextMonth() {
    const nextMonth = this.currentMonth === 12 ? 1 : this.currentMonth + 1;
    const nextYear =
      this.currentMonth === 12 ? this.currentYear + 1 : this.currentYear;
    this.datepicker.navigateTo({ year: nextYear, month: nextMonth });
    let info = this.datepickerI18n.monthNames;
    this.infoDate = info[nextMonth - 1] + ' ' + nextYear;
    this.navigateMonth.emit({ month: nextMonth, year: nextYear });
  }
}
