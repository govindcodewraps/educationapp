import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import color from '../../assets/theme/color';
import {FONTS, SIZES} from '../../assets/theme/theme';
import HamburgerHeader from '../../components/HamburgerHeader';
import Header2 from '../../components/Header2';

export default function TrainerNotificationScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Header2 navigation={navigation} />
      <HamburgerHeader hamTitle={'Notification'} />
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
