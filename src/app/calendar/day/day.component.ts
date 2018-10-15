import { Component, Input, SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Day, Time } from '../../models/calendar.model';
import { Activity } from '../../models/redmine.model';

@Component({
  selector: 'ap-day',
  styleUrls: ['./day.component.scss'],
  templateUrl: './day.component.html'
})
export class DayComponent implements OnChanges {
  @Input()
  day: Day;
  @Input()
  activities: Activity[];

  total: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['day']) {
      this.sumTotal();
    }
  }

  sumTotal() {
    let hours = 0;

    this.day.times.entries.forEach((time: Time) => {
      hours = hours + time.duration;
    });

    this.total = hours;
  }

  transferDataSuccess($event, modal: any) {
    let time: Time = new Time();
    time.activity = { ...$event.dragData.activity };
    modal.show(this.day, time, true);
  }

  editTime(modal: any, time: Time) {
    modal.show(this.day, time);
  }

  removeTime(index: number) {
    this.day.times.entries.splice(index, 1);
    this.sumTotal();
  }
}
