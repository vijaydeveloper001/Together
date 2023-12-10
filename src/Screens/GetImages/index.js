import {FlatList, StyleSheet, Text, View,Image, TouchableOpacity} from 'react-native';
import React, {useEffect,useState} from 'react';
import axios from 'axios';

export function GetImages({navigation}) {
    const [data, setdata] = useState({
        data:[]
    })
  const fetchdata = async () => {
    let form = new FormData();
    form.append('user_id', 108);
    form.append('offset', 0);
    form.append('type', 'popular');
    console.log(form);
     axios
      .post(
        'http://dev3.xicom.us/xttest/getdata.php',
       form,{
        headers:{
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        }
       }
      )
      .then(data => setdata({data:data?.data?.images}))
      .catch(e => console.log(e));
  };
  useEffect(() => {
    fetchdata();
  }, []);
  console.log(JSON.stringify(data))
  const renderItem = ({item,index}) =>{
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('postImages',{images:data?.data[index]})}>
            <Image source = {{uri:item?.xt_image}} style = {{width:300,height:300,marginTop:20,alignSelf:'center'}}/>
        </TouchableOpacity>
    )
  }
  return (
    <View>
      
      <FlatList
      data={data?.data}
      renderItem={renderItem}
      contentContainerStyle = {{paddingBottom:20}}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
