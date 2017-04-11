import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { AppConfig } from '../app/app.config';
import 'rxjs/add/operator/map';
import { Observable, Observer } from 'rxjs/Rx';
import { HttpService } from './http-service';
import { GOLD_PRICE_LIST } from './mock-data/gold-price.mock.ts';
import { RATE_EXCHANGE_LIST } from './mock-data/rate-exchange.mock.ts';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the RestAPIService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestAPIService extends HttpService {

  private rateExchangeData? : any;
  private goldPriceData? : any;
  public rateExchangeList: FirebaseListObservable<any>;
  public goldPriceList: FirebaseListObservable<any>;

  constructor(protected http: Http, protected config: AppConfig
    , protected storage: Storage , private platform: Platform, private af : AngularFire) {
      super(http, config, storage);
      console.log('Hello RestAPIService Provider');
      this.rateExchangeList = af.database.list('/rate-exchange');
      this.goldPriceList = af.database.list('/gold-price');
      platform.ready().then(()=>{
        this.auth();
      }).catch((err) => {
        console.log(err);
      });
  }

  getGoldPriceData() : Observable<any> {
    console.log('getGoldPriceData');
    if (this.goldPriceData) {
      return Observable.create((observer) => {
        observer.next(this.goldPriceData);
        observer.complete();
      });
    }
    if(this.config.env == 'dev') {
      return Observable.create((observer) => {
        observer.next(GOLD_PRICE_LIST);
        observer.complete();
      }).map(this.handleGoldPriceResponse.bind(this));
    } 

    return this.getData(`gold-price`)
    .map(this.handleGoldPriceResponse.bind(this))
    .catch((err) => {
          console.log(err);
          return Observable.throw(false);
        });
  }

  getRateExchangeData() : Observable<any> {
    console.log('getRateExchangeData');
    if (this.rateExchangeData) {
      return Observable.create((observer) => {
        observer.next(this.rateExchangeData);
        observer.complete();
      })
    }
    if(this.config.env == 'dev') {
      return Observable.create((observer) => {
        observer.next(RATE_EXCHANGE_LIST);
        observer.complete();
      }).map(this.handleRateExchangeResponse.bind(this));
    } 

    return this.getData(`exchange-rate`)
    .map(this.handleRateExchangeResponse.bind(this))
    .catch((err) => {
          console.log(err);
          return Observable.throw(false);
        });
  }
  auth() : Observable<any> {
    console.log('auth');
    if(this.config.env == 'dev') {
      return Observable.create((observer) => {
        observer.next();
        observer.complete();
      })
    }
    let authHeader = {
      'provider' : 'device',
      'project-code': this.config.projectCode,
      'device-id' : this.config.deviceId
    };
    let body = {
      'device-info' : this.config.deviceInfo
    };
    return this.postData(`auth`, body, authHeader)
    .map(this.handleAuthResponse.bind(this))
    .catch((err) => {
          console.log(err);
          return Observable.throw(false);
        });

  }

  private handleAuthResponse(res) {
    console.log('handleAuthResponse :', res);
    return res;
  }

  private handleGoldPriceResponse(res) {
    console.log('handleGoldPriceResponse :', res);
    if(res.success) {
      this.goldPriceList.push(res.data);
    }
    return res.data;
  }

  private handleRateExchangeResponse(res) {
    console.log('handleRateExchangeResponse :', res);
    if(res.success) {
      this.rateExchangeList.push(res.data);
    }
    
    return res.data;
  }

}
