import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import color from '../../assets/theme/color';
import {FONTS, SIZES} from '../../assets/theme/theme';
import BottomView from '../../components/bottom/BottomView';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PremiumAccounts({navigation}) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.firstView}>
        <View style={styles.imgView}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={require('../../assets/images/logo.png')}
          />
        </View>
        <View style={styles.dtlView}>
          <Text style={styles.nameTxt}>Deepak</Text>
          <Text style={styles.mailTxt}>Deepak.idigitalweb@gmail.com</Text>
        </View>
      </View>
      <View style={styles.middleView}>
        <TouchableOpacity onPress={() => navigation.navigate('PremiumProfile')}>
          <View style={styles.innerView}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesome5 name="user-alt" color={color.black} size={35} />
            </View>
            <View
              style={{
                flex: 0.9,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <Text style={styles.txt}>Profile Settings</Text>
              <Text>Customize your account settings</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons
                name="chevron-forward-outline"
                color={color.light_grey}
                size={20}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PremiumPayment')}>
          <View style={styles.innerView}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesome5 name="credit-card" color={color.black} size={30} />
            </View>
            <View
              style={{
                flex: 0.9,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <Text style={styles.txt}>Payments</Text>
              <Text>Customize your Address</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons
                name="chevron-forward-outline"
                color={color.light_grey}
                size={20}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PremiumHistory')}>
          <View style={styles.innerView}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesome5 name="history" color={color.black} size={30} />
            </View>
            <View
              style={{
                flex: 0.9,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <Text style={styles.txt}>History</Text>
              <Text>View your history</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons
                name="chevron-forward-outline"
                color={color.light_grey}
                size={20}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {/* <BottomView /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  firstView: {
    flex: 1,
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
    fontFamily: FONTS.Rubik_Bold,
    color: color.white,
    fontSize: SIZES.h2 - 1,
    marginBottom: 5,
  },
  mailTxt: {
    color: color.white,
    fontFamily: FONTS.Rubik_medium,
  },
  middleView: {
    flex: 1,

    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // marginHorizontal: 20,
    // backgroundColor: color.white,
    // paddingVertical: 30,
    // position: 'absolute',
    // zIndex: 1,
    // top: SIZES.height / 2.4,
    // bottom: 0,
    // right: 0,
    // left: 0,
    // height: SIZES.height / 9,
    // elevation: 8,
    // paddingHorizontal: 30,
  },
  innerView: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: color.white,
    elevation: 5,
    marginVertical: 5,
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  txt: {
    fontFamily: FONTS.Rubik_medium,
    marginTop: 8,
  },
});
