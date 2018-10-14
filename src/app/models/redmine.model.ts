export interface User {
  username?: string;
  password?: string;
  api_key?: string;
  created_on?: string;
  firstname?: string;
  id?: number;
  last_login_on?: string;
  lastname?: string;
  login?: string;
  mail?: string;
}

export interface Issue {
  id?: number;
  description?: string;
  assigned_to?: any;
  author?: any;
  project?: Project;
  status?: any;
  subject?: string;
  tracker?: any;
}

export interface Project {
  id?: number;
  identifier?: string;
  description?: string;
  name?: string;
  status?: number;
  created_on?: string;
  updated_on?: string;
}
