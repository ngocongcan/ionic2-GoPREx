import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';

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

  private executeSql($sql: string){
    console.log("SqliteService excuteSql ", $sql);
    this.sqlite.create(dbConfig).then((db)=> {
      db.executeSql($sql, {}).then(()=> {
        console.log('Executed SQL');
        db.close();
      })
      .catch((err)=> {
        console.log('Executed SQL error', err);
      });
    })
    .catch((err)=> {
      console.log("SqliteService excuteSql error ", err);
    })
  }

}
