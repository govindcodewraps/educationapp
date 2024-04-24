import React from 'react';

import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import color from '../../assets/theme/color';
import {FONTS, SIZES} from '../../assets/theme/theme';
import HamburgerHeader from '../../components/HamburgerHeader';
import Header from '../../components/Header';

export default function AboutUs({navigation}) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <HamburgerHeader hamTitle={'ABOUT US'} />
      <ScrollView>
        <View style={styles.AboutTxtView}>
          <Text style={styles.aboutTxt}>
            WHY WOUND DEBRIDEMENT IS NECESSARY
          </Text>
          <Text style={styles.txt2}>
            Debridement is the basis & a fundamental step for healing in all
            types of wounds. That is why an innovative creation on NEUdebri is
            made for precise & efficient care. Removal of accumulated non-viable
            tissue from the wound bed can maintain a healthy skin perfusion &
            promotes fast healing process Progressive healing pathway is
            guaranteed if dead tissue is removed. An ulcer is like an iceberg,
            debridement is necessary to resolve the complaints about pain.
            Neudebri allows us to extract & excise the dead tissue through an
            innovative and skillful technique. Prevent infection. Dead tissue
            can catch bacteria, for that, infection can hinder wound healing.
            Dead tissue can hide bags of pus!!!
          </Text>

          <Text style={styles.aboutTxt}>How did neudebri came up?</Text>
          <Text style={styles.txt2}>
            It is inspired by a regular successful result after “regular
            surgery” (sharp debridement). The voice of the patients suffering
            from chronic wounds must be heard.​​​​​​​Worldwide research, testing
            & collection of debridement tools was in vain. Therefore further
            seeking for solutions until a new development for a better
            innovation is created together with careful studies & measurement to
            get to a perfect click!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  headerView: {
    backgroundColor: color.primary_color,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTxt: {
    color: color.white,
    fontFamily: FONTS.Rubik_Bold,
    fontSize: SIZES.h2 - 3,
  },
  AboutTxtView: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  aboutTxt: {
    fontFamily: FONTS.Rubik_Bold,
    fontSize: SIZES.h3,
    color: color.dark_theme,
    marginVertical: 20,
  },
  txt2: {
    fontFamily: FONTS.primarytext1,
    fontSize: SIZES.h3,
    textAlign: 'justify',
  },
});
