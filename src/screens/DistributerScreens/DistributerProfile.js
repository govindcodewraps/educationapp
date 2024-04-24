import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import color from '../../assets/theme/color';
import {FONTS, SIZES} from '../../assets/theme/theme';

import {Divider} from 'react-native-paper';
import GenderDropdown from '../../components/GenderDropdown';
import QualificationDropdown from '../../components/QualificationDropdown';
import App_Button from '../../components/buttons/App_Button';
import {connect, useSelector} from 'react-redux';
import axios from 'axios';

import {API_URL, ASYNC_LOGIN_KEY} from '../../constants/Strings';
import storeAsyncData from '../../utils';
import {storeUser} from '../../store/user/Action';
import * as qs from 'qs';
import {showMessage} from 'react-native-flash-message';
import SelectDropdown from 'react-native-select-dropdown';
import BackButtonHeader from '../../components/BackButtonHeader';
const down_img = require('../../assets/images/down.png');

const DistributerProfile = ({navigation, rdStoreUser, reduxUser}) => {
  // const reduxUser = useSelector(state => state.user);
  const GenderList = ['Male', 'Female', 'Other'];

  console.log('reduxuser', reduxUser);
  const [id, setId] = useState(reduxUser.customer.id);
  const [name, setName] = useState(reduxUser.customer.name);
  const [mobile, setMobile] = useState(reduxUser.customer.mobile);
  const [email, setEmail] = useState(reduxUser.customer.email);
  const [gender, setGender] = useState();

  const [count, setCount] = useState();
  const [cartData, setCartData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  console.log('redux', reduxUser.customer.id);

  const [apiStatus, setApiStatus] = useState(false);

  const processUpdateProfile = () => {
    var valid = true;

    if (valid) {
      setApiStatus(!apiStatus);

      var updateHeader = new Headers();
      updateHeader.append('accept', 'application/json');
      updateHeader.append('Content-Type', 'application/x-www-form-urlencoded');
      updateHeader.append('Cookie', 'PHPSESSID=vlr3nr52586op1m8ie625ror6b');

      var UpdateData = qs.stringify({
        editprofile: '1',
        user_id: id,
        name: name,
        mobile: mobile,
        email: email,
        // gender: gender,
      });
      console.log('form data', UpdateData);

      axios
        .post(API_URL, UpdateData, {
          headers: updateHeader,
        })
        .then(function (response) {
          console.log('update res', response);

          if (response.data.success == 1) {
            const user = {
              id: id,
              name: name,
              email: email,
              mobile: mobile,
            };

            // storeAsyncData(ASYNC_LOGIN_KEY, user);
            rdStoreUser(user);
            showMessage({
              message: 'success',
              description: response.data.message,
              type: 'default',
              backgroundColor: 'green',
            });
            navigation.goBack();
          } else {
            showMessage({
              message: 'fail',
              description: response.data.message,
              type: 'default',
              backgroundColor: 'red',
            });
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };

  const processGetcartData = () => {
    var getcartHeader = new Headers();
    getcartHeader.append('accept', 'application/json');
    getcartHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    getcartHeader.append('Cookie', 'PHPSESSID=suum1ijkct2niss9cppuoem8v1');

    var getcartFormdata = qs.stringify({
      viewcart: '1',
      user_id: reduxUser.customer.id,
    });

    if (!isDataLoaded) {
      axios
        .post(API_URL, getcartFormdata, {headers: getcartHeader})
        .then(function (response) {
          console.log('cart res ===||==', response);

          if (response.data.success == 0) {
            setCount(response.data.total_product);
          }
          setCartData(response.data.data);
          setCount(response.data.total_product);
        });
    }
  };
  console.log('count', count);

  useEffect(() => {
    processGetcartData();
    navigation.addListener('focus', () => processGetcartData());
  }, []);

  return (
    <View style={styles.container}>
      <BackButtonHeader
        navigation={navigation}
        gotoCart={() => navigation.navigate('CheckoutStack')}
        cartCount={cartData == '' ? 0 : count}
      />
      <ScrollView>
        <View style={styles.upperView}>
          <View>
            <Text style={styles.profileTxt}>PROFILE IMAGE</Text>
          </View>
          <View style={styles.imgView}>
            <Image
              style={styles.img}
              resizeMode="contain"
              source={require('../../assets/images/profile2.png')}
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.addTxt}>Add Profile</Text>
          </TouchableOpacity>
        </View>
        <Divider style={{marginHorizontal: 30, marginVertical: 20}} />
        <View style={styles.inputView}>
          <View style={styles.section}>
            <Text style={styles.inputTxt}>First Name</Text>
            <TextInput
              style={styles.Input}
              placeholder={name}
              value={name}
              onChangeText={name => setName(name)}
            />
          </View>

          {/* <View style={styles.section}>
            
            <Text style={styles.label_text}>Gender</Text>

            <SelectDropdown
              data={GenderList}
              buttonTextAfterSelection={(selectedItem, index) => {
                setGender(selectedItem);
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              defaultButtonText={gender}
              buttonStyle={styles.dropdown}
              buttonTextStyle={styles.text_button}
              rowTextStyle={styles.row_text}
              dropdownStyle={styles.dropdown_style}
            />
            <Image style={styles.downimg} source={down_img}></Image>
          </View> */}
          <View style={styles.section}>
            <Text style={styles.inputTxt}>Phone no.</Text>
            <TextInput
              style={styles.Input}
              placeholder={mobile}
              value={mobile}
              onChangeText={mobile => setMobile(mobile)}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.inputTxt}>Email Address</Text>
            <TextInput
              style={styles.Input}
              placeholder={email}
              value={email}
              onChangeText={email => setEmail(email)}
            />
          </View>
        </View>
        <View style={styles.btnView}>
          <App_Button
            title={'Save'}
            // onPress={() => navigation.navigate('DistributerAccountScreen')}
            onPress={processUpdateProfile}
          />
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
  upperView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    // backgroundColor: 'red',
  },
  profileTxt: {
    fontFamily: FONTS.primarytext2,
    color: color.black,
  },
  imgView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  img: {
    height: SIZES.height / 8,
    width: SIZES.width / 4,
  },
  addTxt: {
    fontFamily: FONTS.Rubik_Bold,
    color: color.primary_color,
  },
  inputView: {
    paddingHorizontal: 10,
  },
  section: {
    marginVertical: 8,
  },
  inputTxt: {
    fontFamily: FONTS.primarytext2,
    marginBottom: 5,
  },
  Input: {
    borderWidth: 0.8,
    borderColor: color.black,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  btnView: {
    marginVertical: 30,
    marginHorizontal: 40,
  },
  label_text: {
    // color: color.black,
    // fontSize: 13,
    fontFamily: FONTS.Rubik_medium,
    marginBottom: 5,
  },
  dropdown: {
    borderRadius: 5,
    width: '100%',
    borderWidth: 0.8,
    borderColor: color.gray,
    backgroundColor: color.white,
  },
  text_button: {
    textAlign: 'left',
    fontSize: 14,
    alignSelf: 'center',
    justifyContent: 'center',
    color: color.black,
    fontFamily: 'Montserrat-Medium',
    marginLeft: -1,
  },
  row_text: {
    fontSize: 16,
    alignSelf: 'center',
    justifyContent: 'center',
    color: color.black,
    fontFamily: 'Montserrat-Medium',
  },
  dropdown_style: {
    borderRadius: 10,
    // backgroundColor: 'red',
  },
  downimg: {
    position: 'absolute',
    right: 0,
    // alignSelf:'center',
    height: 8,
    resizeMode: 'contain',
    top: '60%',
    tintColor: 'black',
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

export default connect(mapStateToProps, mapDispatchToProps)(DistributerProfile);
