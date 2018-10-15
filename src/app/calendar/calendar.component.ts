import { Component, ViewEncapsulation, OnChanges, Input } from '@angular/core';
import * as moment from 'moment';

import { TimeEntry, Activity } from '../models/redmine.model';
import { Time, Week, Day } from '../models/calendar.model';

import { RedmineService } from '../services/redmine.service';
import { CalendarHelper } from '../services/calendar-helper.service';

@Component({
  selector: 'app-calendar',
  styleUrls: ['./calendar.component.scss'],
  templateUrl: './calendar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnChanges {
  @Input()
  entries: TimeEntry[];
  @Input()
  activities: Activity[];
  @Input()
  outlookEvents: Time[];

  weeks: Array<Week> = [];
  times: Array<Time> = [];

  selected: Time;

  currentView: number;

  constructor(
    private calendarHelper: CalendarHelper,
    private redmineService: RedmineService
  ) {
    this.setdaysRange();
    this.currentView = 0;
  }

  ngOnChanges(changes) {
    this.createTimeEntries();
    if (changes['outlookEvents'] && this.outlookEvents.length) {
      this.importOutlookEvents();
    }
  }

  setdaysRange() {
    let now = new Date();

    let firstDay: number = now.getDate() <= 15 ? 1 : 16;
    let end: number =
      now.getDate() <= 15
        ? 15
        : this.calendarHelper.daysInMonth(now.getMonth(), now.getFullYear());

    let initial = new Date(
      `${now.getMonth() + 1}/${firstDay}/${now.getFullYear()}`
    );
    let initialNumber: number = initial.getDay(); // 0-6

    if (initialNumber === 6) {
      //if saturday is Month 1st, move to Sunday to avoid empty week render
      initial = new Date(
        `${now.getMonth() + 1}/${firstDay + 1}/${now.getFullYear()}`
      );
      initialNumber = 0;
    }

    let dayNumber = initial.getDate(); // date 1
    let skip = false;

    while (end > dayNumber) {
      let week = new Week();

      week.days.forEach((day: Day, index) => {
        if ((index >= initialNumber || skip) && dayNumber <= end) {
          day.date = dayNumber;
          day.times.date = moment(
            `${now.getMonth() + 1}-${dayNumber}-${now.getFullYear()}`
          ).format('YYYY-MM-DD');
          dayNumber++;
        }
      });

      skip = true;

      this.weeks.push(week);
    }

    console.log(this.weeks);
  }

  createTimeEntries() {
    this.entries.forEach((time: TimeEntry) => {
      let date = moment(time.spent_on).date();

      let entry: Time = {
        title: time.comments,
        duration: time.hours,
        date: date,
        activity: time.activity
      };

      this.times.push(entry);
    });

    this.setLoggedTimeEntries();
  }

  importOutlookEvents() {
    this.times = this.times.concat(this.outlookEvents);

    this.times = this.times.filter(
      (time, index, self) =>
        index ===
        self.findIndex(t => t.title === time.title && t.date === time.date)
    );

    this.setLoggedTimeEntries();
  }

  setLoggedTimeEntries() {
    this.weeks.forEach((week: Week) => {
      week.days.forEach((day: Day) => {
        day.times.entries = this.times.filter(entry => entry.date === day.date);
      });
    });
  }

  getTotal(entries: Array<Time>): number {
    let total: number = 0;

    for (let i = 0, _len = entries.length; i < _len; i++) {
      total += entries[i].duration;
    }

    return total;
  }

  saveTimes() {
    let newEntries: Time[] = [];

    this.weeks.forEach((week: Week) => {
      week.days.forEach((day: Day) => {
        day.times.entries.forEach((time: Time) => {
          if (time.isNew) {
            newEntries.push(time);
          }
        });
      });
    });

    console.log(newEntries);
    if (confirm('Are you sure you want to submit this times entries?')) {
      this.redmineService
        .setTimeEntries(newEntries)
        .subscribe((response: any) => console.log(response));
    }
  }

  getTimes(issueId: number) {
    let today = new Date();

    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    let lastDayInMonth = this.calendarHelper.daysInMonth(
      currentMonth,
      currentYear
    );

    let month: any =
      currentMonth > 9 ? currentMonth + 1 : '0' + (currentMonth + 1);

    let dateRange = `><${currentYear}-${month}-01|${currentYear}-${month}-${lastDayInMonth}`;

    this.redmineService
      .getTimeEntries(issueId, dateRange)
      .subscribe((response: any) => {
        this.entries = response.time_entries;
      });
  }
}
