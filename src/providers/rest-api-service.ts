import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../app/app.config';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from './http-service';
import * as PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
/*
  Generated class for the RestAPIService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestAPIService extends HttpService {

  private rateExchangeData?: any;
  private goldPriceData?: any;

  private _db;
  private _birthdays;

  constructor(protected http: Http, protected config: AppConfig
    , protected storage: Storage) {
    super(http, config, storage);
    console.log('Hello RestAPIService Provider');
    this.initDB();
  }

  initDB() {
    PouchDB.plugin(cordovaSqlitePlugin);
    this._db = new PouchDB('_goprex.db', { adapter: 'cordova-sqlite' });
  }

  getGoldPriceData(): Observable<any> {
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

  getRateExchangeData(): Observable<any> {
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

  getAll(): Promise<any> {
    if (!this._birthdays) {
      return this._db.allDocs({ include_docs: true })
        .then(docs => {

          // Each row has a .doc object and we just want to send an 
          // array of birthday objects back to the calling controller,
          // so let's map the array to contain just the .doc objects.

          this._birthdays = docs.rows.map(row => {
            // Dates are not automatically converted from a string.
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });

          // Listen for changes on the database.
          this._db.changes({ live: true, since: 'now', include_docs: true })
            .on('change', this.onDatabaseChange);

          return this._birthdays;
        });
    } else {
      // Return cached data as a promise
      return Promise.resolve(this._birthdays);
    }
  }

  private onDatabaseChange = (change) => {
    var index = this.findIndex(this._birthdays, change.id);
    var birthday = this._birthdays[index];

    if (change.deleted) {
      if (birthday) {
        this._birthdays.splice(index, 1); // delete
      }
    } else {
      change.doc.Date = new Date(change.doc.Date);
      if (birthday && birthday._id === change.id) {
        this._birthdays[index] = change.doc; // update
      } else {
        this._birthdays.splice(index, 0, change.doc) // insert
      }
    }
  }

  // Binary search, the array is by default sorted by _id.
  private findIndex(array, id) {
    var low = 0, high = array.length, mid;
    while (low < high) {
      mid = (low + high) >>> 1;
      array[mid]._id < id ? low = mid + 1 : high = mid
    }
    return low;
  }

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
    this._db.post(res.data);
    return res.data;
  }

  private handleRateExchangeResponse(res) {
    console.log('handleRateExchangeResponse :', res);
    if (res.success) {
      this.rateExchangeData = res.data;
    }
    this._db.post(res.data);
    return res.data;
  }


}
