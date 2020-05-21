import { HttpHeaders } from '@angular/common/http';

export const API_URL = 'http://localhost:3333/apiv1/';
export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
};
