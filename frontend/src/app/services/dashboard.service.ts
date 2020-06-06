import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

const API_URL = environment.apiUrl;
const httpOptions = environment.headers;

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(public http: HttpClient) {}

  list(): Observable<any> {
    return this.http.get(`${API_URL}dashboard`, httpOptions);
  }

  users(): Observable<any> {
    return this.http.get(`${API_URL}user_status`, httpOptions);
  }

  requestsStats(): Observable<any> {
    return this.http.get(`${API_URL}request_status`, httpOptions);
  }
}
