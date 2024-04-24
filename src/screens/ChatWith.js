import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  SafeAreaView,
  Dimensions,
  Image,
  Animated, ActivityIndicator, FlatList
} from 'react-native';
import { getAsyncData } from '../utils';
import { ASYNC_LOGIN_KEY, API_URL } from '../constants/Strings';
import * as qs from 'qs';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import {useSelector} from 'react-redux';
import color from '../assets/theme/color';
import { FONTS, SIZES } from '../assets/theme/theme';
import StartChatWith from './StartChat';


const DEVICEWIDTH = Dimensions.get('window').width;
const DEVICEHEIGHT = Dimensions.get('window').height;
let startItem = 0, endItem = 0;

export default function ChatWith({navigation, route}){

    //const reduxUser = useSelector(state => state.user);
    const [CheckcerticationData, setCheckCertificationData] = useState([]);
    const [certificateNumber, setCertificateNumber] = useState();
    const [count, setCount] = useState();
    const [cartData, setCartData] = useState([]);

    const [isLoading, set_isLoading] = useState(true);
    const [JustifyProp, set_JustifyProp] = React.useState("center");    //flex-start
    const [UserList, set_UserList] = useState([]);
    const [PerPageUserList, set_PerPageUserList] = useState([]);
    const [isListFetch, set_ListFetch] = useState(false);
    const [RefreshFlatList, set_RefreshFlatList] = useState(false);
    const [UserType, set_UserType] = useState("");
    const [ActiveArrow, set_ActiveArrow] = useState(0);
    const [reduxUser, set_reduxUser] = useState([]);
//----------------------------------
    const FetchUserInfo=async ()=>{
  
      //const reduxUser = AsyncStorage.getItem(ASYNC_LOGIN_KEY);
      //reduxUser.customer.user_type = "trainer";
      //console.log('ChatWith.js, -----------------customer : ', reduxUser);
      try {
        let value = await AsyncStorage.getItem(ASYNC_LOGIN_KEY);
        console.log("ChatWith.js, ----....................>>>>>>>>>>>>>>>>>>>>>>key", value)
        let userm = JSON.parse(value);
        set_reduxUser(userm);
        console.log("ChatWith.js, ----....................>>>>>>>>>>>>>>>>>>>>>>key", userm.user_type);

        if(userm.user_type == "trainer" || userm.user_type == "Trainer"){
          set_UserType("distributor");
          //FetchList("distributor");
        }else{
          set_UserType("trainer");
          //FetchList(reduxUser.customer.user_type);
        }

        setTimeout(()=> set_isLoading(false), 600);
    } catch (error) {
        console.log('Error loading stored credentials:', error);
      }
  
      // try {
      //   AsyncStorage.getItem(ASYNC_LOGIN_KEY).then((value) => {
      //     console.log("ChatWith.js, ----....................>>>>>>>>>>>>>>>>>>>>>>key", value)
      //     let userm = JSON.parse(value);
      //     set_reduxUser(userm);
      //     console.log("ChatWith.js, ----....................>>>>>>>>>>>>>>>>>>>>>>key", reduxUser);

      //     if(reduxUser.user_type == "trainer" || reduxUser.user_type == "Trainer"){
      //       set_UserType("distributor");
      //       //FetchList("distributor");
      //     }else{
      //       set_UserType("trainer");
      //       //FetchList(reduxUser.customer.user_type);
      //     }

      //     setTimeout(()=> set_isLoading(false), 600);
      //   });
      // } catch (e) {
      //   console.error("ChatWith.js, Error : ", e);
      // }
  



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
          user_id: reduxUser.id, //reduxUser.customer.id,
        });
        axios
          .post(API_URL, certificationFormData, {headers: certificationHeader})
          .then(function (response) {
            if (response.data.success == 1) {
              setCheckCertificationData(response.data.data);
              setCertificateNumber(response.data.data.certification_no);
            }
          }).catch(error => console.log('error', error));

          var getcartHeader = new Headers();
          getcartHeader.append('accept', 'application/json');
          getcartHeader.append('Content-Type', 'application/x-www-form-urlencoded');
          getcartHeader.append('Cookie', 'PHPSESSID=suum1ijkct2niss9cppuoem8v1');
      
          var getcartFormdata = qs.stringify({
            viewcart: '1',
            user_id: reduxUser.id, //reduxUser.customer.id,
          });
      
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

    React.useEffect(()=>{
        FetchUserInfo();
    },[])
    //-----------------------------
    const FetchList = (type) => {
      startItem = 0;
      endItem = 0;
      set_ActiveArrow(0);
      console.log("ChatWith.js, FetchList, type : ", type);
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
        user_list: type,
      });
      axios
        .post("https://codewraps.in/education/appdata/webservice.php?user_list=1&type="+type,
          {headers: certificationHeader})
        .then(function (response) {
          let ss =[], j = 0;
          if (response.data.success == 1) {
            set_PerPageUserList([]);
            set_UserList(response.data.data);
            ss.push(response.data.data);
            console.log("FetchList, response.data.data : ", ss);
            console.log("FetchList, response.data.data : ", ss[0].length);
            if(ss[0].length >= 4){
              endItem = 4;
            }else{
              endItem = ss[0].length;
            }
            console.log("end : ", endItem);
            ss=[];
            for(j = startItem; j<endItem; j++){
              console.log("j: ", j, ", response.data.data[j] : ", response.data.data[j]);
              ss.push(response.data.data[j]);
              if(j>=endItem-1)
                set_PerPageUserList(ss);
                console.log("FetchList, ---------PerPageUserList : ", ss);
                console.log("FetchList, ---------PerPageUserList : ", ss.length);
            }
            endItem=3;
            setTimeout(()=>{
              set_ListFetch(false);
              set_RefreshFlatList(!RefreshFlatList);
            }, 300);
          }
        }).catch(error => console.log('error', error));
  };
    //-----------------------------
    const ShowList = (type) => {
      if(UserType !== type){
        set_ListFetch(true);
        FetchList(type);
        set_UserType(type);
      }
    };
    //-----------------------------
    const DisplayList = () => {
      return(
        <View style={{width: "97%", height: "87%", marginLeft: 0,}}>
          {
          isListFetch ? (
            <ActivityIndicator/>
          ):(
            <View>
            <FlatList
              data={PerPageUserList} extraData={RefreshFlatList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(item, index)=>RenderItems(item, index)}
              style={{width: "100%", height: "100%"}}
              showsVerticalScrollIndicator={false}
            />
            {
              UserList.length > 10 ? (
                <View style={{flexDirection: 'row', width: "100%", alignItems: 'center',
                        paddingTop: 10, paddingBottom: 10}}>
                  <Text style={{color: ActiveArrow > 0 ? "blue" : "black", fontSize: 22,
                    fontWeight: '600'}}
                    onPress={()=> PreviousStartNo()}>Prev.</Text>
                  <View style={{width: "71%"}}/>
                  <Text style={{color: ActiveArrow < 10 ? "blue" : "black", fontSize: 22,
                    fontWeight: '600'}}
                    onPress={()=> NextStartNo()}>Next</Text>
                </View>
              ):(
                <View style={{flexDirection: 'row', width: "100%", alignItems: 'center',
                        paddingTop: 10, paddingBottom: 10}}>
                </View>
              )
            }
            </View>
          )
          }
        </View>
      );
    };
    //-----------------------------
    const RenderItems = ({item, index}) => {
      console.log("RenderItems, item : ", item);
      return (
        <View style={{marginTop: index == 0 ? 10 : 0}}>
          <TouchableOpacity onPress={()=> navigation.navigate("StartChatS", {chater: item})}>
        <View style={styles.cardFlatList}>
          <View style={{flexDirection: 'column', width: "100%",
                        alignItems: 'flex-start', justifyContent: 'center',
                        flexDirection: 'column', padding: 10}}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome name="user-circle-o" size={19} color="black"
                    style={{marginTop: 11}} />
              <Text style={{fontSize: 19, color: "#000000", paddingBottom: 5,
                    paddingTop: 5, marginLeft: 7}}>{item.name}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <MaterialIcons name="phone-in-talk" size={19} color="#979798"
                  style={{marginTop: 8}} />
              <Text style={{fontSize: 15, color: "#979798", paddingBottom: 5,
                  paddingTop: 5, marginLeft: 7}}>{item.mobile}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <MaterialIcons name="email" size={19} color="#979798"
                  style={{marginTop: 8}} />
              <Text style={{fontSize: 15, color: "#979798", paddingBottom: 5,
                  paddingTop: 5, marginLeft: 7}}>{item.email}</Text>
            </View>
            <Text style={{fontSize: 15, color: "#979798", paddingBottom: 10,
                  paddingTop: 5}}>Sub-Category : {item.user_sub_type}</Text>
          </View>
        </View>
        </TouchableOpacity>
        <View style={{marginTop: 10}}/>
        </View>
      );
    }
    //-----------------------------
    const NextStartNo = () => {
      let ss=[], j = 0;
      console.log("CatWith.js, NextStartNo,--1111---- startItem : ", startItem, ", endItem : ", endItem);
      startItem = endItem + 1;
      endItem = endItem + 4;
      console.log("CatWith.js, NextStartNo,--2222---- startItem : ", startItem, ", endItem : ", endItem);
      
      if(ActiveArrow == 0)
        set_ActiveArrow(1);

      if(UserList.length < endItem){
        set_ActiveArrow(10);
        startItem = UserList.length-4;
        endItem = UserList.length-1;
      }
      console.log("CatWith.js, NextStartNo,------ startItem : ", startItem, ", endItem : ", endItem);
      ss=[];
      for(j = startItem; j<=endItem; j++){
        ss.push(UserList[j]);
        if(j>=endItem){
          console.log("CatWith.js, NextStartNo,------ j : ", j);

          set_PerPageUserList(ss)
          set_RefreshFlatList(!RefreshFlatList);
        }
      }

    }
    //-----------------------------
    const PreviousStartNo = () => {
      let ss=[], j = 0;
      if(startItem > 4){
        startItem = startItem - 4;
        endItem = endItem - 4;
      }else{
        startItem = 0;
        endItem = 3;
        set_ActiveArrow(0);
      }
      if(UserList.length < endItem){
        startItem = UserList.length-4;
        endItem = UserList.length-1;
      }
      console.log("CatWith.js, PreviousStartNo, startItem : ", startItem, ", endItem : ", endItem);
      ss=[];
      for(j = startItem; j<=endItem; j++){
        ss.push(UserList[j]);
        if(j>=endItem){
          set_PerPageUserList(ss)
          set_RefreshFlatList(!RefreshFlatList);
        }
      }
    }
    //-----------------------------
    return(
      <View style={styles.page}>
        <StatusBar backgroundColor={color.primary_color} />
          <View style={{width: DEVICEWIDTH, height: DEVICEHEIGHT}}>
              <Header
              icon
              navigation={navigation}
              gotoCart={() => navigation.navigate('CheckoutStack')}
              cartCount={cartData == '' ? 0 : count}
              />
              {/* <View style={{marginLeft: 10, marginTop: 10}}>
                  <Text style={{fontSize: 18, fontWeight: '700'}}>Start chat with</Text>
              </View> */}
              <View style={{alignItems: 'center', 
                      width: DEVICEWIDTH , height: DEVICEHEIGHT * 0.84, marginTop: 10}}>
                  {
                    isLoading ? (
                      <ActivityIndicator/>
                    ):(
                    // reduxUser.customer.user_type == "distributor" ? (
                    //   <View style={{width: DEVICEWIDTH * 0.95, alignItems: 'flex-start',
                    //     borderRadius: 17, height: DEVICEHEIGHT * 0.82, marginLeft: 10}}>
                    //       {/* <Text style={[styles.txt,{padding: 5, width: DEVICEWIDTH * 0.396,
                    //           color: "#1809E1",
                    //           marginBottom: 10,
                    //           borderRadius: 17,
                    //           justifyContent: JustifyProp, backgroundColor: color.chat_bg}]}>
                    //         Trainer</Text> */}
                    //           <StartChatWith UserID={reduxUser.customer.id}
                    //             ChatWithType={ChatTo}/>
                    //   </View>
                    // ):(
                        reduxUser.user_type == "trainer" || reduxUser.user_type == "Trainer" ? (
                          <View style={{alignItems: 'center',
                              width: DEVICEWIDTH * 0.95,
                              borderRadius: 17,
                          }}>
                  
                              <View style={{
                                    width: DEVICEWIDTH * 0.95, justifyContent: 'center',
                                    borderRadius: 17, flexDirection: 'row',
                                    marginBottom: 10,
                                    height: DEVICEHEIGHT * 0.04, alignItems: 'center'}}>
                                <TouchableOpacity onPress={()=> {
                                    //ShowList("distributor")}
                                    set_UserType("distributor");
                                  }}
                                  style={{
                                    backgroundColor: UserType == "distributor" ? color.chat_bg : "#E2E0E0",
                                    borderRadius: 17,
                                    width: DEVICEWIDTH * 0.396,
                                    alignItems: 'center', justifyContent: 'center'}}>
                                  <View style={{flexDirection: 'column',
                                        width: DEVICEWIDTH * 0.396,
                                        alignItems: 'center', justifyContent: 'center'}}>
                                  <Text style={[styles.txt,{padding: 5,
                                      color: UserType == "distributor" ? "#1809E1" : "#000000",
                                      }]}> Distributors</Text>
                                    <View style={{
                                          backgroundColor: UserType == "distributor" ? "#1809E1" : color.chat_bg,
                                          width: UserType == "distributor" ? DEVICEWIDTH * 0.396 : 0,
                                          height: 0}}/>
                                      </View>
                                </TouchableOpacity>
                                <View style={{width: "10%"}}/>
                                <TouchableOpacity onPress={()=> {
                                    //ShowList("professional")}
                                    set_UserType("professional");
                                  }}
                                  style={{
                                    backgroundColor:  UserType == "professional" ? color.chat_bg : "#E2E0E0",
                                    width: DEVICEWIDTH * 0.396, marginLeft: "0%",
                                    borderRadius: 17,
                                    alignItems: 'center', justifyContent: 'center'}}>
                                  <View style={{flexDirection: 'column',
                                        width: DEVICEWIDTH * 0.396,
                                        alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={[styles.txt,{padding: 5, 
                                          color: UserType == "professional" ? "#1809E1" : "#000000",
                                          }]}>Professional</Text>
                                        <View style={{
                                          backgroundColor: UserType == "professional" ? "#1809E1" : color.chat_bg,
                                          width: UserType == "professional" ? DEVICEWIDTH * 0.396 : 0,
                                          height: 0}}/>
                                      </View>

                                </TouchableOpacity>
                                </View>
                            </View>
                          // ):(
                          //     reduxUser.customer.user_type == "professional" ? (
                          //       <View style={{width: DEVICEWIDTH * 0.95, alignItems: 'flex-start',
                          //         borderRadius: 17, height: DEVICEHEIGHT * 0.82, marginLeft: 10}}>
                          //         <Text style={[styles.txt,{padding: 5, width: DEVICEWIDTH * 0.396,
                          //             color: "#1809E1",
                          //             marginBottom: 10,
                          //             marginTop: 10, borderRadius: 17,
                          //             justifyContent: JustifyProp, backgroundColor: color.chat_bg}]}>
                          //             Trainer</Text>
                          //         <DisplayList/>
                          //       </View>
                              ):(
                                  <></>
                              )
                    )
                  }
                  {
                    UserType == "trainer" || UserType == "Trainer" ? (
                      <StartChatWith UserID={52}
                        ChatWithType={UserType}/>
                    ):(
                      UserType == "distributor" || UserType == "Distributor" ? (
                        <StartChatWith UserID={reduxUser.id}
                          ChatWithType={UserType}/>
                      ):(
                        UserType == "professional" || UserType == "Professional" ? (
                          <StartChatWith UserID={reduxUser.id}
                            ChatWithType={UserType}/>
                        ):(
                          <></>
                        )
                      )
                    )
                  }
              </View>
          </View>

      </View>
    );



}


const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.white,
  },
  cardFlatList: {
    backgroundColor: color.chat_bg,
    borderRadius: 15,
  },
  opt1: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: '',
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: color.primary_color,
  },
  sec1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontFamily: FONTS.primarytext5,
    fontSize: 18,
    marginLeft: 0,
  },

});




































