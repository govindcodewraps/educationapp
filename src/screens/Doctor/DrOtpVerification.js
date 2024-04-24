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
import LogoWithBackground from '../../components/LogoWithBackground';

import color from '../../assets/theme/color';
import Headline from '../../components/text/Headline';
import App_Button from '../../components/buttons/App_Button';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import * as qs from 'qs';
import {connect} from 'react-redux';
import {storeNewUser, storeUser, verifyNewUser} from '../../store/user/Action';
import {storeAsyncData} from '../../utils';
import {API_URL, ASYNC_LOGIN_KEY} from '../../constants/Strings';

const DrOtpVerification = ({
  navigation,
  route,
  rdStoreUser,
  reduxUser,
  rdVerifyNewUser,
}) => {
  const {user_id, user_otp} = route.params;
  console.log('reduxuser ====>', reduxUser);
  const [apiStatus, setApiStatus] = useState(false);
  const [otpError, setOtpError] = useState(false);

  //   const {select_type, selPlan} = route.params;
  //   console.log('select_type', select_type);

  //   console.log('selPlan', selPlan);

  // const handleOtptoLogin = () => {
  //   if(selPlan == )
  // }

  console.log('-----------------Dr OTP Verification.js-----------------user id : ', user_id, "OTP : ", user_otp);

  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();

  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  // const otpValue = `${otp1}${otp2}${otp3}${otp4}`;

  const processOtpVerify = () => {
    var valid = true;
    let enterOtp = otp1 + otp2 + otp3 + otp4;
    if (enterOtp != user_otp) {
      valid = false;
      showMessage({
        message: 'Error',
        description: 'Please enter valid otp',
        type: 'default',
        backgroundColor: color.red,
      });
    } else {
      setOtpError(false);
    }

    if (valid) {
      var otpHeaders = new Headers();
      otpHeaders.append('accept', 'application/json');
      otpHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
      otpHeaders.append(
        'access_token',
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsImFjY2Vzc190b2tlbiI6IjEyMzQ1NiJ9.6QKlCUhW2RcT8lCTdOOi3SZ3ZOjF3yqohUv-4chmG1s',
      );
      otpHeaders.append('Cookie', 'PHPSESSID=cno6k33a2doq5q5060mrf4q6vl');

      // var otpdata = new FormData();
      // otpdata.append('verify_otp', '1');
      // otpdata.append('otp', user_otp);
      // otpdata.append('user_id', user_id);
      var otpdata = qs.stringify({
        verify_otp: '1',
        otp: user_otp,
        user_id: user_id,
      });
      console.log('formdata', otpdata);

      axios
        .post(API_URL, otpdata, {headers: otpHeaders})
        .then(function (response) {
          console.log('otpres', response);
          if (response.data.success == 1) {
            const user = {
              id: response.data.data.user_details.id,
              name: response.data.data.user_details.first_name,
              mobile: response.data.data.user_details.mobile,
              email: response.data.data.user_details.email,
              user_type: response.data.data.user_details.user_type,
              sub_type: response.data.data.user_details.sub_type,
            };
            // storeAsyncData(ASYNC_LOGIN_KEY, user);

            // rdStoreUser(user);
            // rdVerifyNewUser();
            console.log('userotp', user);

            showMessage({
              message: 'success',
              description: response.data.message,
              type: 'default',
              backgroundColor: 'green',
            });
            navigation.navigate('DistributerLogin');
          } else {
            showMessage({
              message: 'Error',
              description: response.data.message,
              type: 'default',
              backgroundColor: color.red,
            });
          }
          setApiStatus(false);
        })
        .catch(error => {
          console.log('err', error);
        });
    }
  };

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
              value={otp1}
              onChangeText={text => {
                setOtp1(text);
                text.length >= 1 && secondInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              // placeholder="0"
              keyboardType="number-pad"
              maxLength={1}
              // autoFocus={true}
              ref={secondInput}
              value={otp2}
              onChangeText={text => {
                setOtp2(text);
                text.length >= 1
                  ? thirdInput.current.focus()
                  : firstInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              // placeholder="0"
              keyboardType="number-pad"
              // autoFocus={true}
              maxLength={1}
              ref={thirdInput}
              value={otp3}
              onChangeText={text => {
                setOtp3(text);
                text.length >= 1
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
              value={otp4}
              onChangeText={text => {
                setOtp4(text);
                text.length < 1 && thirdInput.current.focus();
              }}
              // autoFocus={true}
            />
          </View>
        </View>

        <View style={styles.button_container}>
          <App_Button
            title={'Confirm'}
            // onPress={() =>
            //   navigation.navigate('DistributerLogin', {
            //     // select_type: select_type,
            //     // selPlan: selPlan,
            //   })
            // }
            onPress={processOtpVerify}
          />
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
const mapStateToProps = state => {
  return {
    reduxUser: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    rdVerifyNewUser: () => dispatch(verifyNewUser()),

    rdStoreUser: user => dispatch(storeNewUser(user)),
    // rdStoreRecovery: (info) => dispatch(setForRecovery(info)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrOtpVerification);
