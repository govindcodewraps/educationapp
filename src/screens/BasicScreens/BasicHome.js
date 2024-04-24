import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Carousel from '../../components/Carousel';
import color from '../../assets/theme/color';
import {SIZES} from '../../assets/theme/theme';
import App_Button from '../../components/buttons/App_Button';

export default function BasicHome({navigation}) {
  return (
    <View style={styles.page}>
      <Header navigation={navigation} />
      <Carousel />
      <View style={styles.bottomScreen}>
        <View style={styles.headingSec}>
          <Text style={styles.headingTxt}>APPLY FOR CERTIFICATE</Text>
        </View>
        <View style={styles.contentSec}>
          <Text style={styles.ContentTxt}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Posuere
            tellus enim dignissim odio. A auctor erat magna nisl. Senectus orci
            mattis nisi aliquam montes, cursus vel.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Posuere tellus enim dignissim odio. A
            auctor erat magna nisl. Senectus orci mattis nisi aliquam montes,
            cursus vel.
          </Text>
        </View>
        <View style={styles.btn}>
          <App_Button
            title="Apply"
            onPress={() => navigation.navigate('BasicFormScreen')}
          />
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
});
