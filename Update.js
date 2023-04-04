import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
let db = openDatabase({name: 'Data.db'});
const Update = () => {
  const route = useRoute();
  //   console.log(route.params.data);
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const editData = () => {
    if (name != '' && email != '' && address != '') {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE table_user set name=?, email=? , address=? where user_id=?',
          [name, email, address, route.params.data.id],
          (tx, results) => {
            // console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert('Success', 'User updated successfully', [
                {
                  text: 'Ok',   
                  onPress: () => navigation.navigate('Home'),
                },
              ]);
            } else Alert.alert('Update Failed');
          },
        );
      });
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
  };
  useEffect(() => {
    setName(route.params.data.name);
    setEmail(route.params.data.email);
    setAddress(route.params.data.address);
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: 'center',
          marginBottom: -60,
          fontSize: 50,
          fontWeight: 'bold',
          color: 'purple',
        }}>
        Update User
      </Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        style={[styles.input, {marginTop: 20}]}
      />
      <TextInput
        value={address}
        onChangeText={text => setAddress(text)}
        style={[styles.input, {marginTop: 20}]}
      />
      <TouchableOpacity style={styles.addBtn} onPress={editData}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Update;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 150,
  },
  input: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.3,
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
