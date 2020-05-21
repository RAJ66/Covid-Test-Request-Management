import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { API_URL, httpOptions } from './setup';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(public http: HttpClient) {}

  list(): Observable<any> {
    return this.http.get(`${API_URL}dashboard`, httpOptions);
  }
}
