import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import color from '../assets/theme/color';
import {FONTS, SIZES} from '../assets/theme/theme';

export default function VioletButton({buttonName, onPress, disable}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {backgroundColor: disable ? color.grey : color.primary_color},
      ]}
      activeOpacity={0.5}
      disabled={disable}>
      <View>
        <Text
          style={{
            color: color.white,
            fontFamily: FONTS.primarytext3,
            fontSize: SIZES.h3,
          }}>
          {buttonName}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: SIZES.height / 54,
    paddingHorizontal: 12,
    borderRadius: 4,
    // backgroundColor: color.primary_color,
    width: '100%',
    marginBottom: SIZES.height / 54,
  },
});
