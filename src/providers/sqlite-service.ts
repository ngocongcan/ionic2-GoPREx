import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';
import * as moment from 'moment';


/*
  Generated class for the SqliteService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

const dbConfig = {
  name: '_goprex_draft.db',
  location: 'default'
}

@Injectable()
export class SqliteService {

  database: SQLiteObject;
  constructor(private sqlite: SQLite) {
    console.log('Hello SqliteService Provider');
    this.sqlite.create(dbConfig).then((db: SQLiteObject) => {
      this.database = db;
      db.executeSql("CREATE TABLE IF NOT EXISTS gold_price (id INTEGER PRIMARY KEY AUTOINCREMENT, datetime INTEGER, data TEXT)", {}).then((data) => {
        console.log('Executed SQL ', JSON.stringify(data));
        db.executeSql("CREATE TABLE IF NOT EXISTS rate_exchange (id INTEGER PRIMARY KEY AUTOINCREMENT, datetime INTEGER, data TEXT);", []).catch(err=>{

        })
      }).catch((err) => {
        console.log('Executed SQL error', JSON.stringify(err));
      });
    })
      .catch((err) => {
        console.log("SqliteService excuteSql error ", JSON.stringify(err));
      })

  }


  insertRateExchange(data: any) {
    let datetime = data.DateTime ? moment.utc(`${data.DateTime}`).format('MM/DD/YYYY HH:mm:ss') : null;
    if (datetime && this.database) {
      this.checkRateExchangeExist(datetime).then((res) => {
        if (res) {
          this.database.executeSql(`INSERT INTO rate_exchange (datetime, data) VALUES (${datetime}, ${data})`, []);

        }
      }).catch(err => {
        console.log("checkRateExchangeExist ", JSON.stringify(err));
      })
    }
    console.log("insertRateExchange : ", datetime);
  }

  insertGoldPrice(data: any) {
    let datetime = data.DateTime ? moment.utc(`${data.DateTime}`).format('MM/DD/YYYY HH:mm:ss') : null;
    if (datetime && this.database) {
      this.checkGoldPriceExist(datetime).then((res) => {
        if (res) {
          this.database.executeSql(`INSERT INTO gold_price (datetime, data) VALUES (${datetime}, ${data})`, []);

        }
      }).catch(err => {
        console.log("checkGoldPriceExist ", JSON.stringify(err));
      })
    }
    console.log("insertGoldPrice : ", datetime);
  }

  private checkGoldPriceExist(datetime: any): Promise<boolean> {
    return this.database.executeSql(`SELECT * FROM gold_price where datetime=${datetime} `, []).then((data) => {
      if (data.rows.length > 0) {
        return true;
      }
    }, (error) => {
      console.log("ERROR: " + JSON.stringify(error));
      return false;
    });
  }

  private checkRateExchangeExist(datetime: any): Promise<boolean> {
    return this.database.executeSql(`SELECT * FROM rate_exchange where datetime=${datetime} `, []).then((data) => {
      if (data.rows.length > 0) {
        return true;
      }
    }, (error) => {
      console.log("ERROR: " + JSON.stringify(error));
      return false;
    });
  }


}
