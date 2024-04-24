import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  SafeAreaView, ScrollView,
  Dimensions, TextInput,
  Image, ImageBackground,
  Animated, ActivityIndicator, FlatList
} from 'react-native';
import { getAsyncData } from '../utils';
import { ASYNC_LOGIN_KEY, API_URL } from '../constants/Strings';
import * as qs from 'qs';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { WebView } from 'react-native-webview';

import BackButtonHeader from '../components/BackButtonHeader';
import Headline2 from '../components/text/Headline2';
import {useSelector} from 'react-redux';
import color from '../assets/theme/color';
import { FONTS, SIZES } from '../assets/theme/theme';

const DEVICEWIDTH = Dimensions.get('window').width;
const DEVICEHEIGHT = Dimensions.get('window').height;

export default function StartChatWith({UserID, ChatWithType}){

  const [isError, setIsError] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(0);
  let WebViewRef;

  console.log("StartChat.js, UserID : ",UserID, "ChatWithType : ",ChatWithType);
  console.log("StartChat.js, Url : ", 'https://codewraps.in/education/chat/users.php?user_id='+
  UserID+'&type='+ChatWithType);

  useEffect(()=>{
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        console.log("KeyBoard is Open");
          setKeyboardVisible("-8%");
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          console.log("KeyBoard is Close");
          setKeyboardVisible("0%");
        },
    );

  }, []);

  const handleError = (error) => {
    console.log("Error loading website", error);
    setIsError(true);
  };
  const ReloadWebView = (error) => {
    setIsError(false)
    WebViewRef && WebViewRef.reload()
  };

  return (
    <View style={styles.page}>
      {isError ? (
        <View>
        <Text style={{ textAlign: "center", marginTop: 16 }}>
          Error loading website.
        </Text>
        {
          ReloadWebView
        }
        </View>
      ) : (
          <WebView
            ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
            source={{ uri: 'https://codewraps.in/education/chat/users.php?user_id='+
                             UserID+'&type='+ChatWithType }}
            style={{ flex: 1 }}
            onError={handleError}
            startInLoadingState={true}
          />
      )
      }
    </View>

  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.white,
    width: DEVICEWIDTH * 0.97,
    height: "100%",
  },
});























































// import React, {useState, useEffect} from 'react';
// import {
//   KeyboardAvoidingView,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   Keyboard,
//   SafeAreaView, ScrollView,
//   Dimensions, TextInput,
//   Image, ImageBackground,
//   Animated, ActivityIndicator, FlatList
// } from 'react-native';

// // import { getAuth } from 'firebase/auth';
// // import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
// // import firebase from '../../firebase';

// //import {MyFBAuth, MyFBDB} from '../../firebase'

// //import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

// //import firebase from 'firebase/compat/app';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import {getDatabase, get, ref} from 'firebase/database';
// import firestore from '@react-native-firebase/firestore';

// // import {
// //   getAuth,
// //   createUserWithEmailAndPassword,
// //   updateProfile,
// // } from 'firebase/compat/auth';


// import { getAsyncData } from '../utils';
// import { ASYNC_LOGIN_KEY, API_URL } from '../constants/Strings';
// import * as qs from 'qs';
// import axios from 'axios';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import Foundation from 'react-native-vector-icons/Foundation'
// import FontAwesome from 'react-native-vector-icons/FontAwesome'

// // import auth from '@react-native-firebase/auth';
// // import firestore from '@react-native-firebase/firestore';

// import BackButtonHeader from '../components/BackButtonHeader';
// import Headline2 from '../components/text/Headline2';
// import {useSelector} from 'react-redux';
// import color from '../assets/theme/color';
// import { FONTS, SIZES } from '../assets/theme/theme';

// // const functions = require('firebase-functions');
// // const admin = require('firebase-admin');
// const DEVICEWIDTH = Dimensions.get('window').width;
// const DEVICEHEIGHT = Dimensions.get('window').height;
// let startItem = 0, endItem = 0, chatData=[];

// export default function StartChatWith({navigation, route}){

//     const {chater} = route.params;
//     const reduxUser = useSelector(state => state.user);
//     console.log('redux', reduxUser.customer.user_type);
//     const [CheckcerticationData, setCheckCertificationData] = useState([]);
//     const [certificateNumber, setCertificateNumber] = useState();
//     const [count, setCount] = useState();
//     const [cartData, setCartData] = useState([]);
//     const [UserType, set_UserType] = useState("");
//     const [Message, set_Message] = useState("");
//     const [isKeyboardVisible, setKeyboardVisible] = useState(0);
//     const [UserMy, set_UserMy] = useState(reduxUser.customer.email);
  
//     const [FirebaseData, set_FirebaseData] = useState([]);
//     //const [ScrollIndexStartNo, set_ScrollIndexStartNo] = React.useState(0);
//     //-----------------------------
//     // const findUser = async (userEmail) => {
//     //   const database = getDatabase();
//     //   const mySnapshot = await get(ref(database, `users/${userEmail}`));
//     //   return mySnapshot.val();
//     // }
//   //----------------------------------
//     const FetchUserInfo=async ()=>{

