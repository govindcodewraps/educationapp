import React, {useState, useEffect} from 'react';

import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import color from '../../assets/theme/color';
import {FONTS, SIZES} from '../../assets/theme/theme';
import HamburgerHeader from '../../components/HamburgerHeader';
import Header from '../../components/Header';
import axios from 'axios';
import {API_URL} from '../../constants/Strings';
import * as qs from 'qs';
import {useSelector} from 'react-redux';

export default function DistributerAboutUs({navigation}) {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [aboutusContent, setAboutusContent] = useState('');
  const [count, setCount] = useState();
  const [cartData, setCartData] = useState([]);
  const reduxUser = useSelector(state => state.user);

  useEffect(() => {
    var aboutHeader = new Headers();
    aboutHeader.append('accept', 'application/json');
    aboutHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    aboutHeader.append('Cookie', 'PHPSESSID=vlr3nr52586op1m8ie625ror6b');

    var aboutData = qs.stringify({
      get_content: '1',
      page_name: 'About-us',
      // lang_id: "1",
    });

    // var aboutData = new FormData();

    // aboutData.append('get_content', 1);
    // aboutData.append('page_name', 'About-us');

    axios
      .post(API_URL, aboutData, {
        headers: aboutHeader,
      })
      .then(function (response) {
        if (response.data.success == 1) {
          setIsDataLoaded(true);
          setAboutusContent(response.data.data);
        }
      });
  }, []);

  console.log(aboutusContent);

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
      <HamburgerHeader hamTitle={aboutusContent.title} />
      <ScrollView>
        <View style={styles.AboutTxtView}>
          <Text style={styles.aboutTxt}>
            WHY WOUND DEBRIDEMENT IS NECESSARY
          </Text>
          <Text style={styles.txt2}>{aboutusContent.content}</Text>

          <Text style={styles.aboutTxt}>How did neudebri came up?</Text>
          <Text style={styles.txt2}>{aboutusContent.content}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  headerView: {
    backgroundColor: color.primary_color,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTxt: {
    color: color.white,
    fontFamily: FONTS.Rubik_Bold,
    fontSize: SIZES.h2 - 3,
  },
  AboutTxtView: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  aboutTxt: {
    fontFamily: FONTS.primarytext2,
    fontSize: SIZES.h3 - 1,
    color: color.dark_theme,
    marginVertical: 20,
  },
  txt2: {
    fontFamily: FONTS.primarytext1,
    fontSize: SIZES.h3,
    textAlign: 'justify',
  },
});
