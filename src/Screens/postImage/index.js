import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function postImage({navigation,route}) {
  const [data, setdata] = useState({
    name: '',
    last: '',
    phone: '',
    email: '',
  });
  const submitData = async () => {
    let form = new FormData();
    form.append('first_name', data?.name);
    form.append('last_name', data?.last);
    form.append('email', data?.email);
    form.append('phone', data?.phone);
    form.append('user_image', {
      uri: route?.params?.images?.xt_image,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    console.log(form);
    axios
      .post('http://dev3.xicom.us/xttest/savedata.php', form, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(data => {
        setdata({
            name:'',
            last:'',
            email:'',
            phone:'',

        })
        if (data?.data?.status == 'failed'){
            Alert.alert('','Failed')
        }else {
            Alert.alert('','User has been saved successfully')
            navigation.goBack();
        }
        console.log(data?.data)
    })
      .catch(e => console.log(e));
  };
  return (
    <View>
        <ScrollView>
      <Image
        source={{uri: route?.params?.images?.xt_image}}
        style={{width: 400, height: 400, alignSelf: 'center', marginTop: 20}}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '600'}}>
          Name
        </Text>
        <TextInput
          placeholder="Enter the name"
          onChangeText={(text)=>setdata({...data,name:text})}
          value = {data.name}
          style={{borderWidth: 1, width: 200, padding: 10, color: 'black'}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
       
          marginHorizontal: 20,
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '600'}}>
          Last
        </Text>
        <TextInput
          placeholder="Enter the last name"
          onChangeText={(text)=>setdata({...data,last:text})}
          value = {data.last}
          style={{borderWidth: 1, width: 200, padding: 10, color: 'black'}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '600'}}>
          Phone
        </Text>
        <TextInput
          placeholder="Enter the phone"
          onChangeText={(text)=>setdata({...data,phone:text})}
          value = {data.phone}
          style={{borderWidth: 1, width: 200, padding: 10, color: 'black'}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '600'}}>
          email
        </Text>
        <TextInput
          placeholder="Enter the Email"
          onChangeText={(text)=>setdata({...data,email:text})}
          value = {data.email}
          style={{borderWidth: 1, width: 200, padding: 10, color: 'black'}}
        />
      </View>
      <TouchableOpacity
        style={{
          borderRadius: 3,
          borderWidth: 1,
          padding: 20,
          marginLeft: 211,
          marginRight: 20,
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={()=>submitData()}
        >
        <Text style={{fontSize: 20, color: 'black', fontWeight: '600'}}>
          Submit
        </Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
