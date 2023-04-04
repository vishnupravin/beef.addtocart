import {openDatabase} from 'react-native-sqlite-storage';

let db = openDatabase({name: 'test.db', location: 'default'});
export default class sqlite {
  ExecuteQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.transaction(trans => {
        trans.executeSql(
          sql,
          params,
          (trans, results) => {
            resolve(results);
          },
          error => {
            reject(error);
          },
        );
      });
    });
  };
  CreateTable() {
    this.ExecuteQuery(
      'create table if not exists details (id INTEGER PRIMARY KEY ,item_id TEXT,category TEXT,item_name TEXT, price TEXT,qty TEXT,image TEXT,total TEXT )',
      [],
    ).then(res => console.log(res));
  }

  InsertItem(item_id, category, item_name, price, qty, total, image) {
    this.ExecuteQuery(
      "INSERT INTO details (item_id,category,item_name, price, qty, image,total)VALUES ('" +
        item_id +
        "','" +
        category +
        "','" +
        item_name +
        "','" +
        price +
        "','" +
        qty +
        "','" +
        image +
        "','" +
        total +
        "')",
      [],
    );
  }

  UpdateItem(item_id, qty, total) {
    this.ExecuteQuery(
      "UPDATE details SET qty='" +
        qty +
        "',total='" +
        total +
        "' WHERE item_id='" +
        item_id +
        "'",
      [],
    );
  }

  DeleteItem(item_id) {
    this.ExecuteQuery(
      "DELETE FROM details WHERE item_id='" +
        item_id +
        "'",
      [],
    );
  }

  GetItem(item_id) {
    this.ExecuteQuery(
        "SELECT * FROM details WHERE item_id='" +
          item_id +
          "'",
      [],);
  }
}
