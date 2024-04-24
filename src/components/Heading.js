import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import color from '../assets/theme/color';
import {SIZES} from '../assets/theme/theme';

export default function Heading({HeadLine}) {
  return (
    <View style={styles.HeadLine}>
      <Text style={styles.text}>{HeadLine}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  HeadLine: {
    backgroundColor: color.primary_color,
    paddingHorizontal: 15,
    paddingVertical: 6,

    // marginVertical: 20,
  },
  text: {
    color: color.white,
    // fontWeight: 'bold',
    fontSize: SIZES.h3 + 3.5,
    fontFamily: 'Montserrat-Bold',
  },
});
