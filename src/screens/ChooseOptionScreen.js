import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import color from '../assets/theme/color';
import {FONTS, SIZES} from '../assets/theme/theme';
import Headline from '../components/text/Headline';
import SubHeadline from '../components/text/SubHeadline';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import App_Button from '../components/buttons/App_Button';
import 'localstorage-polyfill';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function ChooseOptionScreen({navigation}) {
  const [checked, setChecked] = React.useState('first');

  const [selOpt, setSelOpt] = useState();
  const changeSelect = selType => {
    setSelOpt(selType);
  };

  console.log('------ChooseOptionScreen.js--------type : ', selOpt);
  const handleApi = () => {
    // setDisabled(true);
    localStorage.setItem('select_type', selOpt);
    if (selOpt == 'Distributor') {
      navigation.navigate('ChooseOption2');
    } else if (selOpt == 'Trainer') {
      navigation.navigate('TrainerSignup', {select_type: 'Trainer'});
    } else if (selOpt == 'Professional') {
      navigation.navigate('ChoosePlanScreen', {select_type: 'Professional'});
    } else if (selOpt == 'Doctor'){
      navigation.navigate('DoctorSignup', {select_type: 'Doctor'});
    }
  };

  // const handleSelectType = () => {
  //   if (selOpt == 'Distributor') {
  //     navigation.navigate('ChooseOption2', {select_type: 'Distributor'});
  //   } else if (selOpt == 'Trainer') {
  //     navigation.navigate('TrainerLogin', {select_type: 'Trainer'});
  //   } else if (selOpt == 'Professional') {
  //     navigation.navigate('ChoosePlanScreen', {select_type: 'Professional'});
  //   }
  // };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.primary_color} />
      <View style={styles.main_container}>
        <View style={styles.headline}>
          <Headline title={'Which One Are You?'} />
          <SubHeadline
            subTitle={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            }
          />
        </View>
        <View style={styles.optionView}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              styles.opt1,
              {
                backgroundColor:
                  selOpt == 'Distributor' ? color.primary_color : color.chat_bg,
              },
            ]}
            onPress={() => changeSelect('Distributor')}>
            {selOpt == 'Distributor' ? (
              <View style={styles.sec1}>
                <Image
                  resizeMode="contain"
                  style={{
                    tintColor: color.white,
                    height: SIZES.height / 24,
                    width: SIZES.width / 10,
                  }}
                  source={require('../assets/images/type1.png')}
                />
                {/* <FontAwesome
                  name="user-graduate"
                  color={color.white}
                  size={20}
                /> */}
                <Text style={[styles.txt, {color: color.white}]}>
                  Are you a Distributor?
                </Text>
              </View>
            ) : (
              <View style={styles.sec1}>
                <Image
                  resizeMode="contain"
                  style={{
                    tintColor: color.dark_theme,
                    height: SIZES.height / 24,
                    width: SIZES.width / 10,
                  }}
                  source={require('../assets/images/type1.png')}
                />
                {/* <FontAwesome5 name="user-graduate" color="#0DBAF0" size={20} /> */}
                <Text style={styles.txt}>Are you a Distributor?</Text>
              </View>
            )}
            <View>
              <RadioButton
                // value="first"
                // status={
                //   selOpt == 'Distributor'
                //     ? checked === 'first'
                //       ? 'checked'
                //       : 'unchecked'
                //     : !checked === 'first'
                //     ? 'checked'
                //     : 'unchecked'
                // }
                // onPress={() => setChecked('first')}
                value="Distributor"
                status={selOpt === 'Distributor' ? 'checked' : 'unchecked'}
                onPress={() => setSelOpt('Distributor')}
                color={selOpt == 'Distributor' && color.white}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              styles.opt1,
              {
                backgroundColor:
                  selOpt == 'Trainer' ? color.primary_color : color.chat_bg,
              },
            ]}
            onPress={() => changeSelect('Trainer')}>
            {selOpt == 'Trainer' ? (
              <View style={styles.sec1}>
                {/* <MaterialCommunityIcons
                  name="doctor"
                  color={color.white}
                  size={25}
                /> */}
                <Image
                  resizeMode="contain"
                  style={{
                    tintColor: color.white,
                    height: SIZES.height / 24,
                    width: SIZES.width / 10,
                  }}
                  source={require('../assets/images/type3.png')}
                />
                <Text style={[styles.txt, {color: color.white}]}>
                  Are you a Trainer?
                </Text>
              </View>
            ) : (
              <View style={styles.sec1}>
                <MaterialCommunityIcons
                  name="doctor"
                  color={color.dark_theme}
                  size={25}
                />
                <Text style={styles.txt}>Are you a Trainer?</Text>
              </View>
            )}
            <View>
              <RadioButton
                // value="first"
                // status={
                //   selOpt == 'Trainer'
                //     ? checked === 'first'
                //       ? 'checked'
                //       : 'unchecked'
                //     : !checked === 'first'
                //     ? 'checked'
                //     : 'unchecked'
                // }
                // color={selOpt == 'Trainer' && color.white}
                // onPress={() => setChecked('first')}
                value="Trainer"
                status={selOpt === 'Trainer' ? 'checked' : 'unchecked'}
                onPress={() => setSelOpt('Trainer')}
                color={selOpt == 'Trainer' && color.white}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              styles.opt1,
              {
                backgroundColor:
                  selOpt == 'Professional'
                    ? color.primary_color
                    : color.chat_bg,
              },
            ]}
            onPress={() => changeSelect('Professional')}>
            {selOpt == 'Professional' ? (
              <View style={styles.sec1}>
                <Fontisto name="doctor" color={color.white} size={20} />
                <Text style={[styles.txt, {color: color.white}]}>
                  Are you a Professional?
                </Text>
              </View>
            ) : (
              <View style={styles.sec1}>
                <Fontisto name="doctor" color={color.dark_theme} size={20} />
                <Text style={styles.txt}>Are you a Professional?</Text>
              </View>
            )}
            <View>
              <RadioButton
                // value="first"
                // status={
                //   selOpt == 'Professional'
                //     ? checked === 'first'
                //       ? 'checked'
                //       : 'unchecked'
                //     : !checked === 'first'
                //     ? 'checked'
                //     : 'unchecked'
                // }
                // color={selOpt == 'Professional' && color.white}
                // onPress={() => setChecked('first')}
                value="Professional"
                status={selOpt === 'Professional' ? 'checked' : 'unchecked'}
                onPress={() => setSelOpt('Professional')}
                color={selOpt == 'Professional' && color.white}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              styles.opt1,
              {
                backgroundColor:
                  selOpt == 'Doctor' ? color.primary_color : color.chat_bg,
              },
            ]}
            onPress={() => changeSelect('Doctor')}>
            {selOpt == 'Doctor' ? (
              <View style={styles.sec1}>
                <Image
                  resizeMode="contain"
                  style={{
                    tintColor: color.white,
                    height: SIZES.height / 24,
                    width: SIZES.width / 10,
                  }}
                  source={require('../assets/images/doctor.png')}
                />
                {/* <FontAwesome
                  name="user-graduate"
                  color={color.white}
                  size={20}
                /> */}
                <Text style={[styles.txt, {color: color.white}]}>
                  Are you a Doctor?
                </Text>
              </View>
            ) : (
              <View style={styles.sec1}>
                <Image
                  resizeMode="contain"
                  style={{
                    tintColor: color.dark_theme,
                    height: SIZES.height / 24,
                    width: SIZES.width / 10,
                  }}
                  source={require('../assets/images/doctor.png')}
                />
                {/* <FontAwesome5 name="user-graduate" color="#0DBAF0" size={20} /> */}
                <Text style={styles.txt}>Are you a Doctor?</Text>
              </View>
            )}
            <View>
              <RadioButton
                value="Doctor"
                status={selOpt === 'Doctor' ? 'checked' : 'unchecked'}
                onPress={() => setSelOpt('Doctor')}
                color={selOpt == 'Doctor' && color.white}
              />
            </View>
          </TouchableOpacity>

        </View>

        
        <View style={styles.btn}>
          <App_Button title={'Next'} onPress={handleApi} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  main_container: {
    paddingHorizontal: 20,
  },
  headline: {
    marginTop: SIZES.width / 6,
  },

  optionView: {
    marginTop: 60,
  },
  opt1: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 6,
  },
  sec1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontFamily: FONTS.primarytext5,
    marginLeft: 10,
  },
  btn: {
    marginTop: SIZES.height / 3.7,
    paddingHorizontal: SIZES.width / 10,
  },
});
