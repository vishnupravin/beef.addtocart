import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';

let db = openDatabase({name: 'test.db', location: 'default'});

// export const getDBConnection = async () => {
//   return openDatabase({name: 'test.db', location: 'default'});
// };

const Sql = () => {
  useEffect(() => {
    CreateTable();
    InsertItem();
    UpdateItem();
    DeleteItem();
    GetItem();
  }, []);

  // export const Sql = async () => {
  //   await CreateTable();

  const CreateTable = ()=>{
    let details = db.executeSql(
      `create table if not exists ${details} (id INTEGER PRIMARY KEY ,item_id TEXT,category TEXT,item_name TEXT, price TEXT,qty TEXT,image TEXT,,total TEXT )`,
      [],
    );
    // console.log(details);
  };

  const InsertItem = async (
    item_id,
    category,
    item_name,
    price,
    qty,
    total,
    image,
  ) => {
    // console.log(item_id, category, item_name, price, qty, total, image);
    await db.executeSql(
      "INSERT INTO details (item_id,category,item_name, price, qty, image,total)VALUES ('" +
        item_id +
        "','" +
        category +
        "','" +
        item_name +
        "','" +
        price +
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
  };
   
  const UpdateItem = async (
    item_id,
    category,
    item_name,
    price,
    qty,
    total,
    image,
  ) => {
    // console.log(item_id, category, item_name, price, qty, total, image);
    await db.executeSql(
      "UPDATE details SET category='" +
        category +
        "',item_name='" +
        item_name +
        "',price='" +
        price +
        "',qty='" +
        qty +
        "',image='" +
        image +
        "',total='" +
        total +
        "' WHERE item_id='" +
        item_id +
        "'",
      [],
    );
  };
  


  const DeleteItem = async item_id => {
    // console.log(item_id);
    await db.executeSql(
      "DELETE FROM details WHERE item_id='" + item_id + "'",
      [],
    );
  };

  const GetItem = async item_id => {
    // console.log(item_id);
    await db.executeSql(
      "SELECT * FROM details WHERE item_id='" + item_id + "'",
      [],
    );
  };

  return (
    <View
      style={{
        paddingTop: 20,
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <TouchableOpacity>
        <Text style={{color: '#000', fontWeight: 'bold', fontSize: 50}}>
          Click
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Sql;
