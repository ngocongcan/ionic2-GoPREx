import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../app/app.config';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from './http-service';

/*
  Generated class for the RestAPIService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestAPIService extends HttpService {

  private rateExchangeData? : any;
  private goldPriceData? : any;

  constructor(protected http: Http, protected config: AppConfig
    , protected storage: Storage) {
      super(http, config, storage);
      console.log('Hello RestAPIService Provider');
  }

  getGoldPriceData() : Observable<any> {
    console.log('getGoldPriceData');
    if (this.goldPriceData) {
      return Observable.create((observer) => {
        observer.next(this.goldPriceData);
        // observer.complete();
      });
    }
    return this.getData(`crawler/gold-price`)
    .map(this.handleGoldPriceResponse.bind(this))
    .catch((err) => {
          console.error(err);
          return Observable.throw(false);
        });
  }

  getRateExchangeData() : Observable<any> {
    console.log('getRateExchangeData');
    if (this.rateExchangeData) {
      return Observable.create((observer) => {
        observer.next(this.rateExchangeData);
        // observer.complete();
      })
    }
    return this.getData(`crawler/exchange-rate`)
    .map(this.handleRateExchangeResponse.bind(this))
    .catch((err) => {
          console.error(err);
          return Observable.throw(false);
        });
  }

  checkToken(): Observable<string> {
    return this.getToken();
  }

   
  auth() : Observable<any> {
    console.log('auth');
    let authHeader = {
      'provider' : 'device',
      'project-code': this.config.projectCode,
      'device-id' : this.config.deviceId
    };
    let body = {
      'device-info' : this.config.deviceInfo
    };
        
    console.log('auth header:', authHeader);
    console.log('auth body:', body);

    return this.postData(`auth`, body, authHeader)
    .map(this.handleAuthResponse.bind(this))
    .catch((err) => {
          console.error(err);
          return Observable.throw(false);
        });

  }

  private handleAuthResponse(res) {
    console.log('handleAuthResponse :', res);
    let accessToken = res.data.access_token;
    this.storage.set('access-token', accessToken);
    return accessToken;
  }

  private handleGoldPriceResponse(res) {
    console.log('handleGoldPriceResponse :', res);
    if(res.success) {
      this.goldPriceData = res.data
    }
    return res.data;
  }

  private handleRateExchangeResponse(res) {
    console.log('handleRateExchangeResponse :', res);
    if(res.success) {
      this.rateExchangeData = res.data;
    }
    return res.data;
  }

}
