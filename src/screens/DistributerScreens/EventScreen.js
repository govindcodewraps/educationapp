import {Keyboard, FlatList, StatusBar, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import * as qs from 'qs';

import color from '../../assets/theme/color';
import Header from '../../components/Header';
import {FONTS, SIZES} from '../../assets/theme/theme';
import {TouchableOpacity} from 'react-native';
import Headline from '../../components/text/Headline';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Headline2 from '../../components/text/Headline2';
import {API_URL} from '../../constants/Strings';
import {useSelector} from 'react-redux';
import BackButtonHeader from '../../components/BackButtonHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';
import CreateEvents from './CreateEvents';

const EventScreen = ({navigation}) => {
  const [eventListData, setEventListData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [count, setCount] = useState();
  const [ActiveList_Create, set_ActiveList_Create] = useState(0);
  const reduxUser = useSelector(state => state.user);
  const [isKeyboardVisible, set_KeyboardVisible] = useState("0%");

  const processGetEventList = () => {
    setIsDataLoaded(true);
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
      console.log("KeyBoard is Open");
          set_KeyboardVisible("-3%");
          //isKeyboardVisible = "-8%";
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            console.log("KeyBoard is Close");
            set_KeyboardVisible("0%");
            //isKeyboardVisible = "0%";
        },
    );

    var eventListHeader = new Headers();
    eventListHeader.append('accept', 'application/json');
    eventListHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    eventListHeader.append('Cookie', 'PHPSESSID=vlr3nr52586op1m8ie625ror6b');

    var eventListData = qs.stringify({
      event_list: '1',
    });

    axios
      .post(API_URL, eventListData, {headers: eventListHeader})
      .then(function (response) {
        if (response.data.success == 1) {
          setEventListData(response.data.data);
          console.log("EventScreen.js,------------------ Event List : ", response.data.data);
          setTimeout(()=> setIsDataLoaded(false), 50);
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
  // console.log('data', eventData);
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
  //----------------------------------------------
  const renderEventData = ({item, index}) => {
    //console.log("Item : ", item);
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
            <View style={styles.txtView}>
              <Text style={styles.eventTxt}>EVENT DATE</Text>
              <Text style={styles.eventDateTxt}>{item.event_date}</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={()=>{
              showMessage({
                message: 'Success',
                description: "Hello",
                type: 'default',
                backgroundColor: 'green',
              });
            }}
            style={styles.touchableOpacityStyle}>
            <Ionicons name="md-chatbubble-ellipses-outline" size={30}
              color={color.primary_color} style={styles.floatingB} />
          </TouchableOpacity>

        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate('EventDetail', {eventId: item.id})
            }
            style={[styles.btn1]}>
            <Text style={styles.btn1Txt}>VIEW DETAILS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn1} activeOpacity={0.6}
            onPress={() =>
              navigation.navigate('BookEvent', {UserDetail: reduxUser.customer,
                                                EventID: item.id})
            }>
            <Text style={styles.btn1Txt}>BOOK EVENT</Text>
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
      <View style={{width: SIZES.width, marginTop: 5,
        height: SIZES.height * 0.07, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

          <TouchableOpacity style={{width: "47%", height: "80%", alignItems: 'center',
            justifyContent: 'center', borderRadius: 20,
            backgroundColor: ActiveList_Create == 0? color.primary_color : "#E6E6E6",
            elevation: ActiveList_Create == 0? 30:0}}
            onPress={()=> {
              processGetEventList();
              set_ActiveList_Create(0);
            }}>
              <Text style={{color: ActiveList_Create == 1? "#000000" : "#FFFFFF",
                fontSize: 15, fontWeight: 'bold',
                width: "50%", height: "100%", textAlign: 'center',
                marginTop: 20}}>{"Event List"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width: "47%", height: "80%", alignItems: 'center',
            justifyContent: 'center', borderRadius: 20, marginLeft: 10,
            backgroundColor: ActiveList_Create == 1? color.primary_color : "#E6E6E6",
            elevation: ActiveList_Create == 1? 30:0}}
            onPress={()=> set_ActiveList_Create(1)}>
            <Text style={{color: ActiveList_Create == 0? "#000000" : "#FFFFFF",
              fontSize: 15, fontWeight: 'bold',
              width: "50%", height: "100%", textAlign: 'center',
              marginTop: 20}}>{"Create Event"}</Text>
          </TouchableOpacity>

      </View>
      {
        ActiveList_Create == 0 ? (
          isDataLoaded ? (
            <ActivityIndicator/>
          ):(
            <FlatList
              data={eventListData}
              keyExtractor={item => item.id}
              renderItem={renderEventData}
            />
          )
        ):(
          <CreateEvents USER_ID = {reduxUser.customer.id}/>
        )
        
      }


    </View>
  );
};

export default EventScreen;

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
    marginTop: 10,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    flexDirection: 'row',
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
    color: color.black,
    fontFamily: FONTS.primarytext2,
  },
  eventDateTxt: {
    color: color.black,
    fontFamily: FONTS.primarytext3,
    fontSize: SIZES.h3 - 4,
  },
  btn1: {
    paddingHorizontal: SIZES.width / 16,
    paddingVertical: SIZES.height / 64,
    borderRadius: 5,
    backgroundColor: color.primary_color,
  },
  btn1Txt: {
    color: color.white,
    fontFamily: FONTS.primarytext3,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    elevation: 15,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 1,
    top: 0,
  },
  floatingB: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 40,
    elevation: 15,
  },

});