//       console.log(reduxUser.customer.email, reduxUser.customer.mobile);
//       console.log("Firebase auth : --------------------------------------");
//       //console.log("Firebase auth : ", MyFBAuth);      // "firebase": "^9.6.11",
//       //if(!firebase.apps.length){
//       const app =  firebase.initializeApp({
//         apiKey: "AIzaSyAap9CXG-OheslUQ4FURTAsQdxNn9PUHxw",
//         authDomain: "education-39c9e.firebaseapp.com",
//         projectId: "education-39c9e",
//         storageBucket: "education-39c9e.appspot.com",
//         messagingSenderId: "824944792248",
//         appId: "1:824944792248:web:89a0a302e100afb596da4d",
//         measurementId: "G-Q95GQF5SBG"
//         })

//         try {
//           await firebase.auth().signInWithEmailAndPassword(reduxUser.customer.email, reduxUser.customer.mobile)
//             .then((user) =>{
//               console.log("successfull-----------------------", user);
//             });
//         } catch (error) {
//           console.error("Error - 1 : ", error);
//           console.error("Error - 1 : ", error.code);
//         }
//         try {
//           //const auth = getAuth();
//           const userCredential = await firebase.auth().createUserWithEmailAndPassword(
//             reduxUser.customer.email, reduxUser.customer.mobile);
//             const user = userCredential.user;
//           console.log("------------users : ", user);
//           alert('Signup Success');
//         } catch (error) {
//           console.error("Error - 2 : ", error);
//         }

//         try {
//           const firestore = app.firestore();

//           const usersCollection = firestore.collection('users');
//           console.log("1------------usersCollection : ", usersCollection);
//           console.log("2-usersCollection._delegate._path.segments : ", usersCollection._delegate._path.segments);
// console.log("2-usersCollection._delegate._path.segments.users : ", usersCollection._delegate._path.segments.users);
//           console.log("3-usersCollection.firestore : ", usersCollection.firestore);
// console.log("3-usersCollection.firestore._appCompat.options : ", usersCollection.firestore._appCompat.options);
//           console.log("4-usersCollection.firestore._delegate : ", usersCollection.firestore._delegate);
// console.log("5-usersCollection.firestore._delegate._options : ", usersCollection.firestore._delegate._options);
// console.log("6------------usersCollection.get() : ", usersCollection.get());

//           usersCollection.get().then((snapshot) => {
//             console.log("------------snapshot : ", snapshot);
//             const users = snapshot.docs.map((doc) => doc.data());
//             console.log("------------users : ", users);


//             console.log("------------userRecords : ", firebase.auth().listUsers(1));

//             firebase.auth().listUsers(1).then((userRecords) => {
//               console.log("------------userRecords : ", userRecords);
//               userRecords.users.forEach((user) => console.log(user.toJSON()));
//             }).catch((error) => console.log(error));

//           });
//         } catch (error) {
//           console.error("Error - 5 : ", error);
//         }
  
//         try {
//           const database = getDatabase();
//           await firebase.auth().database()
//             .ref('users/')
//             .orderByChild('emailAddress')
//             .equalTo(email)
//             .once('value', snap => console.log(snap.val()));
//         const mySnapshot = await get(ref(database, `users/`+reduxUser.customer.mobile));
//         console.log("------------mySnapshot : ", mySnapshot);
//       } catch (error) {
//         console.error("Error - 3 : ", error);
//       }

//       const keyboardDidShowListener = Keyboard.addListener(
//         'keyboardDidShow',
//         () => {
//           console.log("KeyBoard is Open");
//             setKeyboardVisible("-8%");
//             //isKeyboardVisible = "-8%";
//         },
//       );
//       const keyboardDidHideListener = Keyboard.addListener(
//           'keyboardDidHide',
//           () => {
//             console.log("KeyBoard is Close");
//             setKeyboardVisible("0%");
//             //isKeyboardVisible = "0%";
//           },
//       );
//       chatData.push({"side": 0, "Message": "Hello Dear, Received", "Date": "23-12-2023",});
//       chatData.push({"side": 1, "Message": "Hello Dear, send", "Date": "23-12-2023",});
//       chatData.push({"side": 0, "Message": "Hello Dear, Received", "Date": "23-12-2023",});
//       chatData.push({"side": 1, "Message": "Hello Dear, send", "Date": "23-12-2023",});
//       chatData.push({"side": 0, "Message": "Hello Dear, Received", "Date": "23-12-2023",});
//       chatData.push({"side": 1, "Message": "Hello Dear, send", "Date": "23-12-2023",});
//       chatData.push({"side": 0, "Message": "Hello Dear, Received", "Date": "23-12-2023",});
//       chatData.push({"side": 1, "Message": "Hello Dear, send", "Date": "23-12-2023",});
//       chatData.push({"side": 0, "Message": "Hello Dear, Received", "Date": "23-12-2023",});
//       chatData.push({"side": 1, "Message": "Hello Dear, send", "Date": "23-12-2023",});
//       chatData.push({"side": 0, "Message": "Hello Dear, Received", "Date": "23-12-2023",});
//       chatData.push({"side": 1, "Message": "Hello Dear, send", "Date": "23-12-2023",});
//       chatData.push({"side": 0, "Message": "Hello Dear, Received", "Date": "23-12-2023",});
//       chatData.push({"side": 1, "Message": "Hello Dear, send", "Date": "23-12-2023",});
//       chatData.push({"side": 0, "Message": "Hello Dear, Received", "Date": "23-12-2023",});
//       chatData.push({"side": 1, "Message": "Hello Dear, send", "Date": "23-12-2023",});
//       chatData.push({"side": 0, "Message": "Hello Dear, Received", "Date": "23-12-2023",});
//       chatData.push({"side": 1, "Message": "Hello Dear, send", "Date": "23-12-2023",});
//       console.log("FetchUserInfo, chatData : ", chatData);

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
//     //-----------------------------
//     const FetchList = (type) => {
//       startItem = 0;
//       endItem = 0;
//       set_ActiveArrow(0);
//       var certificationHeader = new Headers();
//       certificationHeader.append('accept', 'application/json');
//       certificationHeader.append(
//         'Content-Type',
//         'application/x-www-form-urlencoded',
//       );
//       certificationHeader.append(
//         'Cookie',
//         'PHPSESSID=vlr3nr52586op1m8ie625ror6b',
//       );
  
