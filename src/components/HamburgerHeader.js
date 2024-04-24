import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import color from '../assets/theme/color';
import {FONTS, SIZES} from '../assets/theme/theme';

export default function HamburgerHeader({hamTitle}) {
  return (
    <View style={styles.headerView}>
      <Text style={styles.headerTxt}>{hamTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: color.primary_color,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTxt: {
    color: color.white,
    fontFamily: FONTS.primarytext2,
    fontSize: SIZES.h2 - 3,
  },
});
