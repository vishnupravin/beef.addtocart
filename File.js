import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import React, {useEffect, useState} from 'react';

const File = ({navigation}) => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

  const Fetchdata = async () => {
    const res = await fetch(url);
    const res1 = await res.json();
    // dispatch({
    //   type :"addWholeData",
    //   payload :res1.categories
    // })
    setData(res1.categories);

    setLoading(false);
  };
  useEffect(() => {
    Fetchdata();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 50,
            fontWeight: 'bold',
            marginBottom: 40,
            color: 'orange',
          }}>
          Welcome
        </Text>
        {loading ? (
          <ActivityIndicator
            style={{flex: 1, alignContent: 'center'}}
            size="large"
            color="#ffff"
          />
        ) : (
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Beef', {cat: item.strCategory})
                  }
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                    borderWidth: 3,
                    borderRadius: 8,
                    borderColor: 'yellow',
                    marginLeft: 20,
                    marginRight: 20,
                  }}>
                  <View
                    style={{
                      flex: 0.5,
                      alignItems: 'flex-end',
                      backgroundColor: '#ffff',
                    }}>
                    <Image
                      source={{uri: item.strCategoryThumb}}
                      style={styles.logo}
                      resizeMode={'contain'}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#ffff',
                    }}>
                    <Text
                      style={{
                        color: 'orange',
                        textAlign: 'left',
                        fontSize: 20,
                        fontWeight: 900,
                        paddingLeft: 70,
                      }}>
                      {item.strCategory}
                    </Text>
                  </View>
                  {/* <View>
               <Text
               numberOfLines={1}
               style={{fontSize:3,backgroundColor:"black"}}
               >{item.strCategoryDescription}</Text>
               </View> */}
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = {
  container: {
    backgroundColor: 'red',
    textAlign: 'center',
    flex: 1,
  },
  logo: {
    width: 80,
    height: 75,
    marginLeft: 10,
  },
};

export default File;
