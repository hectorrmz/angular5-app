import { Pipe, PipeTransform } from '@angular/core';
import { Issue } from '../models/redmine.model';

@Pipe({
  name: 'filterIssues'
})
export class FilterIssueByProject implements PipeTransform {
  transform(items: Array<Issue>, projectId: number): Array<Issue> {
    if (!items) {
      return;
    }

    return items.filter(item => item.project.id === projectId);
  }
}
