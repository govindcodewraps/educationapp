import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  FlatList,
  Animated,
} from 'react-native';
import LogoWithBackground from '../../components/LogoWithBackground';
import AntDesign from 'react-native-vector-icons/AntDesign';

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

const DoctorSignup = ({navigation, route, rdStoreUser}) => {
  // const {sub_type} = route.params;
  const user_type = route.params.select_type;    //localStorage.getItem('user_type');
  console.log('DoctorSignup.js -----------------------user_type : ', route.params.select_type);

  const [apiStatus, setApiStatus] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const [DrCategory, set_DrCategory] = useState("Select");
  const [DrCategoryID, set_DrCategoryID] = useState("0");
  const [ModeLView, set_ModeLView] = useState("none");
  const [DrCategoryList, set_DrCategoryList] = useState([]);


  const [errors, setErrors] = React.useState({});

  const [inputs, setInputs] = React.useState({
    name: '',
    email: '',
    mobileNo: '',
    password: '',
    confirmPassword: '',
    hospital: '',
  });

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

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
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
    React.useEffect(()=>{
        FetchDrCategory();
    },[]);
  //--------------------------
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
        user_type: user_type,
        name: inputs.name,
        mobile: inputs.mobileNo,
        email: inputs.email,
        password: inputs.password,
        dr_category_id: DrCategoryID,
        confirm_password: inputs.confirmPassword,
        sub_type: DrCategory,
        hospital: inputs.hospital,
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
          console.log('signUpres ====>', response.data);

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
            navigation.navigate('DrOtpVerify', {
              user_id: response.data.data.user_details.id,
              user_otp: response.data.data.user_details.otp,
            });
            // navigation.navigate('DistributerLogin');
          } else {
            showMessage({
              message: 'Error',
              description: response.data.message,
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
//--------------------------------------
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
                  navigation.navigate('DrSignin', {
                    sub_type: user_type,
                    // selPlan: selPlan,
                  })
                }
              >
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
export default connect(mapStateToProps, mapDispatchToProps)(DoctorSignup);
