import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';

import color from '../../assets/theme/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FONTS, SIZES} from '../../assets/theme/theme';
import VioletButton from '../../components/VioletButton';
import Heading from '../../components/Heading';
import {getAsyncData} from '../../utils';
import {API_URL, ASYNC_LOGIN_KEY} from '../../constants/Strings';
import axios from 'axios';
import * as qs from 'qs';
import {showMessage} from 'react-native-flash-message';
import {connect, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Divider} from 'react-native-paper';
import {storeCart} from '../../store/cart/cartAction';
import BackButtonHeader from '../../components/BackButtonHeader';
const CheckoutScreen = ({navigation, route, rdStoreCart}) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [grandTotal, setGrandTotal] = useState([]);
  const [emptydata, setEmptyData] = useState('');
  const [emptyMsg, setEmptyMsg] = useState('');
  const [count, setCount] = useState();

  const reduxUser = useSelector(state => state.user);
  // const reduxCart = useSelector(state => state.cart);
  // console.log('reduxCart', reduxCart);

  // console.log('userInfo', userInfo);
  // useEffect(() => {
  //   if (!infoLoaded) {
  //     getAsyncData(ASYNC_LOGIN_KEY).then(asUser => {
  //       console.log('AS', asUser);
  //       if (asUser != null) {
  //         var temp = JSON.parse(asUser);
  //         setUserInfo(temp);
  //       } else {
  //         console.log('notfound');
  //       }
  //     });
  //     setInfoLoaded(true);
  //   }
  // }, [infoLoaded]);

  // console.log('id', userInfo.id);

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
          console.log('cart res ===>', response);

          if (response.data.success == 1) {
            setCartData(response.data.data);
            setGrandTotal(response.data.total_price);
            setCount(response.data.total_product);
          } else {
            // setEmptyData(response.data.success);
            setEmptyMsg(response.data.message);
          }
        });
    }
  };

  useEffect(() => {
    processGetcartData();
    navigation.addListener('focus', () => processGetcartData());
  }, [cartData.length]);

  // const varients = cartData.map(ele => ele.variants);
  // console.log('var=====>', varients);

  const processDeleteItem = (product_id, variants) => {
    // console.log('var=====', variants);

    var deleteHeader = new Headers();
    deleteHeader.append('accept', 'application/json');
    deleteHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    deleteHeader.append('Cookie', 'PHPSESSID=suum1ijkct2niss9cppuoem8v1');

    // var deleteFormData = new FormData();

    // deleteFormData.append('removeformcart', 1);
    // deleteFormData.append('user_id', reduxUser.customer.id);
    // deleteFormData.append('product_id', product_id);

    var deleteFormData = qs.stringify({
      removeformcart: '1',
      user_id: reduxUser.customer.id,
      product_id: product_id,
      variants: variants,
    });

    console.log('dele', deleteFormData);

    axios
      .post(API_URL, deleteFormData, {headers: deleteHeader})
      .then(function (response) {
        // console.log('delete', response);

        if (response.data.success == 1) {
          const updatedCart = cartData.filter(
            item => (item.product_id != product_id, item.variants != variants),
          );
          setCartData(updatedCart);

          showMessage({
            message: 'success',
            description: response.data.message,
            type: 'default',
            backgroundColor: 'green',
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

  // const renderOrder = ({item, index}) => {
  //   return (
  //     <>
  //       <ScrollView style={{flex: 1}}>
  //         <View style={styles.mainView}>
  //           <View style={styles.imgView}>
  //             <Image
  //               resizeMode="contain"
  //               style={styles.img}
  //               source={{uri: item.product_image}}
  //             />
  //           </View>
  //           <View style={styles.dtlView}>
  //             <View
  //               style={{
  //                 flexDirection: 'row',
  //                 justifyContent: 'space-between',
  //                 alignItems: 'center',
  //                 marginVertical: SIZES.height / 64,
  //               }}>
  //               <View>
  //                 <Text style={styles.dogTxt}>{item.product_name}</Text>
  //                 <Text style={styles.dogTxt}>{item.variants}</Text>
  //               </View>
  //               <View style={styles.quantityView}>
  //                 {/* <TouchableOpacity>
  //                   <FontAwesome
  //                     name="minus-circle"
  //                     size={25}
  //                     color={color.black}
  //                   />
  //                 </TouchableOpacity> */}
  //                 <Text style={styles.txt2}>{item.qty}</Text>

  //                 <TouchableOpacity
  //                   onPress={() => processDeleteItem(item.product_id)}>
  //                   <Text style={{color: color.red, fontFamily: 'SemiBold'}}>
  //                     Remove
  //                   </Text>
  //                 </TouchableOpacity>
  //                 {/* <TouchableOpacity>
  //                   <FontAwesome
  //                     name="plus-circle"
  //                     size={25}
  //                     color={color.primary_color}
  //                   />
  //                 </TouchableOpacity> */}
  //               </View>
  //             </View>
  //             <View
  //               style={{
  //                 borderWidth: 0.3,
  //                 borderColor: color.light_grey,
  //               }}></View>
  //             <View
  //               style={{
  //                 flexDirection: 'row',
  //                 alignItems: 'center',
  //                 justifyContent: 'space-between',
  //                 marginVertical: SIZES.height / 64,
  //               }}>
  //               <Text style={styles.priceTxt}>{item.product_price}</Text>
  //               <Text style={styles.amountTxt}>{item.amount}</Text>
  //             </View>
  //           </View>
  //         </View>
  //       </ScrollView>
  //     </>
  //   );
  // };

  return (
    <View style={{flex: 1, backgroundColor: color.white}}>
      {/* <Header navigation={navigation} cartCount={cartData == '' ? 0 : count} /> */}
      <BackButtonHeader
        navigation={navigation}
        cartCount={cartData == '' ? 0 : count}
      />
      <Heading HeadLine={' CART'} />
      {cartData.length == 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: SIZES.h2,
              fontFamily: FONTS.primarytext2,
            }}>
            {emptyMsg}
          </Text>
        </View>
      ) : (
        <ScrollView>
          {cartData.map((item, index) => (
            // console.log('item', item),
            <View style={styles.mainView}>
              <View style={styles.imgView}>
                <Image
                  resizeMode="contain"
                  style={styles.img}
                  source={{uri: item.product_image}}
                />
              </View>
              <View style={styles.dtlView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: SIZES.height / 64,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flex: 1,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        // backgroundColor: 'red',
                      }}>
                      <Text style={styles.dogTxt}>{item.product_name}</Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          processDeleteItem(item.product_id, item.variants)
                        }>
                        <Text
                          style={{
                            color: color.red,
                            fontFamily: FONTS.primarytext3,
                          }}>
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <Divider />
                <View style={{justifyContent: 'center'}}>
                  <View style={styles.quantityView}>
                    <Text style={styles.priceTxt}>Price</Text>
                    <Text style={styles.priceTxt}>€{item.product_price}</Text>
                  </View>
                  <View style={styles.quantityView}>
                    <Text style={styles.priceTxt}>variant</Text>
                    <Text style={styles.priceTxt}>{item.variants}</Text>
                  </View>
                  <View style={styles.quantityView}>
                    <Text style={styles.priceTxt}>Quantity</Text>
                    <Text style={styles.priceTxt}>{item.qty}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {/* <View style={styles.totalView}>
        <Text style={styles.priceTxt}>Total(1 items)</Text>

        <Text style={styles.txt1}>Total(1 items)</Text>
      </View> */}
      {/* <View style={styles.totalView}>
        <Text style={styles.priceTxt}>Shipping</Text>

        <Text style={styles.amountTxt}>$5</Text>
      </View>
      <View style={styles.totalView}>
        <Text style={styles.priceTxt}>Taxes</Text>

        <Text style={styles.amountTxt}>$0.00</Text>
      </View> */}
      {/* <Divider style={{borderWidth: 1}} />
      <View style={styles.totalView}>
        <Text style={styles.priceTxt}>Grand Total</Text>

        <Text style={[styles.amountTxt, {color: color.black}]}>
          {grandTotal}
        </Text>
      </View> */}

      {cartData.length == 0 ? (
        <VioletButton
          buttonName={'SEND ENQUIRY'}
          disable={true}
          // onPress={processSubmitEnquiry}
          onPress={() =>
            navigation.navigate('SubmitEnqFormScreen', {grandTotal: grandTotal})
          }
        />
      ) : (
        <VioletButton
          buttonName={'SEND ENQUIRY'}
          // onPress={processSubmitEnquiry}
          onPress={() =>
            navigation.navigate('SubmitEnqFormScreen', {grandTotal: grandTotal})
          }
        />
      )}

      {/* <View style={styles.btnView2}>
        <TouchableOpacity style={styles.btn2}>
          <Text style={styles.btnTxt2}>CHECKOUT</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  view1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    // backgroundColor: 'red',
  },
  txt1: {
    fontWeight: '700',
    color: color.light_grey,
  },
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // paddingHorizontal: SIZES.base,
    marginTop: SIZES.height / 50,
    backgroundColor: color.gray2,
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: SIZES.width / 50,
    borderRadius: 5,
    paddingVertical: 10,
  },
  imgView: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 10,
    overflow: 'hidden',
    // backgroundColor: 'red',
    // borr,
  },
  img: {
    height: SIZES.height / 10,
    width: SIZES.width / 5,
    resizeMode: 'contain',
    borderRadius: 5,
  },
  dtlView: {
    flex: 1,
    paddingHorizontal: 10,
    // alignItems: "center",
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  quantityView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dogTxt: {
    fontSize: SIZES.h3 - 1,
    fontFamily: 'Montserrat-SemiBold',
    color: color.black,
  },
  txt2: {
    fontSize: SIZES.h2 - 3,
    marginHorizontal: SIZES.width / 64,
  },
  priceTxt: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.primarytext5,
    color: color.light_grey,
  },
  amountTxt: {
    color: color.light_grey,
    fontSize: SIZES.h3 + 2,
    fontWeight: '500',
  },
  totalView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.width / 40,
    paddingVertical: SIZES.width / 40,
    backgroundColor: color.white,
    borderBottomColor: color.black,
    borderBottomWidth: 0.2,
  },
});

const mapStateToProps = state => {
  return {
    reduxCart: state.cart,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    rdStoreCart: newCart => dispatch(storeCart(newCart)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen);
