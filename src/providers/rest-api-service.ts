import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../app/app.config';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from './http-service';
import * as PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
import * as moment from 'moment';
import * as _ from 'lodash';
/*
  Generated class for the RestAPIService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestAPIService extends HttpService {

  private rateExchangeData?: any;
  private goldPriceData?: any;

  private _gpdb;
  private _gpdata;
  private _redb;
  private _redata;

  constructor(protected http: Http, protected config: AppConfig
    , protected storage: Storage) {
    super(http, config, storage);
    console.log('Hello RestAPIService Provider');
    this.initDB();
  }

  initDB() {
    PouchDB.plugin(cordovaSqlitePlugin);
    this._gpdb = new PouchDB('_gopr.db', { adapter: 'cordova-sqlite' });
    this._redb = new PouchDB('_raex.db', { adapter: 'cordova-sqlite' });
  }

  getGoldPriceData(refresh?: boolean): Observable<any> {
    console.log('getGoldPriceData');
    if (this.goldPriceData && !refresh) {
      return Observable.create((observer) => {
        observer.next(this.goldPriceData);
        observer.complete();
      });
    }
    return this.getData(`crawler/gold-price`)
      .map(this.handleGoldPriceResponse.bind(this))
      .flatMap(this.saveGoldData.bind(this))
      .map((res) => {
        return this.goldPriceData;
      })
      .catch((err) => {
        console.error(err);
        return Observable.throw(false);
      });
  }

  getRateExchangeData(refresh?: boolean): Observable<any> {
    console.log('getRateExchangeData');
    if (this.rateExchangeData && !refresh) {
      return Observable.create((observer) => {
        observer.next(this.rateExchangeData);
        observer.complete();
      })
    }
    return this.getData(`crawler/exchange-rate`)
      .map(this.handleRateExchangeResponse.bind(this))
      .flatMap(this.saveRateData.bind(this))
      .map((res) => {
        return this.rateExchangeData;
      })
      .catch((err) => {
        console.error(err);
        return Observable.throw(false);
      });
  }

  checkToken(): Observable<string> {
    return this.getToken();
  }

  auth(): Observable<any> {
    console.log('auth');
    let authHeader = {
      'provider': 'device',
      'project-code': this.config.projectCode,
      'device-id': this.config.deviceId
    };
    let body = {
      'device-info': this.config.deviceInfo
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

  getAllRate(): Observable<any> {
    return Observable.fromPromise(
      this._redb.allDocs({
        include_docs: true
      })
    ).map(this.handleRateData.bind(this))
  }

  getAllGold(): Observable<any> {
    return Observable.fromPromise(
      this._gpdb.allDocs({
        include_docs: true
      })
    ).map(this.handleGoldData.bind(this))
  }

  private handleRateData(docs) {

    this._redata = docs.rows.map(row => {
      return row.doc;
    })

    return _.orderBy(this._redata, [function (o) { return Number(o._id) }], ['desc']);
  }


  private handleGoldData(docs) {
    this._gpdata = docs.rows.map(row => {
      return row.doc;
    })
    return _.orderBy(this._gpdata, [function (o) { return Number(o._id) }], ['desc']);
  }


  // private

  private handleAuthResponse(res) {
    console.log('handleAuthResponse :', res);
    let accessToken = res.data.access_token;
    this.storage.set('access-token', accessToken);
    return accessToken;
  }

  private handleGoldPriceResponse(res) {
    console.log('handleGoldPriceResponse :', res);
    if (res.success) {
      this.goldPriceData = res.data
    }
    return res.data;
  }

  private handleRateExchangeResponse(res) {
    console.log('handleRateExchangeResponse :', res);
    if (res.success) {
      this.rateExchangeData = res.data;
    }
    return res.data;
  }

  // PouchDB

  private saveRateData(data): Observable<any> {

    let dateString = new Date(data.DateTime);
    let dateFormat = "MM/DD/YYYY hh:mm:ss A"
    let unixTime = moment.utc(dateString, dateFormat).unix();
    // let unixTime = moment().unix();
    console.log("saveRateData time : ", unixTime);
    if (unixTime && dateString) {
      data['_id'] = `${unixTime}`;
      return Observable.fromPromise(
        this._redb.put(data)
      )
    } else {
      return Observable.of(false);
    }

  }

  private saveGoldData(data): Observable<any> {

    let dateString = data.ratelist['@attributes'].updated;
    let dateFormat = "hh:mm:ss A DD/MM/YYYY"
    let unixTime = moment.utc(dateString, dateFormat).unix();
    // let unixTime = moment().unix();
    console.log("saveGoldData time : ", unixTime);
    if (unixTime && dateString) {
      data['_id'] = `${unixTime}`;
      return Observable.fromPromise(
        this._gpdb.put(data)
      )
    } else {
      return Observable.of(false);
    }
  }

}
