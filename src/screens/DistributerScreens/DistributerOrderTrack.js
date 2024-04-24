import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import color from '../../assets/theme/color';
import Header from '../../components/Header';

import {FONTS, SIZES} from '../../assets/theme/theme';

import {Divider} from 'react-native-paper';
import axios from 'axios';
import * as qs from 'qs';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import {API_URL} from '../../constants/Strings';
import BackButtonHeader from '../../components/BackButtonHeader';

export default function OrderTrackScreen({navigation, route}) {
  const {order_id} = route.params;
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderDetailItem, setOrderDetailItem] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [count, setCount] = useState();
  const [cartData, setCartData] = useState([]);
  const reduxUser = useSelector(state => state.user);

  const processOrderDetail = () => {
    var enquiryHeader = new Headers();
    enquiryHeader.append('accept', 'application/json');
    enquiryHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    enquiryHeader.append('Cookie', 'PHPSESSID=suum1ijkct2niss9cppuoem8v1');

    var enquiryFormData = qs.stringify({
      viewenquirydetail: '1',
      order_id: order_id,
    });
    axios
      .post(API_URL, enquiryFormData, {headers: enquiryHeader})
      .then(function (response) {
        console.log('enq ====>', response);
        if (response.data.success == 1) {
          setOrderDetail(response.data.data);
          setOrderDetailItem(response.data.data.item);
        }
      });
  };

  useEffect(() => {
    processOrderDetail();
    navigation.addListener('focus', () => processOrderDetail());
  }, []);

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

  const Date = orderDetail.order_date?.split(' ')[0];
  const time = orderDetail.order_date?.split(' ')[1];

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.ItemListView}>
        <View style={styles.imgTxtView}>
          <View style={styles.imgView}>
            <Image source={{uri: item.product_image}} style={styles.img} />
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: 'black',
                fontFamily: FONTS.primarytext2,
                marginBottom: 5,
              }}>
              Product Name:- {item.product_name}
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: FONTS.primarytext3,
                marginBottom: 5,
              }}>
              Product Id:- {item.proudct_id}
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: FONTS.primarytext3,
                marginBottom: 5,
              }}>
              Price:- €{item.price}
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: FONTS.primarytext3,
                marginBottom: 5,
              }}>
              Product Quantity:- {item.qty}
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: FONTS.primarytext3,
                marginBottom: 5,
              }}>
              SubTotal:- {item.subtotal}
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: FONTS.primarytext3,
                marginBottom: 5,
              }}>
              variants:- {item.variants}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <BackButtonHeader
        navigation={navigation}
        gotoCart={() => navigation.navigate('CheckoutStack')}
        cartCount={cartData == '' ? 0 : count}
      />

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.firstView}>
            <View style={styles.nameView}>
              <View style={styles.orderdtlView}>
                <View>
                  <Text style={styles.nameTxt}>Order Id</Text>
                  <Text style={styles.addrsTxt}>Date of order</Text>
                  <Text style={styles.addrsTxt}>Time of order</Text>
                  <Text style={styles.addrsTxt}>Address</Text>
                </View>
                <View style={{marginLeft: 30}}>
                  <Text style={styles.orderIdTxt}>{orderDetail.order_id}</Text>
                  <Text style={styles.addrsTxt}>{Date}</Text>
                  <Text style={styles.addrsTxt}>{time}</Text>
                  <Text style={styles.addrsTxt}>
                    {orderDetail.order_address}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <FlatList
            data={orderDetailItem}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          <Divider style={{borderWidth: 0.19, marginTop: SIZES.height / 25}} />
          <View style={styles.secondView}>
            <Text style={styles.timeTxt}>Grand Total</Text>
            <Text style={styles.priceTxt}>
              €{orderDetail.order_totle_price}
            </Text>
          </View>
          <Divider style={{borderWidth: 0.19, marginBottom: 30}} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.white,
  },
  firstView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomWidth: 0.4,
    borderBottomColor: color.black,
    paddingVertical: SIZES.height / 60,
    marginBottom: SIZES.height / 25,
  },

  imgView: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    overflow: 'hidden',
  },
  img: {
    height: SIZES.height / 9,
    width: SIZES.width / 5,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  nameView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // backgroundColor: "red",
    // paddingBottom: 20,
  },
  container: {
    // flex: 1,
    backgroundColor: color.white,
    borderRadius: 5,
    borderWidth: 0.5,
    borderBottomColor: color.black,
    padding: SIZES.base,
    marginTop: SIZES.height / 40,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  nameTxt: {
    fontSize: SIZES.h3 + 1,
    fontFamily: FONTS.primarytext2,
    color: color.black,
  },
  addrsTxt: {
    fontSize: SIZES.h3,
    color: color.black,
    fontFamily: FONTS.primarytext3,
  },

  timeView: {
    alignItems: 'flex-end',
    marginTop: 20,
    justifyContent: 'flex-start',
  },
  txt1: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.primarytext2,
    color: color.black,
    marginBottom: 5,
  },
  txt2: {
    fontSize: SIZES.h2 - 4,
    marginBottom: 5,
    fontFamily: FONTS.primarytext2,
  },
  txt3: {
    fontSize: SIZES.h3 - 3,
    fontFamily: FONTS.primarytext2,
  },
  paytypeView: {
    marginHorizontal: 10,
    marginTop: SIZES.height / 40,
    marginBottom: SIZES.height / 30,
  },
  payTxt: {
    fontSize: SIZES.h3 + 2,
    fontWeight: 'bold',
    color: color.black,
    marginBottom: 5,
    fontFamily: FONTS.primarytext2,
  },
  payTxt2: {
    fontSize: SIZES.h3 + 1,
  },
  addrsView: {
    marginHorizontal: 10,
    marginTop: SIZES.height / 40,
    marginBottom: SIZES.height / 30,
  },
  addrsTxt1: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    marginBottom: 5,
  },
  addrsTxt2: {
    color: color.light_grey,
  },
  secondView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: SIZES.height / 60,
    // borderBottomWidth: 0.3,
    // paddingBottom: 10,
    marginHorizontal: 10,
  },
  timeTxt: {
    fontSize: SIZES.h3 + 2,
    fontFamily: FONTS.primarytext2,
    color: 'green',
  },
  priceTxt: {
    fontFamily: FONTS.primarytext2,
    fontSize: SIZES.h3 + 2,
    color: color.light_grey,
  },
  orderdtlView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderIdTxt: {
    fontSize: SIZES.h3 + 1,
    fontFamily: FONTS.primarytext2,
    color: color.black,
  },
  ItemListView: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    paddingVertical: 10,
  },
  imgTxtView: {
    flexDirection: 'row',
    flex: 1,
    // backgroundColor: 'red',
    // paddingRight: 10,
  },
});
