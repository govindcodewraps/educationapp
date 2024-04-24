import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import * as qs from 'qs';
import color from '../../assets/theme/color';
import Header from '../../components/Header';
import {FONTS, SIZES} from '../../assets/theme/theme';
import {TouchableOpacity} from 'react-native';
// import Headline from '../../components/text/Headline';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import Headline2 from '../../components/text/Headline2';
import {API_URL} from '../../constants/Strings';
import {useSelector} from 'react-redux';
import BackButtonHeader from '../../components/BackButtonHeader';
const EventDetail = ({navigation, route}) => {
  const {eventId} = route.params;

  const [eventData, setEventData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [count, setCount] = useState();
  const [cartData, setCartData] = useState([]);
  const reduxUser = useSelector(state => state.user);

  const processGetEventList = () => {
    var eventDataHeader = new Headers();
    eventDataHeader.append('accept', 'application/json');
    eventDataHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    eventDataHeader.append('Cookie', 'PHPSESSID=vlr3nr52586op1m8ie625ror6b');

    var eventFormData = qs.stringify({
      event_details: '1',
      event_id: eventId,
    });

    axios
      .post(API_URL, eventFormData, {headers: eventDataHeader})
      .then(function (response) {
        if (response.data.success == 1) {
          setEventData(response.data.data);
          console.log('-------------------------->>>>>>>>>>>>>>>', response.data.data);
        } else {
          showMessage({
            message: 'Fail',
            description: response.data.message,
            type: 'default',
            backgroundColor: 'red',
          });
        }
      })
      .catch(error => console.log('error', error));
  };
  console.log('data', eventData);
  useEffect(() => {
    processGetEventList();
  }, []);

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

  const renderEventData = ({item, index}) => {
    return (
      <View style={styles.mainView}>
        <View style={styles.childView}>
          <View style={styles.iconMainView}>
            <View style={styles.iconView}>
              <MaterialCommunityIcons
                name="calendar-star"
                size={40}
                color={color.primary_color}
              />
            </View>
          </View>
          <View style={styles.infoView}>
            <View style={styles.txtView}>
              <Text style={styles.eventTxt}>EVENT NAME</Text>
              <Text style={styles.eventTxt2}>{item.event_name}</Text>
            </View>
          </View>
        </View>
        <Divider style={{marginVertical: SIZES.height / 50}} />

        <View style={styles.detailView}>
          <View style={styles.view1}>
            <Text style={styles.eventTxt}>EVENT DATE</Text>
            <Text
              style={[
                styles.eventTxt2,
                {fontFamily: FONTS.primarytext3, fontSize: SIZES.h3 - 2},
              ]}>
              {item.event_date}
            </Text>
          </View>
          <View style={styles.view2}>
            <Text style={styles.eventTxt}>TIME</Text>
            <Text
              style={[
                styles.eventTxt2,
                {fontFamily: FONTS.primarytext3, fontSize: SIZES.h3 - 2},
              ]}>
              {item.time}
            </Text>
          </View>
        </View>
        {
          item.metting_platform == 'Online' ? (
            <View style={styles.detailView}>
              <View style={styles.view1}>
                <Text style={styles.eventTxt}>EVENT LINK</Text>
                <Text
                  style={[
                    styles.eventTxt2,
                    {fontFamily: FONTS.primarytext3, fontSize: SIZES.h3 - 2},
                  ]}>
                  {item.link}
                </Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.eventTxt}>PLATFORM</Text>
                <Text
                  style={[
                    styles.eventTxt2,
                    {fontFamily: FONTS.primarytext3, fontSize: SIZES.h3 - 2},
                  ]}>
                  {item.metting_platform}
                </Text>
              </View>
            </View>
          ):(
            <View style={styles.detailView}>
              <View style={styles.view1}>
                <Text style={styles.eventTxt}>MEETING VENUE</Text>
                <Text
                  style={[
                    styles.eventTxt2,
                    {fontFamily: FONTS.primarytext3, fontSize: SIZES.h3 - 4},
                  ]}>
                  {item.vanue}
                </Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.eventTxt}>LOCATION</Text>
                <Text
                  style={[
                    styles.eventTxt2,
                    {fontFamily: FONTS.primarytext3, fontSize: SIZES.h3 - 4},
                  ]}>
                  {item.location}
                </Text>
              </View>
            </View>
          )
        }

        <View style={styles.descriptionView}>
          <Text style={styles.descTxt}>{item.description}</Text>
        </View>

        <Divider style={{marginTop: SIZES.height / 30}} />
        <View
          style={[
            styles.detailView,
            {paddingHorizontal: 10, paddingVertical: 10},
          ]}>
          <View style={styles.view1}>
            <Text
              style={[
                styles.eventTxt,
                {fontFamily: FONTS.primarytext3, fontSize: SIZES.h3 - 2},
              ]}>
              PRICE
            </Text>
          </View>
          <View style={styles.view2}>
            <Text
              style={[
                styles.eventTxt2,
                {fontFamily: FONTS.primarytext2, fontSize: SIZES.h3 - 2},
              ]}>
              ${item.price}
            </Text>
          </View>
        </View>

        <Divider style={{marginTop: SIZES.height / 64 - 10}} />
        <View style={styles.btnView}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('PaymentSuccessScreen')}
            style={styles.btn1}>
            <Text style={styles.btn1Txt}>PAY NOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  {
    /* <VioletButton buttonName={"Reorder"} /> */
  }

  return (
    <View style={styles.page}>
      <StatusBar backgroundColor={color.primary_color} />
      <BackButtonHeader
        navigation={navigation}
        gotoCart={() => navigation.navigate('CheckoutStack')}
        cartCount={cartData == '' ? 0 : count}
      />
      <Headline2 title={'Events'} />

      <FlatList
        data={eventData}
        keyExtractor={item => item.id}
        renderItem={renderEventData}
      />
    </View>
  );
};