// import React, {useState, Component } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   Keyboard,
//   SafeAreaView,
//   Dimensions,
//   Image,
//   Animated, ActivityIndicator, FlatList
// } from 'react-native';
// import { getAsyncData } from '../utils';
// import { ASYNC_LOGIN_KEY, API_URL } from '../constants/Strings';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { WebView } from 'react-native-webview';

// import Header from '../components/Header';
// import {useSelector} from 'react-redux';
// import color from '../assets/theme/color';
// import { FONTS, SIZES } from '../assets/theme/theme';

// const DEVICEWIDTH = Dimensions.get('window').width;
// const DEVICEHEIGHT = Dimensions.get('window').height;

// export default function ChatWith({navigation, route}){

//     const reduxUser = useSelector(state => state.user);
//     //reduxUser.customer.user_type = "trainer";
//     console.log('ChatWith.js, -----------------customer : ', reduxUser.customer.id);
//     const [CheckcerticationData, setCheckCertificationData] = useState([]);
//     const [certificateNumber, setCertificateNumber] = useState();
//     const [count, setCount] = useState();
//     const [cartData, setCartData] = useState([]);

//     const [JustifyProp, set_JustifyProp] = React.useState("center");    //flex-start
//   //----------------------------------
//     const FetchUserInfo=async ()=>{
//       if(reduxUser.customer.user_type == "trainer"){
//         set_UserType("distributor");
//         FetchList("distributor");
//       }else{
//         set_UserType("trainer");
//         FetchList(reduxUser.customer.user_type);
//       }

