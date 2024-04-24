import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LogoWithBackground from '../components/LogoWithBackground';

import color from '../assets/theme/color';
import Headline from '../components/text/Headline';
import Input from '../components/inputs/Input';
import CheckBox from '../components/CheckBox';
import App_Button from '../components/buttons/App_Button';
import Social_Button from '../components/buttons/Social_Button';
import {FONTS, SIZES} from '../assets/theme/theme';

export default function Login({navigation, route}) {
  // const {select_type, selPlan} = route.params;
  // console.log('selPlan', selPlan);
  // console.log('select_type', select_type);

  // const signUpType = () => {
  //   if (select_type == 'Distributor') {
  //     navigation.navigate('Registration', {select_type: select_type});
  //   } else if (select_type == 'Trainer') {
  //     navigation.navigate('Registration', {select_type: select_type});
  //   } else if (selPlan == selPlan) {
  //     navigation.navigate('Registration', {selPlan: selPlan});
  //   }
  // };

  // const LoginType = () => {
  //   if (select_type == 'Distributor') {
  //     navigation.navigate('DistributerDrawerNavigator');
  //   } else if (select_type == 'Trainer') {
  //     navigation.navigate('TrainerDrawerNavigator');
  //   } else if (selPlan == 'Standard') {
  //     navigation.navigate('PaymentOption');
  //   } else if (selPlan == 'Premium') {
  //     navigation.navigate('ChoosePremiumOptionScreen');
  //   }
  // };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.primary_color} />
      <ScrollView>
        <LogoWithBackground />
        <View style={styles.main_container}>
          {/* <Text>{selPlan}</Text> */}
          <Headline title={'login'} />
          <View style={styles.inputs}>
            <Input placeholder="Email" />
            <Input placeholder="Password" password={true} />
          </View>
          <View style={styles.checkbox_row}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox />
              <Text style={[styles.text, {marginLeft: 10}]}>Remember Me</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() =>
                navigation.navigate('ForgetPassword', {
                  // select_type: select_type,
                  // selPlan: selPlan,
                })
              }>
              <Text style={styles.forget}>Forget Password ?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button_container}>
            <App_Button
              title={'login'}
              onPress={() => navigation.navigate('PaymentOption')}
            />
            {/* <Text style={styles.text_or}>OR</Text>
            <View style={styles.social_buttons}>
              <Social_Button
                title={'sign in with google'}
                image={require('../assets/images/social_icons/google_icon.png')}
              />
              <Social_Button
                title={'sign in with facebook'}
                image={require('../assets/images/social_icons/facebook_icon.png')}
              />
            </View> */}
            <View style={styles.signup_row}>
              <Text style={styles.account}>Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Registration')}>
                <Text style={styles.signup}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  main_container: {
    paddingHorizontal: 20,
  },
  inputs: {
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: FONTS.primarytext1,
    color: color.black,
  },
  checkbox_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forget: {
    fontSize: 14,
    fontFamily: FONTS.primarytext3,
    color: color.dark_grey,
  },
  button_container: {
    marginVertical: 40,
  },
  text_or: {
    alignSelf: 'center',
    fontSize: 16,
    color: color.grey,
    fontFamily: FONTS.primarytext3,
    marginVertical: 20,
  },
  social_buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signup_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.height / 5,
  },
  account: {
    fontSize: 16,
    fontFamily: FONTS.primarytext1,
    color: color.black,
  },
  signup: {
    fontSize: 16,
    fontFamily: FONTS.primarytext5,
    color: color.primary_color,
  },
});
