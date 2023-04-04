import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteItem, RemoveFromCart} from '../Redux/Action';
const AddToCart = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const cart = useSelector(state => state.cart);
  // console.log(cart);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <View
        style={{
          height: 80,
          alignItems: 'center',
          borderColor: 'yellow',
          borderBottomWidth: 5,
        }}>
        <Text
          style={{
            fontSize: 40,
            color: 'orange',
            fontWeight: 'bold',
            paddingTop: 10,
          }}>
          Your Cart
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 40,
          marginLeft: 30,
        }}>
        <FlatList
          data={cart}
          refreshing={refresh}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                margin: 10,
              }}>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Image
                  source={{uri: item.strMealThumb}}
                  style={{width: 70, height: 50, borderRadius: 10}}
                  resizeMode={'cover'}
                />
              </View>
              <View style={{flex: 0.6, justifyContent: 'center'}}>
                <Text
                  style={{fontSize: 20, color: 'orange', fontWeight: 'bold'}}>
                  {item.strMeal}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.1,
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 20, color: 'orange'}}>{item.qty}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setRefresh(!refresh);
                  dispatch(deleteItem({item}));
                }}
                style={{justifyContent: 'center'}}>
                <Text
                  style={{color: '#ffff', fontSize: 16, fontWeight: 'bold'}}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
        {/* <Text style={{fontSize: 25, color: 'orange',paddingRight:15}}>
        Total Items : {`${cart.length}`}
      </Text> */}
      </View>
    </SafeAreaView>
  );
};

export default AddToCart;
