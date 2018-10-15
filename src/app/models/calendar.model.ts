import { Activity } from './redmine.model';

export class Week {
  days: Day[] = [];

  constructor() {
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    days.forEach((dayName: string, index: number) => {
      this.days.push({
        name: dayName,
        day: index,
        times: { date: '', entries: [] }
      });
    });
  }
}

export interface Day {
  name?: string; // S-M-T-W-T-F-S
  date?: number; //1-31
  day?: number; //0-6,
  times?: TimesList;
}

export interface TimesList {
  date?: string;
  entries?: Array<any>;
}

export class Time {
  title?: string;
  duration?: number;
  date?: number | string;
  activity: Activity;
  isNew?: boolean;
  issueId?: string | number;

  constructor() {
    this.title = '';
    this.duration = 0;
    this.isNew = true;
    this.date = 0;
    this.activity = new Activity();
    this.issueId = window.sessionStorage.getItem('issue_id');
  }
}
