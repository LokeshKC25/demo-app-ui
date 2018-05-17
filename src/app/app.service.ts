import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AppSettings } from './app.setting';

@Injectable()
export class AppService {
  private isSpinner: Subject<boolean> = new Subject<boolean>();
  isSpinnerUpdated$ = this.isSpinner.asObservable();

  constructor() { }

  set spinnerData(value: boolean) {
    this.isSpinner.next(value);
  }
}
