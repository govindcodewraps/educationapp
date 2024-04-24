import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {SIZES} from '../../assets/theme/theme';
import color from '../../assets/theme/color';
import VioletButton from '../../components/VioletButton';

export default function OrderSuccess({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.white,
      }}>
      <View style={styles.imgView}>
        <Image
          resizeMode="contain"
          style={styles.img}
          source={require('../../assets/images/logo1.png')}
        />
      </View>
      <View style={styles.view2}>
        <Text style={styles.thankTxt}>Thank you for your order!</Text>
        <Text style={styles.dtlTxt}>
          We’ve received your order and it will be dispatched during your
          delivery window. You can access your order details at any time on your
          orders page.
        </Text>
      </View>
      <View style={styles.btnView}>
        <VioletButton
          buttonName={'CONTINUE SHOPING'}
          onPress={() => navigation.navigate('DistributerHome')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imgView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: SIZES.height / 8,
    width: SIZES.width / 1.2,
    tintColor: color.primary_color,
    resizeMode: 'cover',
  },
  view2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.width / 15,
  },
  thankTxt: {
    fontSize: SIZES.h2 + 2,
    fontWeight: 'bold',
    color: color.text_primary,
    marginBottom: SIZES.height / 50,
  },
  dtlTxt: {
    textAlign: 'center',
    fontSize: SIZES.h4 - 1,
    color: color.black,
  },
  btnView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    bottom: 40,
    position: 'absolute',
    width: SIZES.width / 1.1,
  },
});
