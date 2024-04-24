import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Keyboard} from 'react-native';
import Header from '../../components/Header';
import HamburgerHeader from '../../components/HamburgerHeader';
import color from '../../assets/theme/color';
import {FONTS, SIZES} from '../../assets/theme/theme';
import {ScrollView} from 'react-native';
import App_Button from '../../components/buttons/App_Button';
import Input2 from '../../components/inputs/Input2';
import * as qs from 'qs';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import Heading from '../../components/Heading';
import {useSelector} from 'react-redux';
import {API_URL} from '../../constants/Strings';

export default function DistributerContactUs({navigation}) {
  const [inputs, setInputs] = useState({
    email: '',
    name: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [count, setCount] = useState();
  const [cartData, setCartData] = useState([]);
  const reduxUser = useSelector(state => state.user);
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  var enquiryHeader = new Headers();
  enquiryHeader.append('accept', 'application/json');
  enquiryHeader.append('Content-Type', 'application/x-www-form-urlencoded');
  enquiryHeader.append('Cookie', 'PHPSESSID=1kl3o5lrc91q5tcc0t08rt1bq0');

  var enquirydata = qs.stringify({
    contact_enquiry: '1',
    name: inputs.name,
    email: inputs.email,
    message: inputs.message,
  });

  const processAddEnquiry = () => {
    Keyboard.dismiss();
    var valid = true;
    if (!inputs.name) {
      valid = false;
      handleError('Please enter name', 'name');
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

    if (!inputs.message) {
      handleError('Please enter your message', 'message');
      valid = false;
    }

    if (valid) {
      setLoading(true);
      axios
        .post(API_URL, enquirydata, {headers: enquiryHeader})
        .then(function (response) {
          console.log('enqresponce', response);
          if (response.data.success == 1) {
            setLoading(false);
            setInputs('');
            navigation.navigate('DistributerHomeStack');
            showMessage({
              message: 'Success',
              description: response.data.message,
              type: 'default',
              backgroundColor: 'green',
            });
          } else {
            setLoading(false);
            showMessage({
              message: 'Error',
              description: response.data.message,
              type: 'default',
              backgroundColor: color.red,
            });
          }
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
      <Header
        navigation={navigation}
        gotoCart={() => navigation.navigate('CheckoutStack')}
        cartCount={cartData == '' ? 0 : count}
      />
      <Heading HeadLine={'CONTACT US'} />
      <ScrollView>
        <View style={styles.imgView}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={require('../../assets/images/contact2.png')}
          />
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.bottomTxt}>GET IN TOUCH!</Text>
        </View>
        <View style={styles.inputOuterView}>
          <Input2
            value={inputs.name}
            label={'First Name'}
            placeholder="Enter here"
            error={errors.name}
            onChangeText={text => handleOnchange(text, 'name')}
            onFocus={() => handleError(null, 'name')}
          />
          <Input2
            value={inputs.email}
            label={'Email'}
            placeholder="Enter here"
            error={errors.email}
            onFocus={() => handleError(null, 'email')}
            onChangeText={text => handleOnchange(text, 'email')}
          />
          <Input2
            value={inputs.message}
            label={'Message'}
            placeholder="Enter here"
            onChangeText={text => handleOnchange(text, 'message')}
            onFocus={() => handleError(null, 'message')}
            error={errors.message}
            numberOfLines={4}
            textAlignVertical={'top'}
          />
        </View>
        <View style={styles.btnView}>
          <App_Button title={'Send'} onPress={processAddEnquiry} />
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
  imgView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    marginVertical: 10,
  },
  img: {
    height: SIZES.height / 4,
    width: SIZES.width / 1.1,
  },
  bottomView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTxt: {
    fontFamily: FONTS.primarytext2,
    color: color.dark_theme,
    fontSize: SIZES.h2,
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
    // marginBottom: 5,
  },
  Input: {
    borderWidth: 0.8,
    borderColor: color.black,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  btnView: {
    marginHorizontal: 40,
  },
  inputOuterView: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
