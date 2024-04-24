import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import color from '../../assets/theme/color';
import App_Button from '../buttons/App_Button';
import {FONTS, SIZES} from '../../assets/theme/theme';

export default function BottomView() {
  return (
    <View style={styles.mainView}>
      <View style={styles.secView}>
        <View style={styles.LeftView}>
          <Text style={styles.txt1}>SHARE APP TO YOUR CLASS FRIENDS</Text>
          <Text style={styles.txt2}>
            Invite your friends to learn together with the Dream Team
          </Text>
          <View style={styles.btnView}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnTxt}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.RightView}>
          <Image
            style={styles.img}
            resizeMode="contain"
            source={require('../../assets/images/Bottom.png')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: color.white,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  LeftView: {
    flex: 0.65,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  txt1: {
    fontFamily: FONTS.Rubik_medium,
    fontSize: SIZES.h3 - 1,
    color: color.black,
  },
  txt2: {
    fontFamily: FONTS.primarytext1,
    fontSize: SIZES.h4 - 3,
    color: color.black,
    marginTop: 5,
  },
  RightView: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: SIZES.height / 4,
    width: SIZES.width / 2,
  },
  btnView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: SIZES.height / 24,
  },
  btn: {
    backgroundColor: color.primary_color,
    paddingHorizontal: SIZES.width / 12,
    paddingVertical: SIZES.height / 64 - 10,
  },
  btnTxt: {
    fontFamily: FONTS.primarytext1,
    fontSize: SIZES.h2,
    color: color.white,
  },
});
