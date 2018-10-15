import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class CalendarHelper {
  today: moment.Moment = moment();

  daysInMonth(month: number, year: number) {
    return 32 - new Date(year, month, 32).getDate();
  }
}
