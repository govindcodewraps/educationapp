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
import axios from 'axios';
import * as qs from 'qs';
import {API_URL} from '../../constants/Strings';
import {useSelector} from 'react-redux';

export default function DistributerFavScreen({navigation}) {
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

  const data = [
    {
      id: '1',
      img: require('../../assets/images/product1.png'),
      productName: 'Bitch puppy Nikita',
      // breedType: "Kennel Esthund",
      price: '$599.99',
      disPrice: '$549.99',
    },
    {
      id: '2',
      img: require('../../assets/images/product2.png'),
      productName: 'Neudebri 1.2 Aspirant',
      // breedType: "Kennel Esthund",
      price: '$599.99',
      disPrice: '$549.99',
    },
    {
      id: '3',
      img: require('../../assets/images/product1.png'),
      productName: 'Bitch puppy Nikita',
      // breedType: "Kennel Esthund",
      price: '$599.99',
      disPrice: '$549.99',
    },
    {
      id: '4',
      img: require('../../assets/images/product2.png'),
      productName: 'Bitch puppy Nikita',
      // breedType: "Kennel Esthund",
      price: '$599.99',
      disPrice: '$549.99',
    },
    {
      id: '5',
      img: require('../../assets/images/product1.png'),
      productName: 'Neudebri 1.2 Aspirant',
      // breedType: "Kennel Esthund",
      price: '$599.99',
      disPrice: '$549.99',
    },
    {
      id: '6',
      img: require('../../assets/images/product2.png'),
      productName: 'Neudebri 1.2 Aspirant',
      // breedType: "Kennel Esthund",
      price: '$599.99',
      disPrice: '$549.99',
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.3}
          // onPress={() => navigation.navigate('ProductDetailScreen')}
        >
          <ProductCards
            img={item.img}
            productName={item.productName}
            price={item.price}
            disPrice={item.disPrice}
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
      <ScrollView style={{backgroundColor: color.white}}>
        <View>
          <View>
            <Heading HeadLine="FAVOURITE" />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FlatList
                data={data}
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