//       var certificationFormData = qs.stringify({
//         check_certification: '1',
//         user_list: type,
//       });
//       axios
//         .post("https://codewraps.in/education/appdata/webservice.php?user_list=1&type="+type,
//           {headers: certificationHeader})
//         .then(function (response) {
//           let ss =[], j = 0;
//           if (response.data.success == 1) {
//             set_UserList(response.data.data);
//             ss.push(response.data.data);
//             console.log("FetchList, response.data.data : ", ss);
//             console.log("FetchList, response.data.data : ", ss[0].length);
//             if(ss[0].length >= 4){
//               endItem = 4;
//             }else{
//               endItem = ss[0].length;
//             }
//             console.log("end : ", endItem);
//             ss=[];
//             for(j = startItem; j<endItem; j++){
//               console.log("j: ", j, ", response.data.data[j] : ", response.data.data[j]);
//               ss.push(response.data.data[j]);
//               if(j>=endItem-1)
//                 endItem=3;
//                 set_PerPageUserList(ss);
//                 console.log("FetchList, ---------PerPageUserList : ", ss.length);
//             }
//             setTimeout(()=>{
//               set_ListFetch(false);
//               set_RefreshFlatList(!RefreshFlatList);
//             }, 300);
//           }
//         }).catch(error => console.log('error', error));
//     };
//     //-----------------------------
//     const RenderChat = ({item, index}) => {
//       return (
//         <View style={{width: "90%", marginTop: 10, flexDirection: 'column'}}>
//           {
//             item.side == 0 ? (
//               <View>
//               <ImageBackground source={require('../assets/images/backgroundforreceive.png')}
//                 style={{left: "1%", padding: 5}}>
//                 <Text style={{color: "#000000", padding: 10, left: "3%"}}>{item.Message}</Text>
//               </ImageBackground>
//               </View>
//             ):(
//               <ImageBackground source={require('../assets/images/backgroundforsend.png')}
//                 style={{left: "40%", padding: 5}}>
//                 <Text style={{color: "#FFFFFF", padding: 10, left: "33%"}}>{item.Message}</Text>
//               </ImageBackground>

//             )
//           }
//         </View>
//       );
//     }
//     //-----------------------------

//     return(
//     <View style={styles.page}>
//       <BackButtonHeader
//         navigation={navigation}
//         gotoCart={() => navigation.navigate('CheckoutStack')}
//         cartCount={cartData == '' ? 0 : count}
//       />
//       <Headline2 title={chater.name} />

//       <ScrollView keyboardDismissMode='interactive' contentContainerStyle={{flex: 1}}>

//       <View style={{width: "97%", height: "89%", top: isKeyboardVisible}}>
//         <FlatList
//           showsVerticalScrollIndicator={false}
//           data={chatData}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={(item, index)=>RenderChat(item, index)}
//           style={{width: "100%", height: "100%",}}
//         />
//       </View>

//       <View style={{backgroundColor: "#CFFBFD", borderRadius: 12, width: "80%",
//             flexDirection: 'row', marginTop: 10, marginLeft: 10, top: isKeyboardVisible}}>
//         <TextInput onChangeText={(textF) => set_Message(textF)}
//           style={{height: 45, width: "98%", padding: 10, top: "0%",
//           fontSize: 19, borderRadius: 10, marginLeft: 3, marginTop: 6, }}
//           value={Message}/>
//         <MaterialCommunityIcons name="send-circle" size={55} color="black"
//           style={{marginLeft: 10, marginTop: -2, marginBottom: isKeyboardVisible}} />

//       </View>
//       </ScrollView>
//     </View>
//     );
// }

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     backgroundColor: color.white,
    
//   },
// });