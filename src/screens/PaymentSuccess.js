import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FONTS, SIZES} from '../assets/theme/theme';
import Headline from '../components/text/Headline';
import {colors} from 'react-native-elements';
import color from '../assets/theme/color';

export default function PaymentSuccess({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.imgView}>
        <Image
          source={require('../assets/images/success.png')}
          style={styles.img}
        />
      </View>
      <View>
        <Headline title={'PAYMENT SUCCESSFUL'} />
      </View>
      <View
        style={{
          backgroundColor: color.light_bg2,
          marginHorizontal: SIZES.width / 18,
          paddingHorizontal: 15,
          paddingVertical: 20,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontSize: SIZES.h2 - 5.5,
            color: color.black,
            lineHeight: 25,
            textAlign: 'center',
          }}>
          Your order of the tools has been placed and you will receive all
          notification by email!
        </Text>
      </View>
      <View style={styles.bottomTxt}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DrawerNavigator')}>
          <Text style={styles.txt}>Go back to home page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgView: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  img: {
    height: SIZES.height / 6,
    width: SIZES.width / 3,
    resizeMode: 'contain',
  },
  bottomTxt: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontFamily: FONTS.primarytext1,
    textDecorationLine: 'underline',
    color: colors.black,
  },
});
