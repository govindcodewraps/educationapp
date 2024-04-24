import React, {useState, useEffect} from 'react';
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
import {connect} from 'react-redux';
import {storeUser} from '../store/user/Action';
import {ASYNC_LOGIN_KEY} from '../constants/Strings';
import {getAsyncData} from '../utils';

const ChooseOption2 = ({navigation, reduxUser, rdStoreUser}) => {
  const [checked, setChecked] = React.useState('first');
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [init, setInit] = useState('Loading');

  const [selOpt, setSelOpt] = useState('');

  // if (reduxUser.redirectToLogin) {
  //   navigation.navigate('Login');
  // }

  // useEffect(() => {
  //   if (!infoLoaded) {
  //     getAsyncData(ASYNC_LOGIN_KEY).then(asUser => {
  //       console.log('AS', asUser);
  //       //console.log('AS',JSON.parse(asUser));

  //       if (asUser != null) {
  //         setInit('Found');
  //         var temp = JSON.parse(asUser);
  //         if (temp.hasOwnProperty('email') && temp.email != '') {
  //           rdStoreUser(temp);
  //         }
  //       } else {
  //         // setInit('Not Found');
  //       }
  //     });
  //     setInfoLoaded(true);
  //   }
  // }, [infoLoaded]);

  const opt = localStorage.getItem('select_type');
  console.log('opt', opt);
  const changeSelect = selType => {
    setSelOpt(selType);
  };

  const handleSelectType = () => {
    localStorage.setItem('user_type', selOpt);
    if (selOpt == 'wholeseller') {
      navigation.navigate('DistributerSignup');
    } else if (selOpt == 'retailer') {
      navigation.navigate('DistributerSignup', {
        sub_type: selOpt,
      });
    } else if (selOpt == 'exclusive') {
      navigation.navigate('GovNotAllowedScreen', {
        // sub_type: selOpt,
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
                  selOpt == 'wholeseller' ? color.primary_color : color.chat_bg,
              },
            ]}
            onPress={() => changeSelect('wholeseller')}>
            {selOpt == 'wholeseller' ? (
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
                <View style={{flex: 1}}>
                  <Text style={[styles.txt, {color: color.white}]}>
                    Are you a Pharmacy?
                  </Text>
                </View>
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
                <View style={{flex: 1}}>
                  <Text style={styles.txt}>Are you a Pharmacy?</Text>
                </View>
              </View>
            )}
            <View>
              <RadioButton
                // value="first"
                // status={
                //   selOpt == 'wholeseller'
                //     ? checked === 'first'
                //       ? 'checked'
                //       : 'unchecked'
                //     : !checked === 'first'
                //     ? 'checked'
                //     : 'unchecked'
                // }
                // color={selOpt == 'wholeseller' && color.white}
                // onPress={() => setChecked('first')}
                value="wholeseller"
                status={selOpt === 'wholeseller' ? 'checked' : 'unchecked'}
                onPress={() => setSelOpt('wholeseller')}
                color={selOpt == 'wholeseller' && color.white}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              styles.opt1,
              {
                backgroundColor:
                  selOpt == 'retailer' ? color.primary_color : color.chat_bg,
              },
            ]}
            onPress={() => changeSelect('retailer')}>
            {selOpt == 'retailer' ? (
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
                    width: SIZES.width / 15,
                  }}
                  source={require('../assets/images/type3.png')}
                />
                <View style={{flex: 1}}>
                  <Text style={[styles.txt, {color: color.white}]}>
                    Are you a Trainers/Training Institutes/Universities?
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.sec1}>
                <Image
                  resizeMode="contain"
                  style={{
                    tintColor: color.dark_theme,
                    height: SIZES.height / 24,
                    width: SIZES.width / 15,
                  }}
                  source={require('../assets/images/type3.png')}
                />
                <View style={{flex: 1}}>
                  <Text style={styles.txt}>
                    Are you a Trainers/Training Institutes/Universities?
                  </Text>
                </View>
              </View>
            )}
            <View>
              <RadioButton
                // value="first"
                // status={
                //   selOpt == 'retailer'
                //     ? checked === 'first'
                //       ? 'checked'
                //       : 'unchecked'
                //     : !checked === 'first'
                //     ? 'checked'
                //     : 'unchecked'
                // }
                // color={selOpt == 'retailer' && color.white}
                // onPress={() => setChecked('first')}
                value="retailer"
                status={selOpt === 'retailer' ? 'checked' : 'unchecked'}
                onPress={() => setSelOpt('retailer')}
                color={selOpt == 'retailer' && color.white}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              styles.opt1,
              {
                backgroundColor:
                  selOpt == 'exclusive' ? color.primary_color : color.chat_bg,
              },
            ]}
            onPress={() => changeSelect('exclusive')}>
            {selOpt == 'exclusive' ? (
              <View style={styles.sec1}>
                <Fontisto name="doctor" color={color.white} size={20} />
                <View style={{flex: 1}}>
                  <Text style={[styles.txt, {color: color.white}]}>
                    Government Hospitals
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.sec1}>
                <Fontisto name="doctor" color={color.dark_theme} size={20} />
                <View style={{flex: 1}}>
                  <Text style={styles.txt}>Government Hospitals</Text>
                </View>
              </View>
            )}
            <View>
              <RadioButton
                // value="first"
                // status={
                //   selOpt == 'exclusive'
                //     ? checked === 'first'
                //       ? 'checked'
                //       : 'unchecked'
                //     : !checked === 'first'
                //     ? 'checked'
                //     : 'unchecked'
                // }
                // onPress={() => setChecked('first')}
                value="exclusive"
                status={selOpt === 'exclusive' ? 'checked' : 'unchecked'}
                onPress={() => setSelOpt('exclusive')}
                color={selOpt == 'exclusive' && color.white}
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
};

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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontFamily: FONTS.primarytext5,
    marginLeft: 10,
  },
  btn: {
    marginTop: SIZES.height / 2.9,
    paddingHorizontal: SIZES.width / 10,
  },
});

// const mapStateToProps = state => {
//   return {
//     reduxUser: state.user,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     rdStoreUser: user => dispatch(dispatch(storeUser(user))),
//   };
// };

export default ChooseOption2;
// (mapStateToProps, mapDispatchToProps)(ChooseOption2);
