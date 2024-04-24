import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import color from '../../assets/theme/color';
import {FONTS} from '../../assets/theme/theme';

export default function Social_Button({title, image}) {
  return (
    <TouchableOpacity activeOpacity={0.3} style={styles.social_button}>
      <Image style={styles.icon} source={image} />
      <View style={styles.title_container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  social_button: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: color.light_grey,
    borderRadius: 2,

    width: wp(42),
    alignItems: 'center',
  },
  icon: {
    width: hp(3),
    height: hp(3),
    margin: 7,
  },
  title: {
    fontSize: wp(2.3),
    fontFamily: FONTS.primarytext1,
    textTransform: 'uppercase',
  },
  title_container: {
    width: wp(42) * 0.75,
    height: '100%',

    borderColor: color.dark_grey,
    alignItems: 'center',
    borderLeftWidth: 1,
    borderColor: color.dark_grey,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
