import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import color from '../../assets/theme/color';
import {FONTS} from '../../assets/theme/theme';
export default function SubHeadline({subTitle}) {
  return (
    <View>
      <Text style={styles.subText}>{subTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  subText: {
    textTransform: 'capitalize',
    fontFamily: FONTS.primarytext3,
    color: color.blue,
    marginTop: 10,
  },
});
