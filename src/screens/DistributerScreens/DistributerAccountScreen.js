import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import color from '../../assets/theme/color';
import {FONTS, SIZES} from '../../assets/theme/theme';
import BottomView from '../../components/bottom/BottomView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import axios from 'axios';
import * as qs from 'qs';
import {API_URL} from '../../constants/Strings';

export default function DistributerAccountScreen({navigation}) {
  const reduxUser = useSelector(state => state.user);

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [count, setCount] = useState();
  const [cartData, setCartData] = useState([]);
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
    <View style={styles.container}>
      <Header
        navigation={navigation}
        gotoCart={() => navigation.navigate('CheckoutStack')}
        cartCount={cartData == '' ? 0 : count}
      />
      <View style={styles.firstView}>
        <View style={styles.imgView}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={require('../../assets/images/logo.png')}
          />
        </View>
        <View style={styles.dtlView}>
          <Text style={styles.nameTxt}>{reduxUser.customer.name}</Text>
          <Text style={styles.mailTxt}>{reduxUser.customer.email}</Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DistributerProfile')}>
        <View style={styles.secondView}>
          <View style={styles.imgView2}>
            <Image
              style={styles.img}
              source={require('../../assets/images/bottom_bar/account.png')}
            />
          </View>
          <View style={styles.txtView}>
            <Text style={{fontFamily: FONTS.primarytext2}}>
              Profile Settings
            </Text>
            <Text style={{fontFamily: FONTS.primarytext1}}>
              Customize your account settings
            </Text>
          </View>
          <Ionicons name="chevron-forward" color={color.black} size={30} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DistributerAddress')}>
        <View style={styles.secondView}>
          <View style={styles.imgView2}>
            <Image
              style={styles.img}
              source={require('../../assets/images/bottom_bar/account.png')}
            />
          </View>
          <View style={styles.txtView}>
            <Text style={{fontFamily: FONTS.primarytext2}}>Address</Text>
            <Text style={{fontFamily: FONTS.primarytext1}}>
              Customize your Address
            </Text>
          </View>
          <Ionicons name="chevron-forward" color={color.black} size={30} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  firstView: {
    paddingVertical: SIZES.height / 20,
    backgroundColor: color.primary_color,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.white,
    height: SIZES.height / 8,
    width: SIZES.width / 4,
    borderRadius: 50,
  },
  img: {
    height: SIZES.height / 8,
    width: SIZES.width / 4,
  },
  dtlView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameTxt: {
    fontFamily: FONTS.primarytext2,
    color: color.white,
    fontSize: SIZES.h2 - 1,
    marginBottom: 5,
  },
  mailTxt: {
    color: color.white,
    fontFamily: FONTS.primarytext3,
  },
  secondView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: SIZES.width / 40,
    marginTop: SIZES.height / 40,
    elevation: 4,
    backgroundColor: color.white,
    paddingHorizontal: SIZES.width / 50,
    paddingVertical: SIZES.height / 40,
    borderRadius: 8,
  },
  imgView2: {
    // flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: SIZES.height / 20,
    width: SIZES.width / 10,
  },
  txtView: {
    flex: 0.9,
  },
});
