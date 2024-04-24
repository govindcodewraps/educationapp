import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import color from '../../assets/theme/color';
import Header from '../../components/Header';
import Input2 from '../../components/inputs/Input2';
// import CheckBox from '../../components/CheckBox';
// import {Checkbox} from 'react-native-paper';
import Heading from '../../components/Heading';
import VioletButton from '../../components/VioletButton';
import {FONTS, SIZES} from '../../assets/theme/theme';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import {useSelector} from 'react-redux';
import * as qs from 'qs';
import {showMessage} from 'react-native-flash-message';
import {API_URL} from '../../constants/Strings';
import Checkbox from 'expo-checkbox';
import BackButtonHeader from '../../components/BackButtonHeader';

export default function DistributerUpdateAddress({navigation, route}) {
  const reduxUser = useSelector(state => state.user);
  const {addressData} = route.params;
  console.log('addressData', addressData);

  const [userid, setUserId] = useState(reduxUser.customer.id);
  const [address, setAddress] = useState(addressData.address);
  const [addressId, setAddressId] = useState(addressData.id);

  const [stateId, setStateId] = useState(addressData.province_id);
  const [countryId, setCountryId] = useState(addressData.country_id);
  const [zipCode, setZipCode] = useState(addressData.postcode);
  const [city, setCity] = useState(addressData.city);

  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const [CountryList, setCountryList] = useState([]);
  const [getStateList, setStateList] = useState([]);
  const [placeid, setPlaceId] = useState(addressData.place);

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [count, setCount] = useState();
  const [cartData, setCartData] = useState([]);

  const down_img = require('../../assets/images/down.png');

  const handleCheckdata = () => {
    if (placeid == 1) {
      setIsChecked(!isChecked);
    } else {
      setIsChecked2(!isChecked2);
    }
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
    if (isChecked2 && placeid == 2) {
      setIsChecked2(!isChecked2);
    }
    setPlaceId('1');
  };
  const handleCheck2 = () => {
    setIsChecked2(!isChecked2);
    if (isChecked && placeid == 1) {
      setIsChecked(!isChecked);
    }
    setPlaceId('2');
  };

  const ProcessGetCountry = () => {
    var CountryListHeader = new Headers();
    CountryListHeader.append('accept', 'application/json');
    CountryListHeader.append(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );
    CountryListHeader.append('Cookie', 'PHPSESSID=vlr3nr52586op1m8ie625ror6b');

    // var CountryListData = new FormData();
    // CountryListData.append("countrylist", "1");

    var CountryListData = qs.stringify({
      countrylist: '1',
    });
    axios
      .post(API_URL, CountryListData, {headers: CountryListHeader})
      .then(function (response) {
        console.log('coun', response);
        if (response.data.success == 1) {
          setCountryList(response.data.data);
        } else {
          console.log('country not found');
        }
      });
  };

  const ProcessGetState = () => {
    var myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append('Cookie', 'PHPSESSID=vlr3nr52586op1m8ie625ror6b');

    // var formdata = new FormData();
    // formdata.append("countrylist", "1");
    // var formdata = qs.stringify({
    //   statelist: '1',
    //   country_id: countryId,
    // });

    axios
      .post(`${API_URL}?statelist=1&country_id=1`, {
        headers: myHeaders,
      })
      .then(function (response) {
        console.log('state', response);
        if (response.data.success == 1) {
          setStateList(response.data.data);
        } else {
          console.log('state data not found');
        }
      });
  };

  useEffect(() => {
    ProcessGetCountry();
    ProcessGetState();
    handleCheckdata();
  }, []);

  var myHeaders = new Headers();
  myHeaders.append('accept', 'application/json');
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  myHeaders.append('Cookie', 'PHPSESSID=vlr3nr52586op1m8ie625ror6b');

  var formdata = qs.stringify({
    updateaddress: '1',
    user_id: userid,
    address: address,
    country_id: countryId,
    province_id: stateId,
    postcode: zipCode,
    place: placeid,
    city: city,
    address_id: addressId,
  });
  console.log('addaddress', formdata);

  const ProcessUpdateAddress = () => {
    axios
      .post(API_URL, formdata, {
        headers: myHeaders,
      })
      .then(function (response) {
        console.log('AddAddress res', response);
        if (response.data.success == 1) {
          showMessage({
            message: 'Success',
            description: response.data.message,
            type: 'default',
            backgroundColor: 'green',
          });
          navigation.navigate('DistributerAddress');
        } else {
          showMessage({
            message: 'Fail',
            description: response.data.message,
            type: 'default',
            backgroundColor: color.red,
          });
        }
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
    <View style={{flex: 1, backgroundColor: color.white}}>
      <StatusBar backgroundColor={color.primary_color} />
      <BackButtonHeader
        navigation={navigation}
        gotoCart={() => navigation.navigate('CheckoutStack')}
        cartCount={cartData == '' ? 0 : count}
      />
      <Heading HeadLine={'UPDATE ADDRESS'} />
      <ScrollView>
        <View style={styles.parent}>
          <Input2
            label={'Address'}
            placeholder={'Address'}
            value={address}
            onChangeText={address => setAddress(address)}
          />
          <View style={styles.dropdownView}>
            <Text style={styles.label_text}>Country</Text>

            <View style={{flexDirection: 'row'}}>
              <SelectDropdown
                // data={CountryList.map((list, index) => list.country)}
                data={CountryList.map(item => item.country)}
                onSelect={selectedItem => {
                  console.log('selectedItem', selectedItem);
                  setCountryId(CountryList[0].id);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  CountryList[index].country;

                  console.log('selected', selectedItem);
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                defaultButtonText={addressData.country}
                buttonStyle={styles.dropdown}
                buttonTextStyle={styles.text_button}
                rowTextStyle={styles.row_text}
                dropdownStyle={styles.dropdown_style}
              />

              <Image style={styles.downimg} source={down_img}></Image>
            </View>
          </View>
          <View style={styles.dropdownView}>
            <Text style={styles.label_text}>State</Text>

            <View style={{flexDirection: 'row'}}>
              <SelectDropdown
                // data={CountryList.map((list, index) => list.country)}
                data={getStateList.map(item => item.province)}
                onSelect={(selectedItem, index) => {
                  console.log('selectedItem', selectedItem);
                  setStateId(getStateList[index].id);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  getStateList[index].province;

                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                defaultButtonText={addressData.province}
                buttonStyle={styles.dropdown}
                buttonTextStyle={styles.text_button}
                rowTextStyle={styles.row_text}
                dropdownStyle={styles.dropdown_style}
              />
              <Image style={styles.downimg} source={down_img}></Image>
            </View>
          </View>
          <Input2
            label={'City'}
            placeholder="Enter here"
            value={city}
            onChangeText={city => setCity(city)}
          />
          <Input2
            label={'zip'}
            placeholder="Enter here"
            value={zipCode}
            onChangeText={zipCode => setZipCode(zipCode)}
          />
          <View style={styles.checkBoxouterView}>
            <View style={styles.CheckBoxView}>
              <Checkbox
                styles={styles.CheckBox}
                value={isChecked}
                onValueChange={handleCheck}
                color={isChecked == true ? color.primary_color : undefined}
              />
              <Text
                style={{
                  fontFamily: FONTS.primarytext1,

                  color: color.black,
                  marginLeft: 3,
                  marginTop: 1.5,
                }}>
                Home
              </Text>
            </View>
            <View style={styles.CheckBoxView}>
              <Checkbox
                styles={styles.CheckBox}
                value={isChecked2}
                onValueChange={handleCheck2}
                color={isChecked2 == true ? color.primary_color : undefined}
              />
              <Text
                style={{
                  fontFamily: FONTS.primarytext1,

                  color: color.black,
                  marginLeft: 3,
                  marginTop: 1.5,
                }}>
                Other
              </Text>
            </View>
          </View>
          <View style={styles.btnView}>
            <VioletButton
              buttonName={'Save'}
              // onPress={() => navigation.navigate('DistributerAccountScreen')}
              onPress={ProcessUpdateAddress}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  checkBoxouterView: {
    flexDirection: 'row',
    // justifyContent: "center",
    alignItems: 'center',
    paddingTop: 20,
  },
  CheckBoxView: {
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  parent: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  btnView: {
    marginVertical: SIZES.height / 10,
    paddingHorizontal: SIZES.width / 10,
  },
  dropdownView: {
    marginVertical: 5,
  },
  label_text: {
    // color: color.black,
    // fontSize: 13,
    fontFamily: FONTS.primarytext1,
    marginBottom: 5,
  },
  downimg: {
    position: 'absolute',
    right: 0,
    // alignSelf:'center',
    height: 8,
    resizeMode: 'contain',
    top: '40%',
    tintColor: 'black',
  },
  dropdown: {
    borderRadius: 5,
    width: '100%',
    borderWidth: 2,
    borderColor: '#C6C6C8',
    backgroundColor: color.white,
  },
  text_button: {
    textAlign: 'left',
    fontSize: 14,
    alignSelf: 'center',
    justifyContent: 'center',
    color: color.black,
    fontFamily: FONTS.primarytext1,

    marginLeft: -1,
  },
  row_text: {
    fontSize: 16,
    alignSelf: 'center',
    justifyContent: 'center',
    color: color.black,
    fontFamily: FONTS.primarytext1,
  },
});
