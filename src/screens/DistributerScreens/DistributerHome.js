import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import color from '../../assets/theme/color';
import Header from '../../components/Header';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Heading from '../../components/Heading';

import {SIZES} from '../../assets/theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Carousel from '../../components/Carousel';
import ProductCards from '../../components/ProductCards';
import {getAsyncData} from '../../utils';
import {API_URL, ASYNC_LOGIN_KEY} from '../../constants/Strings';
import axios from 'axios';
import * as qs from 'qs';
import {useSelector} from 'react-redux';
export default function Home({navigation, route}) {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState();

  const [products, setProducts] = useState([]);
  const [count, setCount] = useState();
  const [cartData, setCartData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const reduxUser = useSelector(state => state.user);

  console.log('asyncdata', userInfo);
  useEffect(() => {
    if (!infoLoaded) {
      getAsyncData(ASYNC_LOGIN_KEY).then(asUser => {
        console.log('AS', asUser);
        if (asUser != null) {
          var temp = JSON.parse(asUser);
          setUserInfo(temp);
        } else {
          console.log('notfound');
        }
      });
      setInfoLoaded(true);
    }
  }, [infoLoaded]);

  const processgetHomeData = () => {
    axios
      .get('https://neumedis.myshopify.com/admin/api/2022-10/products.json', {
        headers: {
          Authorization:
            'Basic MjRmMWJiMjQyNTNmOGVkMDNjNmFmY2VkMmVkMDVhY2M6c2hwYXRfMjgzZTZiNjMyOWIwOWM1OTI1YTkyOWNlMTczOTViNWQ=',
        },
      })
      .then(function (res) {
         console.log(res);
        setProducts(res.data.products);
      })
      .catch(function (err) {
        console.log('err', err);
      });
  };

  console.log('products', products);
  useEffect(() => {
    processgetHomeData();
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

  const renderItem = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() =>
            navigation.navigate('ProductDetailScreen', {
              id: item.id,
            })
          }>
          <ProductCards
            img={{
              uri: item.image == null ? item.image : item.image.src,
            }}
            productName={item.title}
            // price={item.id}
            // disPrice={item.disPrice}
          />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={color.primary_color} />

      <Header
        navigation={navigation}
        gotoCart={() => navigation.navigate('CheckoutStack')}
        cartCount={cartData == '' ? 0 : count}
      />
      <ScrollView style={{backgroundColor: color.white, flex: 1}}>
        <View>
          <Carousel />

          <View>
            <Heading HeadLine="PRODUCTS" />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FlatList
                data={products}
                keyExtractor={(item, index) => item.id}
                renderItem={renderItem}
                numColumns={2}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: SIZES.h2 - 4,
    marginTop: 20,
    color: color.text_primary,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  imageView: {
    borderWidth: 1,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    borderColor: color.text_primary,
  },
  image: {
    height: hp(4),
    width: hp(4),
  },
  TextView: {
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  ShowAll: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 30,
  },
  // ButtonBox: {
  //   backgroundColor: "red",
  //   flex: 1,
  //   // position: "absolute",
  //   // flexDirection: "row",
  //   // right: ,
  //   // justifyContent: "space-between",
  //   width: wp(20),
  //   padding: wp(2),
  // },
});
