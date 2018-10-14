import { Injectable } from '@angular/core';

//models
import { User } from '../models/redmine.model';

@Injectable()
export class AuthHelper {
  session: Storage;
  apiKey: string;
  userId: number;
  issueId: number;

  msCode: string;
  msToken: string;

  constructor() {
    this.session = window.sessionStorage;

    this.apiKey = this.session.getItem('api_key');
    this.userId = this.session.getItem('user_id')
      ? parseInt(this.session.getItem('user_id'))
      : 0;
    this.issueId = this.session.getItem('issue_id')
      ? parseInt(this.session.getItem('issue_id'))
      : 0;

    this.msCode = localStorage.getItem('code');
    this.msToken = localStorage.getItem('access_token');
  }

  getAPIKey = (): string => this.apiKey;

  setAPIKey = (key: string): void => {
    this.session.setItem('api_key', key);
    this.apiKey = key;
  };

  getRMUserId = (): number => this.userId;

  setRMUserId = (userId: number): void => {
    this.session.setItem('user_id', userId.toString());
    this.userId = userId;
  };

  getIssueId = (): number => this.issueId;

  setIssueId = (issueId: number): void => {
    this.session.setItem('issue_id', issueId.toString());
    this.issueId = issueId;
  };

  isAuthorized = (): boolean => {
    if (!this.apiKey || !this.userId) {
      return false;
    }
    return true;
  };

  AuthorizeUser = (user: User): void => {
    this.setAPIKey(user.api_key);
    this.setRMUserId(user.id);
  };

  logOutUser = (): void => {
    this.apiKey = '';
    this.userId = 0;
    this.session.clear();
  };

  //Microsoft Access

  getCode = (): string => this.msCode;

  setCode = (key: string): void => {
    localStorage.setItem('code', key);
    this.msCode = key;
  };

  getMSToken = (): string => this.msToken;

  setMSToken = (key: string): void => {
    localStorage.setItem('access_token', key);
    this.msToken = key;
  };

  hasCalendarAccess() {
    if (!this.msCode || !this.msToken) {
      return false;
    }
    return true;
  }
}
