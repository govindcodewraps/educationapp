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

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function ChoosePremiumOptionScreen({navigation}) {
  const [checked, setChecked] = React.useState('first');

  const [selOpt, setSelOpt] = useState('');

  const changeSelect = selType => {
    setSelOpt(selType);
  };

  const handleSelectType = () => {
    if (selOpt == 'Request For Training') {
      navigation.navigate('PremiumDrawerNavigator', {
        // select_type: 'Wholeseller',
      });
    } else if (selOpt == 'Purchase a Mobile App') {
      navigation.navigate('PremiumDrawerNavigator', {
        // select_type: 'Retailer',
      });
    }
  };

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
                  selOpt == 'Request For Training'
                    ? color.primary_color
                    : color.chat_bg,
              },
            ]}
            onPress={() => changeSelect('Request For Training')}>
            {selOpt == 'Request For Training' ? (
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
                  Request For Training
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
                <Text style={styles.txt}>Request For Training</Text>
              </View>
            )}
            <View>
              <RadioButton
                value="first"
                status={
                  selOpt == 'Request For Training'
                    ? checked === 'first'
                      ? 'checked'
                      : 'unchecked'
                    : !checked === 'first'
                    ? 'checked'
                    : 'unchecked'
                }
                color={selOpt == 'Request For Training' && color.white}
                onPress={() => setChecked('first')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              styles.opt1,
              {
                backgroundColor:
                  selOpt == 'Purchase a Mobile App'
                    ? color.primary_color
                    : color.chat_bg,
              },
            ]}
            onPress={() => changeSelect('Purchase a Mobile App')}>
            {selOpt == 'Purchase a Mobile App' ? (
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
                  Purchase a Mobile App
                </Text>
              </View>
            ) : (
              <View style={styles.sec1}>
                <MaterialCommunityIcons
                  name="doctor"
                  color={color.dark_theme}
                  size={25}
                />
                <Text style={styles.txt}>Purchase a Mobile App</Text>
              </View>
            )}
            <View>
              <RadioButton
                value="first"
                status={
                  selOpt == 'Purchase a Mobile App'
                    ? checked === 'first'
                      ? 'checked'
                      : 'unchecked'
                    : !checked === 'first'
                    ? 'checked'
                    : 'unchecked'
                }
                color={selOpt == 'Purchase a Mobile App' && color.white}
                onPress={() => setChecked('first')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.btn}>
          <App_Button title={'Next'} onPress={() => handleSelectType()} />
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
    marginTop: SIZES.height / 2.6,
    paddingHorizontal: SIZES.width / 10,
  },
});
