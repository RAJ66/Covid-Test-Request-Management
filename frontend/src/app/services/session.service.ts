import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3333/apiv1/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
};

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
