import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  AddItem,
  AddTotalItem,
  addWholeData,
  DECREMENT_COUNT,
  INCREMENT_COUNT,
} from '../Redux/Action';
import Fonts from 'react-native-vector-icons/FontAwesome';

const Beef = ({navigation, route}) => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.data);
  const Data = useSelector(state => state.count);
  const cart = useSelector(state => state.cart);

  const [count, setCount] = useState(false);
  const [loading, setLoading] = useState(true);
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${route.params.cat}`;

  const InsideWholeData = async () => {
    const res = await fetch(url);
    const res1 = await res.json();

    dispatch(addWholeData(res1.meals));

    setLoading(false);
  };

  useEffect(() => {
    InsideWholeData();
    // const Pagerefresh = navigation.addListener('focus', () => {
    //   // Screen was focused
    //   // Do something
    //   InsideWholeData();
      
    // });
  

   
  }, []);
  const increment = (index, qty = 1) => {
    setCount(!count);
    dispatch(AddItem({index, qty}));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 50,
              fontWeight: 'bold',
              marginBottom: 20,
              color: 'orange',
            }}>
            Food Items
          </Text>
       <View>
        <Fonts 
        name="eur"
        size={80}
        color="red"
        />
       </View>
        
        </View>

        {loading ? (
          <ActivityIndicator
            style={{flex: 1, alignContent: 'center'}}
            size="large"
            color="black"
          />
        ) : (
          <FlatList
            data={counter}
            showsVerticalScrollIndicator={false}
            refreshing={count}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                    marginLeft: 20,
                    marginRight: 20,
                    borderWidth: 3,
                    borderRadius: 8,
                    borderColor: 'yellow',
                  }}>
                  <View
                    style={{
                      flex: 0.5,
                      alignItems: 'center',
                      backgroundColor: '#ffff',
                    }}>
                    <Image
                      source={{uri: item.strMealThumb}}
                      style={styles.logo}
                      resizeMode={'contain'}
                    />
                    {item.qty > 0 ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                          alignItems: 'center',
                          marginVertical: 5,
                          elevation: 10,
                          width: 80,
                          backgroundColor: 'white',
                          height: 25,
                          marginLeft: 12,
                          borderRadius: 3,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            dispatch(DECREMENT_COUNT());
                            increment(index, item.qty - 1);
                          }}>
                          <Text
                            style={{
                              fontSize: 30,
                              color: 'orange',
                              fontSize: 30,
                              marginTop: -8,
                              width: 10,
                            }}>
                            -
                          </Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 20, color: 'orange'}}>
                          {item.qty}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            dispatch(INCREMENT_COUNT());
                            increment(index, item.qty + 1);
                          }}>
                          <Text
                            style={{
                              fontSize: 25,
                              marginTop: -4,
                              color: 'orange',
                            }}>
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#fff',
                            borderRadius: 3,
                            width: 85,
                            marginLeft: 10,
                            // width: Math.round(Dimensions.get('screen').width) / 5,
                            marginTop: -5,
                            elevation: 10,
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          onPress={() => {
                            dispatch(INCREMENT_COUNT());
                            increment(index);
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              color: 'orange',
                              fontWeight: 500,
                              fontSize: 17,
                            }}>
                            ADD
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
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
                        fontSize: 18,
                        fontWeight: 500,
                      }}>
                      {item.strMeal}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        )}
        {Data >= 1 && (
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 20,
              height: 80,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingRight: 40,
              borderColor: 'yellow',
              borderTopWidth: 8,
            }}>
            <Text
              style={{
                fontSize: 30,
                color: 'orange',
                paddingLeft: 10,
                paddingBottom: 10,
                fontWeight: 'bold',
              }}>
              Total Items : {`${cart.length}`}
              {/* {`\u20B9 `} */}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddToCart', {cart})}>
              {/* <Icon 
              name='shopping-cart'
               size={30}
              /> */}
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  paddingRight: -15,
                  color: 'orange',
                  paddingBottom: 10,
                }}>
                View Cart
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#000',
    textAlign: 'center',
  
  },
  logo: {
    width: 90,
    height: 65,
    marginLeft: 10,
    borderRadius: 20,
  },
};

export default Beef;
