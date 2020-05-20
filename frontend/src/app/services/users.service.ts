import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

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
export class UsersService {
  constructor(public http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${API_URL}users`, httpOptions);
  }

  createUser(user: Object): Observable<any> {
    return this.http.post(`${API_URL}users`, user, httpOptions);
  }

  getOneUser(userId): Observable<any> {
    return this.http.get(`${API_URL}user/${userId}`, httpOptions);
  }

  updateUser(userId, newInformation): Observable<any> {
    return this.http.put(
      `${API_URL}user/${userId}`,
      newInformation,
      httpOptions
    );
  }

  deleteUser(userId): Observable<any> {
    return this.http.delete(`${API_URL}user/${userId}`, httpOptions);
  }
}
