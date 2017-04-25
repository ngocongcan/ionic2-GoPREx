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
  name: '_goprex.db',
  location: 'default'
}

@Injectable()
export class SqliteService {

  constructor(private sqlite: SQLite) {
    console.log('Hello SqliteService Provider');
  }

  createTables() {
    this.executeSql("CREATE TABLE IF NOT EXISTS rate-exchange (id INTEGER PRIMARY KEY AUTOINCREMENT, datetime INTEGER, data TEXT)");
    this.executeSql("CREATE TABLE IF NOT EXISTS gold-price (id INTEGER PRIMARY KEY AUTOINCREMENT, datetime INTEGER, data TEXT)");

  }



  insertRateExchange(data: any) {
    let datetime = data.DateTime ? moment.utc(`${data.DateTime}`).format('MM/DD/YYYY HH:mm:ss') : null;
    if (datetime) {
      this.executeSql(`INSERT INTO rate-exchange (datetime, data) VALUES (${datetime}, ${data})`);
    }
    console.log("insertRateExchange : ", datetime);
  }

  insertGoldPrice(data: any) {
    this.executeSql("INSERT INTO gold-price (datetime, data) VALUES ('Nic', 'Raboy')");
  }


  private executeSql($sql: string) {
    console.log("SqliteService excuteSql ", $sql);
    this.sqlite.create(dbConfig).then((db) => {
      db.executeSql($sql, {}).then((data) => {
        console.log('Executed SQL ', data);
        db.close();
      })
        .catch((err) => {
          console.log('Executed SQL error', err);
        });
    })
      .catch((err) => {
        console.log("SqliteService excuteSql error ", err);
      })
  }

}
