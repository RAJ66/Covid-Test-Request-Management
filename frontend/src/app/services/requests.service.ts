import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { API_URL, httpOptions } from './setup';

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
