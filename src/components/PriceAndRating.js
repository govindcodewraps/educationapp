import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import color from '../assets/theme/color';
import Entypo from 'react-native-vector-icons/Entypo';
import {SIZES} from '../assets/theme/theme';
import {colorsDark} from 'react-native-elements/dist/config';

export default function PriceAndRating({
  AprroxRating,
  SizeDescription,
  Price,
  Time,
  Rating,
}) {
  return (
    <View style={styles.middleView}>
      <View style={styles.DescriptionRow}>
        <View style={styles.DescriptionRow1}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View style={[styles.item, {flexDirection: 'row'}]}>
              <Entypo name="star" color={color.white} size={20} />
              <Text
                style={[
                  styles.text,
                  {color: color.white, fontFamily: 'Roboto-Bold'},
                ]}>
                {Rating}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.txt2}>{AprroxRating}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>€{Price}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  middleView: {
    marginVertical: 10,
    backgroundColor: color.primary_color,
    borderRadius: 10,
  },
  DescriptionRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.width / 20,
  },

  item: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  DescriptionRow: {
    paddingVertical: 10,
  },
  text: {
    fontWeight: '500',
    color: color.white,
    fontSize: SIZES.h3 + 1,
    fontFamily: 'Montserrat-SemiBold',
  },
  txt2: {
    fontSize: SIZES.h3 - 1,
    color: color.white,
    fontFamily: 'Montserrat-Regular',
  },
});
