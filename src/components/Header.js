import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState, useEffect} from 'react';
import color from '../assets/theme/color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SIZES} from '../assets/theme/theme';
import axios from 'axios';
import * as qs from 'qs';
import {useSelector} from 'react-redux';
import {API_URL} from '../constants/Strings';

export default function Header({navigation, onPress, gotoCart, cartCount}) {
  // const {select_type} = route.params;
  // console.log('Sele', select_type);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [cartData, setCartData] = useState([]);
  const reduxUser = useSelector(state => state.user);
  // const reduxCart = useSelector(state => state.cart);

  // const processGetcartData = () => {
  //   var getcartHeader = new Headers();
  //   getcartHeader.append('accept', 'application/json');
  //   getcartHeader.append('Content-Type', 'application/x-www-form-urlencoded');
  //   getcartHeader.append('Cookie', 'PHPSESSID=suum1ijkct2niss9cppuoem8v1');

  //   var getcartFormdata = qs.stringify({
  //     viewcart: '1',
  //     user_id: reduxUser.customer.id,
  //   });

  //   if (!isDataLoaded) {
  //     axios
  //       .post(API_URL, getcartFormdata, {headers: getcartHeader})
  //       .then(function (response) {
  //         console.log('cart res ===>', response.data.data);

  //         if (response.data.success == 1) {
  //           setCartData(response.data.data);
  //         } else {
  //           // setEmptyData(response.data.success);
  //           // setEmptyMsg(response.data.message);
  //         }
  //       });
  //   }
  // };
  // console.log('cartdata', cartData.length);

  // useEffect(() => {
  //   processGetcartData();
  //   navigation.addListener('focus', () => processGetcartData());
  // }, [cartData.length]);

  return (
    <View style={styles.head_container}>
      <View
        style={{
          position: 'absolute',
          right: 60,
          top: 12,
          backgroundColor: color.dark_theme,
          height: 20,
          width: 20,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}>
        <Text
          style={{
            fontFamily: 'RobotoSemi',
            fontSize: SIZES.h4 - 4,
            color: color.white,
          }}>
          {cartCount}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}>
        <Ionicons name="md-menu" size={35} color={color.primary_color} />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: SIZES.width / 10,
          // backgroundColor: 'red',
        }}>
        <Image
          style={styles.logo}
          source={require('../assets/images/logo1.png')}
        />
      </View>
      <View
        style={{
          flex: 0.6,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <TouchableOpacity style={{marginLeft: 10}} onPress={gotoCart}>
          <Ionicons name="ios-cart" size={30} color={color.primary_color} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DistributerNotification')}>
          <Ionicons
            name="ios-notifications"
            size={30}
            color={color.primary_color}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  head_container: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // backgroundColor: color.white,
    // paddingVertical: 10,
    // alignItems: 'center',
    // paddingLeft: 10,
    // paddingRight: 10,
    // elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#DADADA',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: color.white,
    paddingVertical: 5,
  },
  logo: {
    // backgroundColor: 'blue',
    height: SIZES.height / 12,
    width: SIZES.width / 2,
    resizeMode: 'cover',
  },
});
