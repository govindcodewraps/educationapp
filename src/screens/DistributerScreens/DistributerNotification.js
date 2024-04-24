import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import color from '../../assets/theme/color';
import {FONTS, SIZES} from '../../assets/theme/theme';
import HamburgerHeader from '../../components/HamburgerHeader';
import Header from '../../components/Header';
import Heading from '../../components/Heading';
import axios from 'axios';
import * as qs from 'qs';
import {API_URL} from '../../constants/Strings';
import {useSelector} from 'react-redux';
import BackButtonHeader from '../../components/BackButtonHeader';
export default function DistributerNotification({navigation}) {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [count, setCount] = useState();
  const [cartData, setCartData] = useState([]);
  const reduxUser = useSelector(state => state.user);

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
      <BackButtonHeader
        navigation={navigation}
        gotoCart={() => navigation.navigate('CheckoutStack')}
        cartCount={cartData == '' ? 0 : count}
      />
      <Heading HeadLine={'Notification'} />
      <View style={styles.offerMainView}>
        <View style={styles.txtView}>
          <Text style={styles.disTxt1}>Get 20 % OFF OFFERS</Text>
          <Text style={styles.disTxt2}>
            Lorem ipsum dolor sit amet consectetur. Aenean erat leo vitae
            facilisi ipsum neque pretium.
          </Text>
          <Text style={[styles.disTxt2, {fontSize: SIZES.h4 - 2}]}>
            18 hours ago
          </Text>
        </View>
        <View style={styles.imgView}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={require('../../assets/images/price-tag.png')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  headerView: {
    backgroundColor: color.dark_theme,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTxt: {
    color: color.white,
    fontFamily: FONTS.Rubik_Bold,
    fontSize: SIZES.h2 - 3,
  },
  offerMainView: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: color.light_bg2,
    paddingVertical: 10,
  },
  txtView: {
    flex: 0.8,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  disTxt1: {
    fontFamily: FONTS.primarytext2,
    color: color.black,
    fontSize: SIZES.h3,
    marginBottom: 10,
  },
  disTxt2: {
    textAlign: 'justify',
    fontFamily: FONTS.primarytext1,
    marginBottom: 10,
  },
  imgView: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: SIZES.height / 15,
    width: SIZES.width / 2,
  },
});
