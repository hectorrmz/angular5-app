import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Week, Time } from '../../models/calendar.model';
import { Activity } from '../../models/redmine.model';

@Component({
  selector: 'ap-week',
  styleUrls: ['week.component.scss'],
  templateUrl: './week.component.html'
})
export class WeekComponent {
  @Input()
  weeks: Week[];
  @Input()
  view: number;
  @Input()
  activities: Activity[];

  time: Time = {
    activity: { id: 0, name: '' },
    date: 0,
    duration: 0,
    isNew: true,
    title: ''
  };

  constructor() {}

  save(form: NgForm) {
    console.log(form.controls);
  }
}
