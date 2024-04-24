import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import color from '../../assets/theme/color';
import {SIZES} from '../../assets/theme/theme';

const GovNotAllowedScreen = ({navigation}) => {
  return (
    <View style={styles.page}>
      <View style={styles.txtView}>
        <Text style={styles.txt}>You are not eligible for this offer</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
        <Text style={styles.btnTxt}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GovNotAllowedScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SIZES.height / 20,
  },
  txt: {
    fontWeight: 'bold',
    color: color.black,
    fontSize: SIZES.h2,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary_color,
    paddingHorizontal: SIZES.width / 4,
    paddingVertical: SIZES.height / 50,
    borderRadius: 5,
  },
  btnTxt: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: color.white,
  },
});
