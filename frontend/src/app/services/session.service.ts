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
    const request = this.http.post(
      `${API_URL}login`,
      {
        nif,
        password,
      },
      httpOptions
    );

    request.subscribe((res: any) => {
      const user = res.userLogged;
      localStorage.setItem('user', JSON.stringify(user));
    });

    return request;
  }

  me(): Observable<any> {
    return this.http.get(`${API_URL}me`, httpOptions);
  }

  logout(): Observable<any> {
    localStorage.removeItem('user');
    return this.http.post(`${API_URL}logout`, httpOptions);
  }
}
