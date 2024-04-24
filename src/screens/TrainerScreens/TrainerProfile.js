import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header2 from '../../components/Header2';
import color from '../../assets/theme/color';
import {FONTS, SIZES} from '../../assets/theme/theme';

import {Divider} from 'react-native-paper';
import GenderDropdown from '../../components/GenderDropdown';
import QualificationDropdown from '../../components/QualificationDropdown';
import App_Button from '../../components/buttons/App_Button';

export default function TrainerProfiled({navigation}) {
  return (
    <View style={styles.container}>
      <Header2 navigation={navigation} />
      <ScrollView>
        <View style={styles.upperView}>
          <View>
            <Text style={styles.profileTxt}>PROFILE IMAGE</Text>
          </View>
          <View style={styles.imgView}>
            <Image
              style={styles.img}
              resizeMode="contain"
              source={require('../../assets/images/profile.png')}
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.addTxt}>Add Profile</Text>
          </TouchableOpacity>
        </View>
        <Divider style={{marginHorizontal: 30, marginVertical: 20}} />
        <View style={styles.inputView}>
          <View style={styles.section}>
            <Text style={styles.inputTxt}>First Name</Text>
            <TextInput style={styles.Input} placeholder="First Name" />
          </View>
          <View style={styles.section}>
            <Text style={styles.inputTxt}>Last Name</Text>
            <TextInput style={styles.Input} placeholder="Last Name" />
          </View>
          <View style={styles.section}>
            <GenderDropdown label={'Gender'} />
          </View>
          <View style={styles.section}>
            <Text style={styles.inputTxt}>Phone no.</Text>
            <TextInput style={styles.Input} placeholder="Phone no." />
          </View>
          <View style={styles.section}>
            <Text style={styles.inputTxt}>Email Address</Text>
            <TextInput style={styles.Input} placeholder="Email Address" />
          </View>
          <View style={styles.section}>
            <QualificationDropdown label={'Qualification'} />
          </View>
          <View style={styles.section}>
            <Text style={styles.inputTxt}>Address</Text>
            <TextInput style={styles.Input} placeholder="Address" />
          </View>
        </View>
        <View style={styles.btnView}>
          <App_Button
            title={'Save'}
            // onPress={() => navigation.navigate('DistributerAccountScreen')}
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
  upperView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    // backgroundColor: 'red',
  },
  profileTxt: {
    fontFamily: FONTS.Rubik_Bold,
    color: color.black,
  },
  imgView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  img: {
    height: SIZES.height / 8,
    width: SIZES.width / 4,
  },
  addTxt: {
    fontFamily: FONTS.Rubik_Bold,
    color: color.primary_color,
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
  },
  Input: {
    borderWidth: 0.8,
    borderColor: color.black,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  btnView: {
    marginVertical: 30,
    marginHorizontal: 40,
  },
});
