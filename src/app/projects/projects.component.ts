import {
  Component,
  Input,
  Output,
  EventEmitter,
  Pipe,
  PipeTransform
} from '@angular/core';
import {Router} from '@angular/router';

//models
import { Project, Issue } from '../models/redmine.model';
import { RedmineService } from '../services/redmine.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'ap-projects',
  styleUrls: ['./projects.component.scss'],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  @Output()
  change: EventEmitter<Issue> = new EventEmitter<Issue>();

  projects: Project[];
  issues: Array<Issue>;
  issue: Issue;
  loaded: boolean = false;

  constructor(private redmineService: RedmineService, private router: Router) {}

  ngOnInit(): void {
    this.redmineService
      .getProjects()
      .subscribe((response: any) => (this.projects = response.projects));

    this.redmineService.getIssues().subscribe((response: any) => {
      this.issues = response.issues;
      setTimeout(() => {
        this.loaded = true;
      }, 0);
    });
  }

  issueSelected(issue: Issue) {
    this.issue = issue;
    this.change.emit(this.issue);
    this.router.navigate(['calendar']);
  }
}

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
