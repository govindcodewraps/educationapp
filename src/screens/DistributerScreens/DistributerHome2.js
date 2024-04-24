import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, Pressable} from 'react-native';
import color from '../../assets/theme/color';
import {StatusBar} from 'react-native';
import Header from '../../components/Header';
import Carousel from '../../components/Carousel';
import {TouchableOpacity} from 'react-native';
import {SIZES} from '../../assets/theme/theme';
import * as qs from 'qs';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {API_URL} from '../../constants/Strings';

const DistributerHome2 = ({navigation, route}) => {
  const reduxUser = useSelector(state => state.user);
  console.log('redux', reduxUser);
  const [CheckcerticationData, setCheckCertificationData] = useState([]);
  const [certificateNumber, setCertificateNumber] = useState();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [count, setCount] = useState();
  const [cartData, setCartData] = useState([]);

  const processGetCertificationData = () => {
    var certificationHeader = new Headers();
    certificationHeader.append('accept', 'application/json');
    certificationHeader.append(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );
    certificationHeader.append(
      'Cookie',
      'PHPSESSID=vlr3nr52586op1m8ie625ror6b',
    );

    var certificationFormData = qs.stringify({
      check_certification: '1',
      user_id: reduxUser.customer.id,
    });
    axios
      .post(API_URL, certificationFormData, {headers: certificationHeader})
      .then(function (response) {
        if (response.data.success == 1) {
          setCheckCertificationData(response.data.data);
          setCertificateNumber(response.data.data.certification_no);
        }
        // else {
        //   showMessage({
        //     message: 'Fail',
        //     description: response.data.message,
        //     type: 'default',
        //     backgroundColor: 'red',
        //   });
        // }
      })
      .catch(error => console.log('error', error));
  };
  console.log('certificate', CheckcerticationData);

  const certificate = certificateNumber;

  useEffect(() => {
    processGetCertificationData();
    navigation.addListener('focus', () => processGetCertificationData());
  }, [navigation]);

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

  const Data = [
    {
      id: 1,
      Sec_name: (
        <>
          {!certificate ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('McqQuestionScreen')}>
              <View style={styles.btn}>
                <Text style={styles.btnTxt}>Apply for Certificate</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={true}
              onPress={() => navigation.navigate('McqQuestionScreen')}>
              <View style={[styles.btn, {backgroundColor: color.grey}]}>
                <Text style={styles.btnTxt}>Apply for Certificate</Text>
              </View>
            </TouchableOpacity>
          )}
        </>
      ),
    },
    {
      id: 2,
      Sec_name: (
        <>
          {CheckcerticationData.status == '1' ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DistributerHome');
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnTxt}>Buy Product</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SubmitCertificateNumberScreen');
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnTxt}>Buy Product</Text>
              </View>
            </TouchableOpacity>
          )}
        </>
      ),
    },
    {
      id: 3,
      Sec_name: (
        <TouchableOpacity>
          <View style={styles.btn}>
            <Text style={styles.btnTxt}>CME Points</Text>
          </View>
        </TouchableOpacity>
      ),
    },
    {
      id: 4,
      Sec_name: (
        <>
          {certificate ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('EventScreen')}>
              <View style={styles.btn}>
                <Text style={styles.btnTxt}>Events</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={true}
              onPress={() => navigation.navigate('EventScreen')}>
              <View style={[styles.btn, {backgroundColor: color.grey}]}>
                <Text style={styles.btnTxt}>Events</Text>
              </View>
            </TouchableOpacity>
          )}
        </>
      ),
    },
    {
      id: 5,
      Sec_name: (
        <TouchableOpacity>
          <View style={styles.btn}>
            <Text style={styles.btnTxt}>Visit Website</Text>
          </View>
        </TouchableOpacity>
      ),
    },
    {
      id: 6,
      Sec_name: (
        <TouchableOpacity
          onPress={() => navigation.navigate('DistributerOrderStack')}>
          <View style={styles.btn}>
            <Text style={styles.btnTxt}>My Orders</Text>
          </View>
        </TouchableOpacity>
      ),
    },
    {
      id: 7,
      Sec_name: (
        <>
          {CheckcerticationData.status == '1' ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('DistributerFavouriteStack')}>
              <View style={styles.btn}>
                <Text style={styles.btnTxt}>My Favorite</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={true}
              onPress={() => navigation.navigate('DistributerFavouriteStack')}>
              <View style={[styles.btn, {backgroundColor: color.grey}]}>
                <Text style={styles.btnTxt}>My Favorite</Text>
              </View>
            </TouchableOpacity>
          )}
        </>
      ),
    },
    {
      id: 8,
      Sec_name: (
        <>
          {CheckcerticationData.status == '1' ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('CheckoutStack')}>
              <View style={styles.btn}>
                <Text style={styles.btnTxt}>Products in Cart</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={true}
              onPress={() => navigation.navigate('CheckoutStack')}>
              <View style={[styles.btn, {backgroundColor: color.grey}]}>
                <Text style={styles.btnTxt}>Products in Cart</Text>
              </View>
            </TouchableOpacity>
          )}
        </>
      ),
    },
    {
      id: 9,
      Sec_name: (
        <TouchableOpacity
          onPress={() => navigation.navigate('DistributerAccountStack')}>
          <View style={styles.btn}>
            <Text style={styles.btnTxt}>My Profile</Text>
          </View>
        </TouchableOpacity>
      ),
    },
    {
      id: 10,
      Sec_name: (
        <TouchableOpacity
          onPress={() => navigation.navigate('DistributerOrderStack')}>
          <View style={styles.btn}>
            <Text style={styles.btnTxt}>History</Text>
          </View>
        </TouchableOpacity>
      ),
    },
    {
      id: 11,
      Sec_name: (
        <TouchableOpacity
          onPress={() => navigation.navigate('Doctors')}>
          <View style={styles.btn}>
            <Text style={styles.btnTxt}>Doctors</Text>
          </View>
        </TouchableOpacity>
      ),
    },
    {
      id: 12,
      Sec_name: (
        <TouchableOpacity
          onPress={() => navigation.navigate('BookedAppointmentList')}>
          <View style={styles.btn}>
            <Text style={styles.btnTxt}>Your Dr. Appointment</Text>
          </View>
        </TouchableOpacity>
      ),
    },
  ];

  const renderList = ({item, index}) => {
    return (
      <View style={styles.List_Sec}>
        <Text style={styles.btnTxt}>{item.Sec_name}</Text>
        <View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <StatusBar backgroundColor={color.primary_color} />

      {CheckcerticationData.status == '1' ? (
        <Header
          icon
          navigation={navigation}
          gotoCart={() => navigation.navigate('CheckoutStack')}
          cartCount={cartData == '' ? 0 : count}
        />
      ) : (
        <Header
          icon
          navigation={navigation}
          // gotoCart={() => navigation.navigate('CheckoutStack')}
        />
      )}

      <Carousel />
      <FlatList
        data={Data}
        renderItem={renderList}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </View>
  );
};

export default DistributerHome2;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.white,
  },
  List_Sec: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary_color,
    marginHorizontal: 10,
    marginVertical: 10,
    width: SIZES.width / 2.2,
    height: SIZES.height / 13,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  btnTxt: {
    fontSize: SIZES.h3,
    color: color.white,
    textAlign: 'center',
    // fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
  },
});
