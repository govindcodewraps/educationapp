import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Keyboard,
} from 'react-native';
import LogoWithBackground from '../../components/LogoWithBackground';

import color from '../../assets/theme/color';
import Headline from '../../components/text/Headline';
import Input from '../../components/inputs/Input';
import App_Button from '../../components/buttons/App_Button';
import Social_Button from '../../components/buttons/Social_Button';
import {FONTS, SIZES} from '../../assets/theme/theme';
import validation from '../../constants/Validation';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as qs from 'qs';
import {connect} from 'react-redux';
import {storeNewUser} from '../../store/user/Action';
import {API_URL} from '../../constants/Strings';

const DistributerSignup = ({navigation, route, rdStoreUser}) => {
  // const {sub_type} = route.params;
  const sub_type = localStorage.getItem('user_type');
  console.log('sub_type', sub_type);

  const [apiStatus, setApiStatus] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const [errors, setErrors] = React.useState({});

  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
    name: '',
    mobileNo: '',
    confirmPassword: '',
  });

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const ProcessSignUp = () => {
    Keyboard.dismiss();
    var valid = true;

    if (!inputs.name) {
      valid = false;
      handleError('Please enter Your full name', 'name');
    } else if (!inputs.name.match(/^[A-Z a-z]+$/i)) {
      handleError('Enter Only Alphabets', 'name');
      valid = false;
    } else {
      handleError(false);
    }

    // var emailValid = false;
    if (!inputs.email) {
      handleError('Please enter your email', 'email');
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      valid = false;
    }

    if (!inputs.mobileNo) {
      valid = false;
      handleError('Please enter mobile number', 'mobileNo');
    } else if (!validation.VALID_NUM.test(inputs.mobileNo.trim())) {
      handleError('Please enter numbers only', 'mobileNo');
      valid = false;
    } else if (
      parseInt(inputs.mobileNo.trim().length) !=
      parseInt(validation.VALID_PHONE_LENGTH)
    ) {
      console.log(inputs.mobileNo.length);
      console.log(validation.VALID_PHONE_LENGTH);
      handleError('Please enter 10 digit mobile number', 'mobileNo');
      valid = false;
    }

    if (!inputs.password) {
      valid = false;
      handleError('Please enter your Password', 'password');
    } else if (inputs.password.length < 6) {
      handleError('Password should be minimum 6 characters', 'password');
    } else if (inputs.password.indexOf(' ') >= 0) {
      handleError('Password cannot contain spaces', 'password');
      valid = false;
    }

    if (!inputs.confirmPassword) {
      valid = false;
      handleError('please enter your Confirm Password', 'confirmPassword');
    } else if (inputs.password != inputs.confirmPassword) {
      handleError('password is not match', 'confirmPassword');
      valid = false;
    }

    if (valid) {
      setLoading(true);

      setApiStatus(!apiStatus);

      // var signUpData = new FormData();
      // signUpData.append('registration', '1');
      // signUpData.append('user_type', 'distributor');
      // signUpData.append('name', inputs.name);
      // signUpData.append('mobile', inputs.mobileNo);
      // signUpData.append('email', inputs.email);
      // signUpData.append('password', inputs.password);
      // signUpData.append('confirm_password', inputs.confirmPassword);
      var signUpData = qs.stringify({
        registration: '1',
        user_type: 'distributor',
        name: inputs.name,
        mobile: inputs.mobileNo,
        email: inputs.email,
        password: inputs.password,
        confirm_password: inputs.confirmPassword,
        sub_type: sub_type,
      });

      console.log('-------------------------------------------------');
      console.log('DistributerSignup.js, formdata : ', signUpData);

      var signUpHeader = new Headers();
      signUpHeader.append('accept', 'application/json');
      signUpHeader.append('Content-Type', 'application/x-www-form-urlencoded');
      signUpHeader.append('Cookie', 'PHPSESSID=u2jcj8bnk6e2kcj7hke0fdt0mm');

      axios
        .post(API_URL, signUpData, {headers: signUpHeader})
        .then(function (response) {
          console.log('signUpres ====>', response);

          if (response.data.success == 1) {
            setLoading(false);
            showMessage({
              message: 'success',
              description: response.data.message,
              type: 'default',
              backgroundColor: 'green',
            });

            const user = {
              id: response.data.data.user_details.id,
              name: inputs.name,
              mobile: inputs.mobileNo,
              email: inputs.email,
              user_type: response.data.data.user_details.user_type,
              sub_type: response.data.data.user_details.sub_type,
            };

            console.log('UserData', user);
            navigation.navigate('DistributerOtp', {
              user_id: response.data.data.user_details.id,
              user_otp: response.data.data.user_details.otp,
            });
            // navigation.navigate('DistributerLogin');
          } else {
            showMessage({
              message: 'Error',
              description: 'Distributor, '+response.data.message,
              type: 'default',
              backgroundColor: 'red',
            });
          }
          setApiStatus(false);
        })
        .catch(function (err) {
          console.log('err', err);
        });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.primary_color} />
      <ScrollView>
        <LogoWithBackground />
        {/* <Text>{selPlan}</Text> */}

        <View style={styles.main_container}>
          <Headline title={'sign up'} />
          <View style={styles.inputs}>
            <Input
              placeholder="Name"
              value={inputs.name}
              onChangeText={text => handleOnchange(text, 'name')}
              onFocus={() => handleError(null, 'name')}
              error={errors.name}
            />
            <Input
              placeholder={'Email'}
              value={inputs.email}
              onChangeText={text => handleOnchange(text, 'email')}
              onFocus={() => handleError(null, 'email')}
              error={errors.email}
            />
            <Input
              placeholder={'Mobile No'}
              value={inputs.mobileNo}
              onChangeText={text => handleOnchange(text, 'mobileNo')}
              onFocus={() => handleError(null, 'mobileNo')}
              error={errors.mobileNo}
            />

            <Input
              placeholder={'Password'}
              value={inputs.password}
              onChangeText={text => handleOnchange(text, 'password')}
              onFocus={() => handleError(null, 'password')}
              password
              error={errors.password}
            />
            <Input
              placeholder={'Confirm Password'}
              value={inputs.confirmPassword}
              onChangeText={text => handleOnchange(text, 'confirmPassword')}
              onFocus={() => handleError(null, 'confirmPassword')}
              password
              error={errors.confirmPassword}
            />
          </View>
          <View style={styles.button_container}>
            <App_Button
              title={'Signup'}
              // onPress={() =>
              //   // () => handleScreen()
              //   navigation.navigate(
              //     'DistributerOtp',
              //     // {select_type: select_type}
              //   )
              // }
              onPress={ProcessSignUp}
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
                  navigation.navigate('DistributerLogin', {
                    sub_type: sub_type,
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
};
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
    marginTop: SIZES.height / 48,
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

const mapStateToProps = state => {
  return {
    reduxUser: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    rdStoreUser: user => dispatch(storeNewUser(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DistributerSignup);
