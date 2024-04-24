import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import color from '../assets/theme/color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function LogoWithBackground() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo_image}
        source={require('../assets/images/logo3.png')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.primary_color,
    height: hp(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo_image: {
    height: hp(14),
    width: hp(50),
  },
});
