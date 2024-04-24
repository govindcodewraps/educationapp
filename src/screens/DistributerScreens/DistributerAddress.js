import {View, Text, StatusBar, StyleSheet, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import color from '../../assets/theme/color';
import Header from '../../components/Header';
import UserAddress from '../../components/UserAddress';
import VioletButton from '../../components/VioletButton';
import Heading from '../../components/Heading';
import {Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import * as qs from 'qs';
import axios from 'axios';
import {API_URL} from '../../constants/Strings';
import {showMessage} from 'react-native-flash-message';
import BackButtonHeader from '../../components/BackButtonHeader';

export default function DistributerAddress({navigation}) {
  const reduxUser = useSelector(state => state.user);

  const [userId, setUserId] = useState(reduxUser.customer.id);
  const [addressData, setAddressData] = useState([]);
  const [count, setCount] = useState();
  const [cartData, setCartData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const processGetAddress = () => {
    var addressHeader = new Headers();
    addressHeader.append('accept', 'application/json');
    addressHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    addressHeader.append('Cookie', 'PHPSESSID=6364j4i683c7ru018p0rtl30mj');

    var addressData = qs.stringify({
      addresslist: '1',
      user_id: userId,
    });

    axios
      .post(API_URL, addressData, {headers: addressHeader})
      .then(function (response) {
        console.log('addresslist', response);
        if (response.data.success == 1) {
          setAddressData(response.data.data);
        }
      });
  };

  useEffect(() => {
    processGetAddress();
    navigation.addListener('focus', () => processGetAddress());
  }, []);

  const processDeleteAddress = id => {
    var deleteHeader = new Headers();
    deleteHeader.append('accept', 'application/json');
    deleteHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    deleteHeader.append('Cookie', 'PHPSESSID=vlr3nr52586op1m8ie625ror6b');

    var deleteData = qs.stringify({
      deleteaddress: '1',
      address_id: id,
      user_id: userId,
    });

    axios
      .post(API_URL, deleteData, {headers: deleteHeader})
      .then(function (response) {
        if (response.data.success == 1) {
          const updatedAdd = addressData.filter(item => item.id != id);
          setAddressData(updatedAdd);
          showMessage({
            message: 'success',
            description: response.data.message,
            type: 'default',
            backgroundColor: 'red',
          });
        } else {
          showMessage({
            message: 'Fail',
            description: response.data.message,
            type: 'default',
            backgroundColor: 'red',
          });
        }
      })
      .catch(error => console.log('error', error));
  };

  const processGetcartData = () => {
    var getcartHeader = new Headers();
    getcartHeader.append('accept', 'application/json');
    getcartHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    getcartHeader.append('Cookie', 'PHPSESSID=suum1ijkct2niss9cppuoem8v1');

    var getcartFormdata = qs.stringify({
      viewcart: '1',
      user_id: reduxUser.customer.id,
    });

    if (!isDataLoaded) {
      axios
        .post(API_URL, getcartFormdata, {headers: getcartHeader})
        .then(function (response) {
          console.log('cart res ===||==', response);

          if (response.data.success == 0) {
            setCount(response.data.total_product);
          }
          setCartData(response.data.data);
          setCount(response.data.total_product);
        });
    }
  };
  console.log('count', count);

  useEffect(() => {
    processGetcartData();
    navigation.addListener('focus', () => processGetcartData());
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: color.white}}>
      <StatusBar backgroundColor={color.primary_color} />
      <BackButtonHeader
        navigation={navigation}
        gotoCart={() => navigation.navigate('CheckoutStack')}
        cartCount={cartData == '' ? 0 : count}
      />
      <Heading HeadLine={'MY ADDRESS'} />
      {/* <View style={{marginTop: 10}}> */}
      <ScrollView>
        {addressData.map((item, index) => (
          <View style={{marginTop: 10}}>
            {item.place == '1' && (
              <UserAddress
                Address={item.address}
                country={item.country}
                province={item.province}
                city={item.city}
                postcode={item.postcode}
                Place={'Home'}
                deleteOnPress={() => processDeleteAddress(item.id)}
                onPress={() =>
                  navigation.navigate('DistributerUpdateAddress', {
                    addressData: addressData[index],
                  })
                }
              />
            )}

            {/* <Divider style={{ marginHorizontal: 20, marginVertical: 10 }} /> */}
            {item.place == '2' && (
              <UserAddress
                Address={item.address}
                country={item.country}
                province={item.province}
                city={item.city}
                postcode={item.postcode}
                Place={'Others'}
                deleteOnPress={() => processDeleteAddress(item.id)}
                onPress={() =>
                  navigation.navigate('DistributerUpdateAddress', {
                    addressData: addressData[index],
                  })
                }
              />
            )}
            <Divider style={{marginHorizontal: 20, marginVertical: 10}} />
          </View>
        ))}
      </ScrollView>
      {/* <Divider style={{marginHorizontal: 20, marginVertical: 10}} /> */}
      <View style={styles.Button}>
        <VioletButton
          buttonName={'Add New Address'}
          onPress={() => navigation.navigate('DistributerAddAddress')}
        />
      </View>
    </View>
    // </View>
  );
}
const styles = StyleSheet.create({
  Button: {
    // paddingTop: 50,
    marginHorizontal: 40,
    marginVertical: 10,
  },
});
