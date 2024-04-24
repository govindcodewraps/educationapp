import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LogoWithBackground from '../../components/LogoWithBackground';

import color from '../../assets/theme/color';
import Headline from '../../components/text/Headline';
import Input from '../../components/inputs/Input';
import App_Button from '../../components/buttons/App_Button';
import Social_Button from '../../components/buttons/Social_Button';
import {FONTS, SIZES} from '../../assets/theme/theme';

export default function PremiumSignup({navigation, route}) {
  //   const {select_type, selPlan} = route.params;
  //   console.log('signtype', select_type, selPlan);

  //   const handleScreen = () => {
  //     if (select_type == 'Distributor') {
  //       navigation.navigate('OtpScreen', {select_type: select_type});
  //     } else if (select_type == 'Trainer') {
  //       navigation.navigate('TrainerDetailFormScreen', {
  //         select_type: select_type,
  //       });
  //     } else if (selPlan == selPlan) {
  //       navigation.navigate('OtpScreen', {selPlan: selPlan});
  //     }
  //   };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.primary_color} />
      <ScrollView>
        <LogoWithBackground />

        {/* <Text>{selPlan}</Text> */}

        <View style={styles.main_container}>
          <Headline title={'sign up'} />
          <View style={styles.inputs}>
            <Input placeholder="Email" />
            <Input placeholder="Password" password={true} />
            <Input placeholder="Confirm Password" password={true} />
          </View>
          <View style={styles.button_container}>
            <App_Button
              title={'Signup'}
              onPress={() =>
                // () => handleScreen()
                navigation.navigate(
                  'PremiumOtp',
                  // {select_type: select_type}
                )
              }
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
            <View style={styles.sign_in_row}>
              <Text style={styles.account}>Already have an account?</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PremiumLogin', {
                    // select_type: select_type,
                    // selPlan: selPlan,
                  })
                }>
                <Text style={styles.sign_in}>Sign In</Text>
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
    fontFamily: 'Regular',
    color: color.black,
  },
  button_container: {
    marginVertical: 40,
    marginTop: 10,
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
  sign_in_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.height / 5,
  },
  account: {
    fontSize: 16,
    fontFamily: FONTS.primarytext1,
    color: color.black,
  },
  sign_in: {
    fontSize: 16,
    fontFamily: FONTS.primarytext5,
    color: color.primary_color,
  },
});
