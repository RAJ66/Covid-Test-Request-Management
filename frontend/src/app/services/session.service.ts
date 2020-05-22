import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

const API_URL = environment.apiUrl;
const httpOptions = environment.headers;

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  session: any = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  constructor(public http: HttpClient) {}

  login(nif: number, password: string): Observable<any> {
    return this.http.post(
      `${API_URL}login`,
      {
        nif,
        password,
      },
      httpOptions
    );
  }

  me(): Observable<any> {
    return this.http.get(`${API_URL}me`, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(`${API_URL}logout`, httpOptions);
  }
}
