import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler';

const Practice = () => {
   const [Data,setData]=useState([])
    
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const DataItems = async()=>{
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data);
        setData(data);
    }
 useEffect(() => {
    DataItems();
 },[])
  return (
    <View>
      <FlatList
      data={Data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item,index }) =>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text key={index}>{item.userId}</Text>
      <Text numberOfLines={1}>{item.title}</Text>
     </View>
    }
      />
    </View>
  )
}

export default Practice