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
import Heading from '../../components/Heading';
import BackButtonHeader from '../../components/BackButtonHeader';
const down_img = require('../../assets/images/down.png');

const SubmitEnqFormScreen = ({navigation, rdStoreUser, reduxUser, route}) => {
  // const reduxUser = useSelector(state => state.user);

  const {grandTotal} = route.params;
  const [id, setId] = useState(reduxUser.customer.id);
  const [name, setName] = useState(reduxUser.customer.name);
  const [mobile, setMobile] = useState(reduxUser.customer.mobile);
  const [email, setEmail] = useState(reduxUser.customer.email);
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [apiStatus, setApiStatus] = useState(false);
  const [count, setCount] = useState();
  const [cartData, setCartData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [inputs, setInputs] = React.useState({
    // email: "",
    // name: "",
    message: '',
    address: '',
  });

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const processSubmitEnquiry = () => {
    var enquiryHeader = new Headers();
    enquiryHeader.append('accept', 'application/json');
    enquiryHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    enquiryHeader.append('Cookie', 'PHPSESSID=suum1ijkct2niss9cppuoem8v1');

    var enquiryData = qs.stringify({
      submit_enquiry: '1',
      user_id: id,
      total_price: grandTotal,
      name: name,
      email: email,
      mobile: mobile,
      address: inputs.address,
      message: inputs.message,
    });

    axios
      .post(API_URL, enquiryData, {headers: enquiryHeader})
      .then(function (response) {
        console.log('enqu', response);

        if (response.data.success == 1) {
          showMessage({
            message: 'Success',
            description: response.data.message,
            type: 'success',
          });
          navigation.navigate('EnquirySuccess');
        } else {
          showMessage({
            message: 'Fail',
            description: response.data.message,
            type: 'fail',
          });
        }
      })
      .catch(function (error) {
        console.log('Error', error);
      });
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
      {/* <Header
        navigation={navigation}
        gotoCart={() => navigation.navigate('CheckoutStack')}
      /> */}
      <BackButtonHeader
        navigation={navigation}
        gotoCart={() => navigation.navigate('CheckoutStack')}
        cartCount={cartData == '' ? 0 : count}
      />
      <ScrollView>
        <Heading HeadLine={'Submit your enquiry'} />
        <View style={styles.inputView}>
          <View style={styles.section}>
            <Text style={styles.inputTxt}>First Name</Text>
            <TextInput
              style={styles.input_box}
              placeholder={name}
              value={name}
              onChangeText={name => setName(name)}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.inputTxt}>Phone no.</Text>
            <TextInput
              style={styles.input_box}
              placeholder={mobile}
              value={mobile}
              onChangeText={mobile => setMobile(mobile)}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.inputTxt}>Email Address</Text>
            <TextInput
              style={styles.input_box}
              placeholder={email}
              value={email}
              onChangeText={email => setEmail(email)}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.inputTxt}>Address</Text>
            <TextInput
              style={styles.input_box}
              placeholder="Enter Your Full Address"
              value={inputs.address}
              onChangeText={text => handleOnchange(text, 'address')}
              onFocus={() => handleError(null, 'address')}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.inputTxt}>Message</Text>
            <TextInput
              placeholder={'Enter your enquiry....'}
              value={inputs.message}
              onChangeText={text => handleOnchange(text, 'message')}
              onFocus={() => handleError(null, 'message')}
              error={errors.message}
              numberOfLines={4}
              textAlignVertical={'top'}
              style={styles.input_box}
            />
          </View>
        </View>
        <View style={styles.btnView}>
          <App_Button
            title={'Submit'}
            // onPress={() => navigation.navigate('DistributerAccountScreen')}
            onPress={processSubmitEnquiry}
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
    fontFamily: FONTS.Rubik_Bold,
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
    fontFamily: FONTS.Rubik_medium,
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
  input_box: {
    borderWidth: 2,
    borderColor: color.primary_color,
    borderRadius: 4,
    fontFamily: 'SemiBold',
    paddingVertical: 5,
    paddingHorizontal: 10,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitEnqFormScreen);
