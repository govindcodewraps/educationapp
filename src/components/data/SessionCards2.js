import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../assets/theme/color';
import {FONTS, SIZES} from '../../assets/theme/theme';
import App_Button from '../buttons/App_Button';

export default function SessionCards2({type, sessionTitle, img}) {
  return (
    <View style={styles.cardView}>
      <View style={styles.imgView}>
        <Image style={styles.img} source={img} />
      </View>

      <View style={styles.cardBottom}>
        <View style={styles.heading1}>
          <Text style={styles.headingTxt}>{type}</Text>
        </View>
        <Text style={styles.headingTxt2}>{sessionTitle}</Text>
      </View>
      <View style={styles.btnView}>
        <App_Button title={'Know More'} btnColor={color.dark_theme} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardView: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: color.black,
    marginHorizontal: 10,
    width: SIZES.width / 1.55,
  },
  imgView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.card_bg,
    paddingVertical: 10,
  },
  img: {
    height: SIZES.height / 5,
    width: SIZES.width / 2,
  },

  cardBottom: {
    marginHorizontal: 10,
    marginTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  heading1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  headingTxt: {
    fontFamily: FONTS.primarytext2,
    color: color.black,
    fontSize: 14,
    // textAlign: 'justify',
  },
  headingTxt2: {
    fontFamily: FONTS.primarytext1,
    fontSize: 12,
    color: color.black,
  },
  btnView: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