//         var certificationHeader = new Headers();
//         certificationHeader.append('accept', 'application/json');
//         certificationHeader.append(
//           'Content-Type',
//           'application/x-www-form-urlencoded',
//         );
//         certificationHeader.append(
//           'Cookie',
//           'PHPSESSID=vlr3nr52586op1m8ie625ror6b',
//         );

//         var certificationFormData = qs.stringify({
//           check_certification: '1',
//           user_id: reduxUser.customer.id,
//         });
//         axios
//           .post(API_URL, certificationFormData, {headers: certificationHeader})
//           .then(function (response) {
//             if (response.data.success == 1) {
//               setCheckCertificationData(response.data.data);
//               setCertificateNumber(response.data.data.certification_no);
//             }
//           }).catch(error => console.log('error', error));

//           var getcartHeader = new Headers();
//           getcartHeader.append('accept', 'application/json');
//           getcartHeader.append('Content-Type', 'application/x-www-form-urlencoded');
//           getcartHeader.append('Cookie', 'PHPSESSID=suum1ijkct2niss9cppuoem8v1');

//           var getcartFormdata = qs.stringify({
//             viewcart: '1',
//             user_id: reduxUser.customer.id,
//           });

//             axios
//               .post(API_URL, getcartFormdata, {headers: getcartHeader})
//               .then(function (response) {
//                 console.log('cart res ===||==', response);

//                 if (response.data.success == 0) {
//                   setCount(response.data.total_product);
//                 }
//                 setCartData(response.data.data);
//                 setCount(response.data.total_product);
//               });
//     }

//     React.useEffect(()=>{
//         FetchUserInfo();
//     },[])

//   return (
//       <View style={styles.page}>
//         <StatusBar backgroundColor={color.primary_color} />
//         <View style={{width: DEVICEWIDTH, height: DEVICEHEIGHT}}>
//             <Header
//             icon
//             navigation={navigation}
//             gotoCart={() => navigation.navigate('CheckoutStack')}
//             cartCount={cartData == '' ? 0 : count}
//             />
//           <WebView source={{ uri: 'https://codewraps.in/education/chat/users.php?user_id='+
//                                 reduxUser.customer.id+'&type=distributor' }}
//             style={{ flex: 1 }} />
//         </View>
//       </View>

//     );
// }
