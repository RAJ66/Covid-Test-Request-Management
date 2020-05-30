import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

const API_URL = environment.apiUrl;
const httpOptions = environment.headers;
@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(public http: HttpClient) {}

  getRequests(filter: string): Observable<any> {
    if (!filter) {
      return this.http.get(`${API_URL}requests`, httpOptions);
    } else {
      return this.http.get(`${API_URL}requests?${filter}`, httpOptions);
    }
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

  updateRequestFile(requestId: string, newInformation: any): Observable<any> {
    console.log(requestId, newInformation);

    return this.http.put(
      `${API_URL}request/${requestId}/image`,
      newInformation
    );
  }

  deleteRequest(requestId: string): Observable<any> {
    return this.http.delete(`${API_URL}request/${requestId}`, httpOptions);
  }
}
