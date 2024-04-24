import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import HamburgerHeader from '../../components/HamburgerHeader';
import color from '../../assets/theme/color';
import {FONTS, SIZES} from '../../assets/theme/theme';

export default function PremiumTerms({navigation}) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <HamburgerHeader hamTitle={'TERM’S & CONDITIONS'} />

      <View style={styles.policyView}>
        <Text style={styles.txt2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Posuere
          tellus enim dignissim odio. A auctor erat magna nisl. Senectus orci
          mattis nisi aliquam montes, cursus vel. Nunc vulputate et dictum nec
          mattis enim. Blandit pulvinar nulla urna condimentum aenean rhoncus.
          Scelerisque eget eget pellentesque purus. Et nibh iaculis ullamcorper
          malesuada aliquet mi. Gravida quisque tristique vitae commodo praesent
          ut. Magnis libero sed sodales cum. Cursus pharetra placerat cursus
          dolor, augue volutpat, imperdiet justo, leo. Ultricies in facilisis
          neque, justo. Viverra viverra mi facilisi ullamcorper sed sed.
          Ultrices fusce risus amet, fringilla dolor purus dis. Phasellus
          elementum fringilla scelerisque diam orci, maecenas.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  policyView: {
    paddingHorizontal: 15,
    marginVertical: 20,
  },
  txt2: {
    fontFamily: FONTS.primarytext1,
    fontSize: SIZES.h3,
    textAlign: 'justify',
  },
});
