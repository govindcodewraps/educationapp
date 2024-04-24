import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Carousel from '../../components/Carousel';
import color from '../../assets/theme/color';
import {SIZES} from '../../assets/theme/theme';
import App_Button from '../../components/buttons/App_Button';
import Entypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native';

export default function BasicCertificateStatusScreen({navigation}) {
  return (
    <View style={styles.page}>
      <Header navigation={navigation} />
      <Carousel />
      <View style={styles.bottomScreen}>
        <View style={styles.headingSec}>
          <Text style={styles.headingTxt}>CERTIFICATE STATUS</Text>
        </View>
        <View style={styles.contentSec}>
          <Text style={styles.ContentTxt}>
            Hello students, Your certificate will be ready soon. Know your
            certification status below and Keep tracking your application
          </Text>
        </View>
        <TouchableOpacity style={styles.btn}>
          <View style={styles.btnView}>
            <Text>Application status</Text>
            <View style={styles.dotView}>
              <Entypo name="dot-single" size={20} color="green" />
              <Text>Pending</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.downBtnView}>
          <App_Button title="DOWNLOAD" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.white,
  },
  bottomScreen: {
    flex: 1,
    paddingVertical: SIZES.height / 18,
  },
  headingSec: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SIZES.height / 64 - 5,
  },
  headingTxt: {
    fontWeight: 'bold',
    fontSize: SIZES.h2 - 3,
  },
  contentSec: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.width / 18,
  },
  ContentTxt: {
    textAlign: 'center',
    fontSize: SIZES.h3 - 4,
  },
  btn: {
    paddingHorizontal: SIZES.width / 5,
    marginTop: SIZES.height / 30,
  },
  btn: {
    backgroundColor: color.white,
    elevation: 5,
    marginHorizontal: SIZES.width / 20,
    marginTop: SIZES.height / 40,
    justifyContent: 'center',
    paddingHorizontal: SIZES.width / 20,
    paddingVertical: SIZES.height / 40,
  },

  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dotView: {
    flexDirection: 'row',
  },
  downBtnView: {
    marginHorizontal: SIZES.width / 20,
  },
});