export default EventDetail;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.white,
  },
  headingView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  headingTxt: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
  },
  mainView: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: color.light_grey,
    borderRadius: 10,
    paddingHorizontal: SIZES.width / 20,
    paddingVertical: SIZES.height / 40,
    marginHorizontal: SIZES.width / 30,
    backgroundColor: color.white,
    marginBottom: 10,
    marginTop: 15,
    elevation: 4,
  },
  firstView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // marginBottom: SIZES.height / 50,
    // borderBottomWidth: 0.4,
    // borderBottomColor: color.black,
    // paddingHorizontal:
    // backgroundColor: 'red',
  },
  btnView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    marginTop: 20,
  },
  btn: {
    backgroundColor: color.primary_color,
    paddingHorizontal: SIZES.width / 30,
    paddingVertical: SIZES.height / 64,
    borderRadius: 5,
    // height: 35,
  },
  btnTxt: {
    color: color.white,
    fontWeight: 'bold',
    fontSize: SIZES.h4 - 2,
  },
  txt: {
    fontSize: SIZES.h3 - 2,
    fontWeight: 'bold',
  },
  childView: {
    flex: 1,
    flexDirection: 'row',
  },
  iconMainView: {
    flex: 0.4,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  iconView: {
    backgroundColor: color.grey,
    height: 80,
    width: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  txtView: {
    marginBottom: 10,
  },
  eventTxt: {
    fontSize: SIZES.h3 - 6,
    fontFamily: FONTS.primarytext1,
  },
  eventTxt2: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.primarytext2,
    color: color.black,
  },
  eventDateTxt: {
    color: color.black,
  },
  btn1: {
    paddingHorizontal: SIZES.width / 3.1,
    paddingVertical: SIZES.height / 64,
    borderRadius: 5,
    backgroundColor: color.primary_color,
  },
  btn1Txt: {
    color: color.white,
    fontFamily: FONTS.primarytext3,
  },
  detailView: {
    marginVertical: SIZES.height / 64 - 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  view1: {
    alignItems: 'flex-start',
  },
  view2: {
    alignItems: 'flex-end',
  },
  descriptionView: {
    backgroundColor: color.grey + '30',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.height / 64 - 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 5,
  },
  descTxt: {
    textAlign: 'justify',
    fontSize: SIZES.h3 - 4,
    fontFamily: FONTS.primarytext1,
  },
});
