import {Keyboard, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import * as qs from 'qs';
import Headline2 from '../../components/text/Headline2';
import BackButtonHeader from '../../components/BackButtonHeader';

import {FONTS, SIZES} from '../../assets/theme/theme';
import color from '../../assets/theme/color';
import {showMessage} from 'react-native-flash-message';
import { API_URL } from '../../constants/Strings';
let CuresorPost = 0;

const BookEvent = ({navigation, route}) => {
  console.log("BookEvent.js--------------------, route : ", route);

    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [cartData, setCartData] = useState([]);
    const [Name, set_Name] = useState(route.params.UserDetail.name);
    const [Contact, set_ContactNo] = useState(route.params.UserDetail.mobile);
    const [EmailID, set_EmailID] = useState(route.params.UserDetail.email);
    const [Remarks, set_Remarks] = useState("");
    const [Price, set_Price] = useState(0);
    const [isKeyboardVisible, set_KeyboardVisible] = useState("0%");

    useEffect(()=>{
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
              console.log("KeyBoard is Open");
              if(CuresorPost == 1)
              set_KeyboardVisible("-30%");
              console.log("---------------------------------------Name, CuresorPost : ", CuresorPost);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
              console.log("KeyBoard is Close");
              set_KeyboardVisible("0%");
            },
        );
        //----------------------------------
        var eventDataHeader = new Headers();
        eventDataHeader.append('accept', 'application/json');
        eventDataHeader.append('Content-Type', 'application/x-www-form-urlencoded');
        eventDataHeader.append('Cookie', 'PHPSESSID=vlr3nr52586op1m8ie625ror6b');
    
        var eventFormData = qs.stringify({
          event_details: '1',
          event_id: route.params.EventID,
        });
    
        axios
          .post(API_URL, eventFormData, {headers: eventDataHeader})
          .then(function (response) {
            if (response.data.success == 1) {
              set_Price(response.data.data[0].price);
              console.log('-------------------------->>>>>>>>>>>>>>>', response.data.data[0].price);
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



    }, []);
    //-----------------------------------
    const SubmitToServer = () => {
      //console.log('SubmitToServer ====> ', EventModeDes.length, EventDes.length);
      if(Name.length > 0 && Contact.length > 5 && EmailID.length > 6){
          setIsDataLoaded(true);
          var EventData = qs.stringify({
              book_event: '1',
              user_id: route.params.UserDetail.id,
              evnet_name: Name,
              contact: Contact,
              email: EmailID,
              event_id: route.params.EventID,
              remark: Remarks,
              payment_type: "Online",
              amount: Price,
          });

          var EventHeader = new Headers();
              EventHeader.append('accept', 'application/json');
              EventHeader.append('Content-Type', 'application/x-www-form-urlencoded');
              EventHeader.append('Cookie', 'PHPSESSID=u2jcj8bnk6e2kcj7hke0fdt0mm');

          axios
              .post(API_URL, EventData, {headers: EventHeader})
              .then(function (response) {
              console.log('Book Event Response ====>', response.data.message);

              if (response.data.success == 1) {
                Alert.alert(response.data.message);
                  showMessage({
                  message: 'success',
                  description: response.data.message,
                  type: 'default',
                  backgroundColor: 'green',
                  });
                  setIsDataLoaded(false);
              } else {
                  showMessage({
                  message: 'Error',
                  description: ''+response.data.message,
                  type: 'default',
                  backgroundColor: 'red',
                  });
              }
              setApiStatus(false);
          }).catch(function (err) {
              console.log('err', err);
          });
      }else{
          Alert.alert("Please fill neccessory information");
      }
      setTimeout(()=> setIsDataLoaded(false), 1000);
    }
  //-------------------------------------------------
  return (
    <View style={[styles.page, {top: isKeyboardVisible}]}>
      <BackButtonHeader
        navigation={navigation}
        gotoCart={() => navigation.navigate('CheckoutStack')}
        cartCount={cartData == '' ? 0 : count}
      />
      <Headline2 title={'Book Event'} />
        <View style={styles.iconMainView}>
            <View style={styles.iconView}>
              <MaterialCommunityIcons
                name="calendar-star"
                size={40}
                color={color.primary_color}
              />
            </View>
        </View>
        <View style={{marginLeft: 20}}>
        <TextInput placeholder="  Full Name"
            onChangeText={(textR) => {
                set_Name(textR);
                CuresorPost = 0;
            }}
            style={[styles.textInput, {width: SIZES.width * 0.9, backgroundColor: "#F3F2F2",
                height: SIZES.height * 0.05, alignItems: "flex-start", fontSize: 17,
                justifyContent: "flex-start", textAlignVertical: 'top',
                borderRadius: 20, color: "#000000", marginTop: 30}]}
            value={Name}/>

        <TextInput placeholder="  Contact"
            onChangeText={(textR) => {
                set_ContactNo(textR);
                CuresorPost = 0;
            }}
            style={[styles.textInput, {width: SIZES.width * 0.9, backgroundColor: "#F3F2F2",
                height: SIZES.height * 0.05, alignItems: "flex-start", fontSize: 17,
                justifyContent: "flex-start", textAlignVertical: 'top', marginTop: 20,
                borderRadius: 20, color: "#000000"}]}
            value={Contact}/>

        <TextInput placeholder="  Email"
            onChangeText={(textR) => {
                set_EmailID(textR);
                CuresorPost = 0;
            }}
            style={[styles.textInput, {width: SIZES.width * 0.9, backgroundColor: "#F3F2F2",
                height: SIZES.height * 0.05, alignItems: "flex-start", fontSize: 17,
                justifyContent: "flex-start", textAlignVertical: 'top', marginTop: 20,
                borderRadius: 20, color: "#000000"}]}
            value={EmailID}/>

        <TextInput placeholder="  Remark"
            onChangeText={(textR) => {
                CuresorPost = 1;
                set_Remarks(textR);
            }}
            style={[styles.textInput, {width: SIZES.width * 0.9, backgroundColor: "#F3F2F2",
                height: SIZES.height * 0.2, alignItems: "flex-start", fontSize: 17,
                justifyContent: "flex-start", textAlignVertical: 'top', marginTop: 20,
                borderRadius: 20}]}
            value={Remarks}/>
        <View style={{width: "100%", height: "10%", alignItems: 'center', marginTop: 120}}>
          <View style={{width: "57%", height: "90%", alignItems: 'center',
            justifyContent: 'center', borderRadius: 27,
            backgroundColor: color.primary_color}}>
            {
                isDataLoaded ? (
                    <ActivityIndicator/>
                ):(
                  <TouchableOpacity onPress={()=>SubmitToServer()}>
                        <Text style={{color: color.white, fontSize: 20, fontWeight: 'bold',
                          width: "50%", height: "100%", textAlign: 'center',
                          marginTop: 23}}>{"Book"}</Text>
                  </TouchableOpacity>
                )
            }
          </View>
        </View>

    </View>
    </View>
  );
};

export default BookEvent;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.white,
    flexDirection: 'column',
  },
  iconMainView: {
    flex: 0.4,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: "5%",
    marginBottom: "5%",
    marginLeft: 20,
    // backgroundColor: 'red',
  },
  iconView: {
    backgroundColor: "#504F4F",
    height: 50,
    width: 50,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
