import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

const API_URL = environment.apiUrl;
const httpOptions = environment.headers;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(public http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${API_URL}users`, httpOptions);
  }

  createUser(user: object): Observable<any> {
    return this.http.post(`${API_URL}users`, user, httpOptions);
  }

  getOneUser(userId: string): Observable<any> {
    return this.http.get(`${API_URL}user/${userId}`, httpOptions);
  }

  updateUser(userId: string, newInformation: object): Observable<any> {
    return this.http.put(
      `${API_URL}user/${userId}`,
      newInformation,
      httpOptions
    );
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${API_URL}user/${userId}`, httpOptions);
  }
}
