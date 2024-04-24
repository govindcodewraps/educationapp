import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import color from '../../assets/theme/color';
import {FONTS, SIZES} from '../../assets/theme/theme';

export default function Headline({title}) {
  return (
    <>
      <View style={styles.headlineView}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  headlineView: {
    // backgroundColor: color.primary_color,
    paddingHorizontal: SIZES.width / 64 - 10,
    paddingVertical: SIZES.height / 64,
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 20,
    fontFamily: FONTS.primarytext2,
    color: color.primary_color,
  },
});
