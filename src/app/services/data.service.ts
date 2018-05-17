import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { AppSettings } from './../app.setting';
import { AppService } from './../app.service';

@Injectable()
export class DataService {
  constructor(private http: Http,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute) { }

  getData(path: string): Observable<any> {
    const vm = this;
    setTimeout(function () { vm.appService.spinnerData = true; }, 0);
    const headers = new Headers();
    return this.http.get(AppSettings.api_endpoint + '/api' + path, { headers: headers })
      .map((res: Response) => {
        return vm.extractData(res, vm);
      })
      .catch((error: Response) => {
        return vm.handleError(error, vm);
      });
  }

  postData(path: string, data: any): Observable<any> {
    const vm = this;
    setTimeout(function () { vm.appService.spinnerData = true; }, 0);
    const headers = new Headers();
    return this.http.post(AppSettings.api_endpoint + '/api' + path, data, { headers: headers })
      .map((res: Response) => {
        return vm.extractData(res, vm);
      })
      .catch((error: Response) => {
        return vm.handleError(error, vm);
      });
  }

  private extractData(res: Response, vm) {
    const body = res.json();
    setTimeout(function () { vm.appService.spinnerData = false; }, 0);
    if (body.error) {
      throw (res);
    } else {
      return body.data;
    }
  }

  private handleError(error: Response | any, vm) {
    if (error.status === 401) {
      setTimeout(function () { vm.appService.spinnerData = false; }, 0);
      this.router.navigate(['/users-list']);
    } else if (error.status !== 0) {
      setTimeout(function () { vm.appService.spinnerData = false; }, 0);
      const errorMsg = error.json();
      return Observable.of(errorMsg).map(e => e);
    }
  }

}
