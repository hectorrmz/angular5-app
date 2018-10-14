import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { User } from '../models/redmine.model';

@Injectable()
export class AuthService {
  constructor(private http: Http) {}

  loginRM(user: User): Observable<any> {
    return this.http
      .post('redmine/user', user)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}
