import React from 'react';
import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import Header2 from '../../components/Header2';
import HamburgerHeader from '../../components/HamburgerHeader';
import color from '../../assets/theme/color';
import {FONTS, SIZES} from '../../assets/theme/theme';
import {ScrollView} from 'react-native';
import App_Button from '../../components/buttons/App_Button';

export default function TrainerContactUs({navigation}) {
  return (
    <View style={styles.container}>
      <Header2 navigation={navigation} />
      <HamburgerHeader hamTitle={'CONTACT US'} />
      <ScrollView>
        <View style={styles.imgView}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={require('../../assets/images/contact2.png')}
          />
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.bottomTxt}>GET IN TOUCH!</Text>
        </View>
        <View style={styles.inputView}>
          <View style={styles.section}>
            <Text style={styles.inputTxt}>First Name</Text>
            <TextInput style={styles.Input} placeholder="First Name" />
          </View>

          <View style={styles.section}>
            <Text style={styles.inputTxt}>Email Address</Text>
            <TextInput style={styles.Input} placeholder="Email Address" />
          </View>
          <View style={styles.section}>
            <Text style={styles.inputTxt}>Message</Text>
            <TextInput
              style={styles.Input}
              placeholder="Enter here"
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>
        <View style={styles.btnView}>
          <App_Button
            title={'Send'}
            onPress={() => navigation.navigate('TrainerHome')}
          />
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
  imgView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: SIZES.height / 3,
    width: SIZES.width / 1.1,
  },
  bottomView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTxt: {
    fontFamily: FONTS.primarytext2,
    color: color.primary_color,
    fontSize: SIZES.h2,
  },
  inputView: {
    paddingHorizontal: 10,
  },
  section: {
    marginVertical: 8,
  },
  inputTxt: {
    fontFamily: FONTS.Rubik_medium,
    marginBottom: 5,
    // marginBottom: 5,
  },
  Input: {
    borderWidth: 0.8,
    borderColor: color.black,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  btnView: {
    marginVertical: 10,
    marginHorizontal: 40,
  },
});
