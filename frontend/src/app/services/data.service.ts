import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private informationSource = new BehaviorSubject<string>(
    'default information'
  );

  currentInformation = this.informationSource.asObservable();

  constructor() {}

  changeinformation(information: string) {
    this.informationSource.next(information);
  }
}
