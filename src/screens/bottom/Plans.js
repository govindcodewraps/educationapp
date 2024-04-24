import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import color from '../../assets/theme/color';
import {COLORS, FONTS, SIZES} from '../../assets/theme/theme';

import Header from '../../components/Header';
import PlanCards from '../../components/Plans/PlanCards';

export default function Plans({navigation}) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.heading}>
        <Text style={styles.headingTxt}>YOUR CURRENT PLAN</Text>
      </View>
      <PlanCards
        Plan={'STANDARD PLAN'}
        Price={'€999'}
        PlanType={'Study Content PDF/Video Access'}
        PlanTime={'6 Months Plan'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  heading: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  headingTxt: {
    fontFamily: FONTS.Rubik_Bold,
    color: color.primary_color,
    fontSize: SIZES.h2,
  },
});
