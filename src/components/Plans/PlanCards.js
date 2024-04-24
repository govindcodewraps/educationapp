import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import color from '../../assets/theme/color';
import {COLORS, FONTS, SIZES} from '../../assets/theme/theme';

export default function PlanCards({Plan, Price, PlanType, PlanTime}) {
  return (
    <View style={styles.cardMainView}>
      <View style={styles.cardView}>
        <View style={styles.priceView}>
          <Text style={styles.txt}>{Plan}</Text>
          <Text style={styles.price}>{Price}</Text>
        </View>
        <View style={styles.planMainView}>
          <View style={styles.planView}>
            <Text style={styles.dot}>⬤</Text>
            <Text style={styles.planTxt}>{PlanType}</Text>
          </View>
          <View style={styles.planView}>
            <Text style={styles.dot}>⬤</Text>
            <Text style={styles.planTxt}>{PlanTime}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardMainView: {
    paddingHorizontal: 20,
  },
  cardView: {
    backgroundColor: color.primary_color,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 8,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt: {
    fontFamily: FONTS.Rubik_medium,
    color: color.white,
    fontSize: 18,
  },
  price: {
    fontFamily: FONTS.primarytext2,
    color: color.white,
    fontSize: 18,
  },
  planMainView: {
    marginTop: 10,
  },
  planView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dot: {
    color: color.white,
    marginRight: 10,
  },
  planTxt: {
    fontFamily: FONTS.primarytext1,
    fontSize: 14,
    color: color.white,
  },
});
