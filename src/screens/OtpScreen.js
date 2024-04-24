import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import LogoWithBackground from '../components/LogoWithBackground';

import color from '../assets/theme/color';
import Headline from '../components/text/Headline';
import App_Button from '../components/buttons/App_Button';

export default function OtpScreen({navigation, route}) {
  // const {select_type, selPlan} = route.params;
  // console.log('select_type', select_type);

  // console.log('selPlan', selPlan);

  // const handleOtptoLogin = () => {
  //   if(selPlan == )
  // }

  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();

  const [otp1, setOtp1] = useState();
  const [otp2, setOtp2] = useState();
  const [otp3, setOtp3] = useState();
  const [otp4, setOtp4] = useState();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.primary_color} />
      <LogoWithBackground />
      <View style={styles.main_container}>
        <Headline title={'Enter Otp'} />
        <View style={styles.otpContainer}>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              // placeholder="0"
              keyboardType="number-pad"
              maxLength={1}
              autoFocus={true}
              ref={firstInput}
              onChangeText={text => {
                setOtp1(text);
                text && secondInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              // placeholder="0"
              keyboardType="number-pad"
              maxLength={1}
              ref={secondInput}
              onChangeText={text => {
                setOtp2(text);
                text ? thirdInput.current.focus() : firstInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              // placeholder="0"
              keyboardType="number-pad"
              maxLength={1}
              ref={thirdInput}
              onChangeText={text => {
                setOtp3(text);
                text
                  ? fourthInput.current.focus()
                  : secondInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              // placeholder="0"
              keyboardType="number-pad"
              maxLength={1}
              ref={fourthInput}
              onChangeText={text => {
                setOtp4(text);
              }}
            />
          </View>
        </View>
        <View style={styles.button_container}>
          <App_Button
            title={'Confirm'}
            onPress={() =>
              navigation.navigate('Login', {
                // select_type: select_type,
                // selPlan: selPlan,
              })
            }
          />
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
  otpContainer: {
    // marginHorizontal: 20,

    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red',
    marginTop: 30,
  },
  otpBox: {
    borderBottomWidth: 1,
    borderBottomColor: color.grey,
    // borderColor: color.gray,
    borderRadius: 5,
    marginHorizontal: 5,
    // width: 70,
  },
  otpText: {
    fontSize: 25,
    padding: 0,
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: 'Montserrat-SemiBold',
  },
  button_container: {
    marginVertical: 40,
    marginTop: 40,
  },
});
