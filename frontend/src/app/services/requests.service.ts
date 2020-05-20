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
export class RequestsService {
  constructor(public http: HttpClient) {}

  getRequests(): Observable<any> {
    return this.http.get(`${API_URL}requests`, httpOptions);
  }

  createRequest(request: object): Observable<any> {
    return this.http.post(`${API_URL}requests`, request, httpOptions);
  }

  getOneRequest(requestId: string): Observable<any> {
    return this.http.get(`${API_URL}request/${requestId}`, httpOptions);
  }

  updateRequest(requestId: string, newInformation: object): Observable<any> {
    return this.http.put(
      `${API_URL}request/${requestId}`,
      newInformation,
      httpOptions
    );
  }

  deleteRequest(requestId: string): Observable<any> {
    return this.http.delete(`${API_URL}request/${requestId}`, httpOptions);
  }
}
