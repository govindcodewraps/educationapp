import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  Switch,
} from 'react-native';
import LogoWithBackground from '../../components/LogoWithBackground';

import color from '../../assets/theme/color';
import Headline from '../../components/text/Headline';
import Input from '../../components/inputs/Input';
// import CheckBox from '../../components/CheckBox';
import Checkbox from 'expo-checkbox';
import App_Button from '../../components/buttons/App_Button';
import Social_Button from '../../components/buttons/Social_Button';
import {FONTS, SIZES} from '../../assets/theme/theme';
import axios from 'axios';
import {getAsyncData, storeAsyncData} from '../../utils';
import {API_URL, ASYNC_LOGIN_KEY} from '../../constants/Strings';
import {showMessage} from 'react-native-flash-message';
import {storeUser} from '../../store/user/Action';
import {connect} from 'react-redux';
import * as qs from 'qs';

// import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DistributerLogin = ({navigation, rdStoreUser, reduxUser, route}) => {
  // const {sub_type} = route.params;
  const sub_type2 = localStorage.getItem('user_type');
  console.log('user_type', sub_type2);
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = React.useState({});

  const [apiStatus, setApiStatus] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // useEffect(() => {
  //   if (!infoLoaded) {
  //     getAsyncData(ASYNC_LOGIN_KEY).then(asUser => {
  //       console.log('AS', asUser);
  //       if (asUser != null) {
  //         var temp = JSON.parse(asUser);
  //         setUserInfo(temp);
  //       } else {
  //         console.log('notfound');
  //       }
  //     });
  //     setInfoLoaded(true);
  //   }
  // }, [infoLoaded]);

  console.log('userinfo', userInfo);

  useEffect(() => {
    // Load the rememberMe value from AsyncStorage on component mount
    loadRememberMeValue();
    loadCredentials();
  }, []);

  const loadCredentials = async () => {
    try {
      const storedCredentials = await AsyncStorage.getItem('credentials');
      if (storedCredentials !== null) {
        const {storedEmail, storedPassword} = JSON.parse(storedCredentials);
        setEmail(storedEmail);
        setPassword(storedPassword);
      }
    } catch (error) {
      console.log('Error loading stored credentials:', error);
    }
  };

  const loadRememberMeValue = async () => {
    try {
      const value = await AsyncStorage.getItem('rememberMe');
      if (value !== null) {
        setRememberMe(JSON.parse(value));
      }
    } catch (error) {
      console.log('Error loading rememberMe value:', error);
    }
  };

  const handleRememberMeToggle = async value => {
    setRememberMe(value);

    try {
      await AsyncStorage.setItem('rememberMe', JSON.stringify(value));

      if (!value) {
        // If "Remember Me" is disabled, clear the stored credentials
        await AsyncStorage.removeItem('credentials');
      }
    } catch (error) {
      console.log('Error saving rememberMe value:', error);
    }
  };

  const handleEmailChange = text => {
    setEmail(text);
  };

  const handlePasswordChange = text => {
    setPassword(text);
  };

  const handleSaveCredentials = async () => {
    if (rememberMe) {
      // Store the credentials if "Remember Me" is enabled
      try {
        const credentials = {
          storedEmail: email,
          storedPassword: password,
        };
        AsyncStorage.setItem('credentials', JSON.stringify(credentials));
      } catch (error) {
        console.log('Error saving credentials:', error);
      }
    } else {
      // Clear the stored credentials if "Remember Me" is disabled
      AsyncStorage.removeItem('credentials');
    }
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  var loginHeaders = new Headers();
  loginHeaders.append('accept', 'application/json');
  loginHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  loginHeaders.append('Cookie', 'PHPSESSID=nchjkmv207jqqhdvms0f8ud04o');

  // var loginData = new FormData();

  // loginData.append('login', '1');
  // loginData.append('email', inputs.email);
  // loginData.append('password', inputs.password);

  var loginData = qs.stringify({
    login: '1',
    email: email,
    password: password,
    user_type: 'distributor',
    sub_type: sub_type2,
  });

  console.log('formLoin', loginData);

  const processLogin = () => {
    Keyboard.dismiss();
    var valid = true;

    if (!email) {
      handleError('Please enter your email', 'email');
      valid = false;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      valid = false;
    }

    if (!password) {
      handleError('Please enter your password', 'password');
      valid = false;
    } else if (password.length < 5) {
      handleError('Min password length of 5', 'password');
      valid = false;
    }

    if (valid) {
      setApiStatus(!apiStatus);
      setLoading(true);

      axios
        .post(API_URL, loginData, {
          headers: loginHeaders,
        })
        .then(function (response) {
          console.log('LoginRes', response);
          if (response.data.success == 1) {
            setLoading(false);
            const user = {
              id: response.data.data.user_details.id,
              name: response.data.data.user_details.name,
              email: response.data.data.user_details.email,
              mobile: response.data.data.user_details.mobile,
              user_type: response.data.data.user_details.user_type,
              sub_type: response.data.data.user_details.sub_type,
            };
            console.log('---------------???????????????????????????user', user);
            storeAsyncData(ASYNC_LOGIN_KEY, response.data.data.user_details);
            rdStoreUser(user);
            handleSaveCredentials();
            showMessage({
              message: 'Success',
              description: response.data.message,
              type: 'default', 
              backgroundColor: 'green',
            });
            // navigation.replace('DistributerDrawerNavigator');
          } else {
            setLoading(false);
            showMessage({
              message: 'Not Valid',
              description: response.data.message,
              type: 'default',
              backgroundColor: color.red,
            });
          }

          setApiStatus(false);
        })
        .catch(function (error) {
          console.log('Error', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.primary_color} />
      <ScrollView>
        <LogoWithBackground />
        <View style={styles.main_container}>
          {/* <Text>{selPlan}</Text> */}
          <Headline title={'login'} />
          <View style={styles.inputs}>
            <Input
              placeholder={'Email'}
              value={email}
              onChangeText={handleEmailChange}
              // value={inputs.email}
              // onChangeText={(email) => setEmail(email)}
              // onChangeText={handleEmailChange}
              onFocus={() => handleError(null, 'email')}
              error={errors.email}
            />
            <Input
              placeholder={'Password'}
              value={password}
              onChangeText={handlePasswordChange}
              // value={inputs.password}
              // onChangeText={(password) => setPassword(password)}
              // onChangeText={handlePasswordChange}
              onFocus={() => handleError(null, 'password')}
              error={errors.password}
              password
            />
          </View>
          <View style={styles.checkbox_row}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Checkbox
                value={rememberMe}
                onValueChange={handleRememberMeToggle}
              />
              <Text style={[styles.text]}>Remember Me</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() =>
                navigation.navigate('DistributerForgetpassword', {
                  //   select_type: select_type,
                  //   selPlan: selPlan,
                })
              }>
              <Text style={styles.forget}>Forget Password ?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button_container}>
            <App_Button
              title={'login'}
              // onPress={() => navigation.navigate('CheckoutAddress')}
              onPress={processLogin}
              loading={loading}
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
                onPress={() =>
                  navigation.navigate('DistributerSignup', {
                    // select_type: select_type,
                  })
                }>
                <Text style={styles.signup}>Sign Up</Text>
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
    fontFamily: FONTS.primarytext1,
    color: color.black,
    marginLeft: 5,
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
    marginTop: SIZES.height / 24,
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
const mapStateToProps = state => {
  return {
    reduxUser: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    rdStoreUser: user => dispatch(storeUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DistributerLogin);
