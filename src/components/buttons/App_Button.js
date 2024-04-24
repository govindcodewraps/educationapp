import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import color from '../../assets/theme/color';
import {FONTS} from '../../assets/theme/theme';

export default function App_Button({
  title,
  onPress,
  loading = false,
  ...props
}) {
  return (
    <>
      {loading ? (
        <View
          style={{
            paddingVertical: 12,
            backgroundColor: color.primary_color,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
          {...props}>
          <ActivityIndicator color={'white'} size={'small'} />
        </View>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.6}
          style={[styles.button_container]}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  button_container: {
    paddingVertical: 12,
    backgroundColor: color.primary_color,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontFamily: FONTS.primarytext3,
    textTransform: 'uppercase',
    fontSize: 16,
    color: color.white,
  },
});
