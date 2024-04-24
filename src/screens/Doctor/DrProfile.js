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
  Animated,
  FlatList
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
import {useSelector} from 'react-redux';
import {getAsyncData, storeAsyncData} from '../../utils';
import {API_URL, ASYNC_LOGIN_KEY} from '../../constants/Strings';
import {showMessage} from 'react-native-flash-message';
import {storeUser} from '../../store/user/Action';
import {connect} from 'react-redux';
import * as qs from 'qs';

// import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrProfile = ({navigation, rdStoreUser, route}) => {
  // const {sub_type} = route.params;
  const reduxUser = useSelector(state => state.user);
  console.log('--------DrProfile.js------------------------redux', reduxUser);

  const sub_type2 = localStorage.getItem('user_type');
  console.log('user_type', sub_type2);
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = React.useState({
    name: '',
    email: '',
    mobileNo: '',
    password: '',
    confirmPassword: '',
    category: '',
    hospital: '',
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = React.useState({});

  const [DrCategory, set_DrCategory] = useState("Select");
  const [DrCategoryID, set_DrCategoryID] = useState("0");
  const [ModeLView, set_ModeLView] = useState("none");
  const [DrCategoryList, set_DrCategoryList] = useState([]);

  const [apiStatus, setApiStatus] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  console.log('userinfo', userInfo);
  const [rotateValue, setRotateValue] = useState(new Animated.Value(0));

  const handleAnimationClockW = () => {
    Animated.timing(rotateValue, {
      toValue: 180,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const handleAnimationAntiClockW = () => {
      Animated.timing(rotateValue, {
        toValue: -0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
          rotateValue.setValue(0);
        });
  };

  useEffect(() => {
    // Load the rememberMe value from AsyncStorage on component mount
    //loadRememberMeValue();
    //loadCredentials();
    LoadProfile();
    FetchDrCategory();
  }, []);
  //------------
  const LoadProfile = async () => {
    var loginHeaders = new Headers();
    loginHeaders.append('accept', 'application/json');
    loginHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    loginHeaders.append('Cookie', 'PHPSESSID=nchjkmv207jqqhdvms0f8ud04o');
  
    var userData = qs.stringify({
      profilelist: '1',
      user_id: reduxUser.customer.id,
    });
  
    axios
    .post(API_URL, userData, {
      headers: loginHeaders,
    })
    .then(function (response) {
      console.log('Response-------------------------------------------', response.data);
      if (response.data.success == 1) {
        setLoading(false);
        setInputs(prevState => ({...prevState, ['name']: response.data.data[0].name}));
        setInputs(prevState => ({...prevState, ['email']: response.data.data[0].email}));
        setInputs(prevState => ({...prevState, ['mobileNo']: response.data.data[0].mobile}));
        setInputs(prevState => ({...prevState, ['password']: response.data.data[0].mobile}));
        setInputs(prevState => ({...prevState, ['category']: response.data.data[0].mobile}));
        setInputs(prevState => ({...prevState, ['hospital']: response.data.data[0].hospital}));
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
  //--------------------------
  const FetchDrCategory = () => {
    var CategoryData = qs.stringify({
        dr_category_list: '1',
      });

      console.log('-------------------------------------------------');
      console.log('DoctorSignup.js, CategoryData : ', CategoryData);

      var signUpHeader = new Headers();
      signUpHeader.append('accept', 'application/json');
      signUpHeader.append('Content-Type', 'application/x-www-form-urlencoded');
      signUpHeader.append('Cookie', 'PHPSESSID=u2jcj8bnk6e2kcj7hke0fdt0mm');

      axios
        .post(API_URL, CategoryData, {headers: signUpHeader})
        .then(function (response) {
          console.log('Dr Category response ====>', response.data);

            if (response.data.success == 1) {
                set_DrCategoryList(response.data.data);
            }
        });
    }
  //------------
  const UpdateProfile = async () => {
    var loginHeaders = new Headers();
    loginHeaders.append('accept', 'application/json');
    loginHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    loginHeaders.append('Cookie', 'PHPSESSID=nchjkmv207jqqhdvms0f8ud04o');
  
    var userData = qs.stringify({
      editprofile: '1',
      user_id: reduxUser.customer.id,
      name: inputs.name,
      email: inputs.email,
      mobile: inputs.mobileNo,
      //user_sub_type: inputs.category,
      hospital: inputs.hospital,
    });
  
    axios
    .post(API_URL, userData, {
      headers: loginHeaders,
    })
    .then(function (response) {
      console.log('Response-------------------------------------------', response.data);
      if (response.data.success == 1) {
        setLoading(false);
        showMessage({
          message: 'success',
          description: response.data.message,
          type: 'default',
          backgroundColor: 'green',
        });
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

  //----------------------------
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
  //-----------------------------------
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
    //-----------------------------------
    const ShowCategoryList = (item, index) => {
      console.log("ShowModeList, item : ", item);
      return(
          <TouchableOpacity style={{flexDirection: 'column', width: "100%", marginTop: 10}}
              onPress={()=>{
                  set_DrCategory(item.name)
                  set_DrCategoryID(item.id)
                  set_ModeLView("none")
                  //set_SubmitBMarTop("0%")
                  handleAnimationAntiClockW();
                  if(item.mode == "Online"){
                      set_SubmitBMarTop("25%")
                  }
                  if(item.mode == "Offline"){
                      set_SubmitBMarTop("40%")
                  }
              }}>
              <Text style={{fontSize: 22, color: "#000000", marginLeft: 10}}>{item.name}</Text>
          </TouchableOpacity>
      );
  }

//------------------------------------------------------------
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.primary_color} />
      <ScrollView>
        <LogoWithBackground />
        {/* <Text>{selPlan}</Text> */}

        <View style={styles.main_container}>
          <Headline title={'Profile'} />
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
            <View style={{flexDirection: 'row', width: "100%", marginTop: 20}}>
                <Text style={{color: "#000000", fontSize: 17, marginTop: 10}}>Category :</Text>
                <TouchableOpacity style={{width: SIZES.width * 0.68, backgroundColor: "#F3F2F2",
                        height: SIZES.height * 0.05, fontSize: 17,
                        marginTop: 5, marginLeft: 10, alignItems: 'center',
                        borderRadius: 20, flexDirection: 'row'}}
                        onPress={()=> {
                            if(ModeLView == "none"){
                                set_ModeLView("flex");
                                handleAnimationClockW();
                            }else{
                                set_ModeLView("none");
                                handleAnimationAntiClockW();
                            }
                        }}>
                    <Text style={{color: "#000000", fontSize: 17, marginTop: 0,
                            marginLeft: 10, width: SIZES.width * 0.59}}>{DrCategory}</Text>
                     <Animated.View
                        style={{
                        transform: [{ rotate: rotateValue.interpolate({
                            inputRange: [0, 180],
                            outputRange: ["0deg", "180deg"],
                        }) }],
                        }}
                    >
                    <AntDesign name="caretdown" size={20} color="black"/>
                        </Animated.View>
                </TouchableOpacity>
            </View>
            <View style={{width: "76%", height: "35%", left: "26%", display: ModeLView,
                    backgroundColor: "#F3F2F2", marginTop: 3,
                    borderRadius: 20,
                }}>
                <FlatList contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false} nestedScrollEnabled
                    data={DrCategoryList} style={[styles.dropdownClass, {}]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => ShowCategoryList(item, index)}
                />
            </View>
            <Input
              placeholder="Hospital"
              value={inputs.hospital}
              onChangeText={text => handleOnchange(text, 'hospital')}
              onFocus={() => handleError(null, 'hospital')}
              error={errors.hospital}
            />

          </View>
          <View style={styles.button_container}>
            <App_Button
              title={'Update'}
              // onPress={() =>
              //   // () => handleScreen()
              //   navigation.navigate(
              //     'DistributerOtp',
              //     // {select_type: select_type}
              //   )
              // }
              onPress={UpdateProfile}
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

export default connect(mapStateToProps, mapDispatchToProps)(DrProfile);
