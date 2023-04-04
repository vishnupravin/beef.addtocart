import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';

import {openDatabase} from 'react-native-sqlite-storage';

import {useNavigation} from '@react-navigation/native';

let db = openDatabase({name: 'Data.db'});

const AddUser = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(false);
  const saveUser = () => {
    // console.log(name, email, address);
    if (name != '' && email != '' && address != '') {
      setError(false);
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO table_user (name, email, address) VALUES (?,?,?)',
          [name, email, address],
          (tx, results) => {
            // console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'You are Registered Successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Home'),
                  },
                ],
                {cancelable: false},
              );
            } else Alert.alert('Registration Failed');
          },
        );
      });
    } else {
      setError(true);
    }
  };
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        (tx, res) => {
          // console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50), address VARCHAR(100))',
              [],
            );
          }
        },
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: 'center',
          marginBottom: -60,
          fontSize: 60,
          fontWeight: 'bold',
          color: 'purple',
        }}>
        SQLite
      </Text>
      <TextInput
        placeholder="Enter the Name"
        style={[styles.input, {borderColor: error ? 'red' : '#000',borderWidth:3}]}
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        placeholder="Enter the Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={[
          styles.input,
          {marginTop: 20},
          {borderColor: error ? 'red' : '#000',borderWidth:3},
        ]}
      />
      <TextInput
        placeholder="Enter the Address"
        value={address}
        onChangeText={text => setAddress(text)}
        style={[
          styles.input,
          {marginTop: 20},
          {borderColor: error ? 'red' : '#000',borderWidth:3},
        ]}
      />
      <TouchableOpacity style={styles.addBtn} onPress={saveUser}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 170,
  },
  input: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.9,
    alignSelf: 'center',
    paddingLeft: 20,
    marginTop: 100,
    backgroundColor: '#000',
  },
  addBtn: {
    backgroundColor: 'purple',
    width: '80%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  btnText: {
    color: '#ffff',
    fontSize: 18,
  },
});

export default AddUser;
