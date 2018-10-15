import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarComponent } from './calendar.component';
import { WeekComponent } from './week/week.component';
import { CalendarHelper } from '../services/calendar-helper.service';
import { DayComponent } from './day/day.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CalendarComponent, WeekComponent, DayComponent],
  providers: [CalendarHelper]
})
export class CalendarModule {}
