import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { AppConfig } from '../app/app.config';
import { Observable, Observer } from 'rxjs/Rx';
import * as _ from 'lodash';

/*
  Generated class for the BaseServiceTs provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export class HttpService {

  constructor(protected http: Http, protected config: AppConfig
    , protected storage: Storage) {
    console.log('Hello HttpService Provider');
  }

  protected getData(path: string): Observable<any> {
    return this.getToken()
      .flatMap((token) => this.getHeaders(token))
      .flatMap((options) => this.http.get(`${this.config.apiUrl}/${path}`, options))
      .map((res: Response) => res.json())
      .catch((err) => {
        console.error(`get api error`);
        return Observable.throw(err);
      });
  }

  protected postData(path: string, body?: any, headersPairs?: any): Observable<any> {
    return this.getToken()
      .flatMap((token) => this.getHeaders(token, headersPairs))
      .flatMap((options) => this.http.post(`${this.config.apiUrl}/${path}`, body, options))
      .map((res: Response) => res.json())
      .catch((err) => {
        console.error(`Post api error`);
        return Observable.throw(err);
      });
  }

  protected putData(path: string, body: any): Observable<any> {
    return this.getToken()
      .flatMap((token) => this.getHeaders(token))
      .flatMap((options) => this.http.put(`${this.config.apiUrl}/${path}`, body, options))
      .map((res: Response) => res.json())
      .catch((err) => {
        console.error(`Put api error`);
        return Observable.throw(err);
      });
  }

  private getToken(): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
      this.storage.get('access-token')
        .then((token: string) => {
          if (token) {
            observer.next(token);
            observer.complete();
          }
          observer.next(null);
          observer.complete();
        }).catch((err)=>{
          console.error(`getToken error`);
          return Observable.throw(err);
        });
    })
  }

  private getHeaders(token?: string, headersPairs?: any): Observable<RequestOptions> {
    return Observable.create((observer: Observer<RequestOptions>) => {
      const headers = new Headers();
      headers.append('api-key', this.config.apiKey);
      if (token) {
        headers.append('access-token', token);
      } else {
        token = "740802edc9f484c1d7728a94a2b7a49e2a83201b61dd936fb569b95f7f8a4e3c";
        headers.append('access-token', token);
      }
      headers.append('Content-Type', 'application/json');
      if (headersPairs) {
        _.forEach(headersPairs, (value, key) => {
          headers.append(key, value);
        })
      }
      let options = new RequestOptions({ headers });
      console.log(options);
      observer.next(options);
      observer.complete();
    })
  }
}
