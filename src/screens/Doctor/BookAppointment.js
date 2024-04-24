import React, {useRef} from "react";
import { useNavigation } from '@react-navigation/native'
import { View, Text, Dimensions, TouchableOpacity, Image, StyleSheet, FlatList, 
            RefreshControl, ActivityIndicator, StatusBar, TextInput} from "react-native";
import * as qs from 'qs';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker'
import AntDesign from 'react-native-vector-icons/AntDesign';
            
import color from '../../assets/theme/color';
import {SIZES} from '../../assets/theme/theme';
import Header from "../../components/Header";
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {API_URL} from '../../constants/Strings';
import Headline2 from '../../components/text/Headline2';
import BackButtonHeader from '../../components/BackButtonHeader';
import { ScrollView } from "react-native-gesture-handler";

const TopMenu = [{id: 0, Title: "All", Active: 1},
{id: 1, Title: "General", Active: 0},
{id: 2, Title: "Dentist", Active: 0},
{id: 3, Title: "Nutritionist", Active: 0},
{id: 4, Title: "Pediatric", Active: 0}];
let CuresorPost = 0;

export default function BookAppointment ({navigation, route}){
    const reduxUser = useSelector(state => state.user);
    console.log('redux', reduxUser);
  
    const [ActivMenuIndex, Set_ActivMenuIndex] = React.useState(0);
    const [refreshing, setRefreshing] = React.useState(false);
    const [isLoading, set_isLoading] = React.useState(true);
    const [FlatListRF, setFlatListRF] = React.useState(true);
    const [TMFlatListRF, setTMFlatListRF] = React.useState(true);
    const [cartData, setCartData] = React.useState([]);
    const [count, setCount] = React.useState();
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);
    const [CheckcerticationData, setCheckCertificationData] = React.useState([]);
    const [certificateNumber, setCertificateNumber] = React.useState();
    const [isKeyboardVisible, set_KeyboardVisible] = React.useState("0%");

    const [date, setDate] = React.useState(new Date())
    const [ShowCalendar, set_ShowCalendar] = React.useState(false);
    const [ShowTime, set_ShowTime] = React.useState(false);
    const [AppointmentDate, set_AppointmentDate] = React.useState(new Date());
    const [AppointmentTime, set_AppointmentTime] = React.useState("");
    const [AppointmentCharges, set_AppointmentCharges] = React.useState("");
    const [PatientName, set_PatientName] = React.useState("");
    const [PatientAge, set_PatientAge] = React.useState("");
    const [PatientGender, set_PatientGender] = React.useState(0);
    const [PatientProblem, set_PatientProblem] = React.useState("");
  //-----------------------------------------------
    const FetchUserInfo=async ()=>{
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
    //--------------------------------
    if(route.params.EditID != "0"){
      set_AppointmentDate(route.params.AppointDate);
      set_AppointmentTime(route.params.AppointTime);
      set_AppointmentCharges(route.params.DrFees);
      set_PatientName(route.params.UserName);
      set_PatientAge(route.params.PatientAge);
      set_PatientGender(route.params.PatientGender);
      set_PatientProblem(route.params.Desc);
    }
    //--------------------------------
  }
  
  React.useEffect(()=>{
      FetchUserInfo();
  },[])
  //------------------------
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
    
      React.useEffect(() => {
        processGetCertificationData();
        navigation.addListener('focus', () => processGetCertificationData());
      }, [navigation]);
      //-------------------------------
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
    
      React.useEffect(() => {
        processGetcartData();
        navigation.addListener('focus', () => processGetcartData());
      }, []);
  //------------
  const AppointmentBook = async () => {
    var loginHeaders = new Headers();
    loginHeaders.append('accept', 'application/json');
    loginHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    loginHeaders.append('Cookie', 'PHPSESSID=nchjkmv207jqqhdvms0f8ud04o');
    
    var userData;
    if(route.params.EditID == "0"){
        userData = qs.stringify({
          book_appointment: '1',
          user_id: reduxUser.customer.id,
          dr_id: route.params.DrID,
          name: PatientName,
          date: AppointmentDate,
          time: AppointmentTime,
          age: PatientAge,
          gender: PatientGender,
          description: PatientProblem,
          fees: AppointmentCharges,
        });
    }else{
      userData = qs.stringify({
        edit_book_appointment: '1',
        user_id: reduxUser.customer.id,
        dr_id: route.params.DrID,
        name: PatientName,
        date: AppointmentDate,
        time: AppointmentTime,
        age: PatientAge,
        gender: PatientGender,
        description: PatientProblem,
        fees: AppointmentCharges,
      });
    }
  
    axios
    .post(API_URL, userData, {
      headers: loginHeaders,
    })
    .then(function (response) {
      console.log('Response-------------------------------------------', response.data);
      if (response.data.success == 1) {
        //setLoading(false);
        showMessage({
          message: 'success',
          description: response.data.message,
          type: 'default',
          backgroundColor: 'green',
        });
      } else {
        //setLoading(false);
        showMessage({
          message: 'Not Valid',
          description: response.data.message,
          type: 'default',
          backgroundColor: color.red,
        });
      }

      setApiStatus(false);
    })
    .catch(function (error) {
      console.log('Error', error);
    });

  }
  //--------------------------
    return (
      <View style={[styles.page, {top: isKeyboardVisible}]}>
        <BackButtonHeader
          navigation={navigation}
          gotoCart={() => navigation.navigate('CheckoutStack')}
          cartCount={cartData == '' ? 0 : count}
        />
        {
          route.params.EditID == "0" ? (
            <Headline2 title={'Book Your Appointment'} />
          ):(
            <Headline2 title={'Edit Booked Appointment'} />
          )
        }
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{width: SIZES.width, marginTop: 15, marginLeft: 10}}>
            <View style={{alignContent: "flex-start", flexDirection: "column"}}>
              <Text style={{color: "#000000", fontSize: 18,
                  fontWeight: "700"}}>{route.params.DroctorName}</Text>
              <Text style={{color: "#000000", fontSize: 18,
                  fontWeight: "700"}}>{route.params.DrSpeciality}</Text>
            </View>
            <Text style={{color: color.primary_color, fontSize: 18,
                fontWeight: "700", marginTop: 10}}>Select your Date and Slot</Text>
            
            <View style={{marginLeft: 10, marginRight: 10}}>

              <View style={{flexDirection: 'column', width: "95%", marginTop: 10}}>
                <View style={{flexDirection: 'row', width: "100%", backgroundColor: "#F3F2F2",
                            height: SIZES.height * 0.05, borderRadius: 10}}>
                    <TextInput
                        placeholder="Date"
                        onChangeText={(textR) => {
                            set_AppointmentDate(textR);
                            CuresorPost = 0;
                        }}
                        style={[styles.textInput, {width: "88%",
                            height: SIZES.height * 0.05, alignItems: "flex-start", fontSize: 17,
                            justifyContent: "flex-start",}]}
                        value={AppointmentDate}/>
                    <TouchableOpacity style={{width: "25%", height: "100%"}}
                        onPress={()=>set_ShowCalendar(!ShowCalendar)}>
                        <AntDesign name="calendar" size={30} color="black"
                            style={{marginTop: 5}} />
                    </TouchableOpacity>
                </View>
                    <DatePicker
                        modal
                        mode='date'
                        open={ShowCalendar}
                        date={date}
                        onConfirm={(date) => {
                        set_ShowCalendar(false)
                        let nD = new Date(date);
                        console.log("Date Picker, date : ", date);
                        set_AppointmentDate(`${nD.getFullYear()}-${nD.getMonth()+1}-${nD.getDate()}`);
                        //console.log("Date Picker, EventDate : ", EventDate);
                        }}
                        onCancel={() => {
                        set_ShowCalendar(false)
                        }}
                    />
              </View>

              <View style={{flexDirection: 'column', width: "95%", marginTop: 10}}>
                <View style={{flexDirection: 'row', width: "100%", backgroundColor: "#F3F2F2",
                            height: SIZES.height * 0.05, borderRadius: 10}}>
                    <TextInput
                        placeholder="Time"
                        onChangeText={(textR) => {
                            set_AppointmentTime(textR);
                            CuresorPost = 0;
                        }}
                        style={[styles.textInput, {width: "88%",
                            height: SIZES.height * 0.05, alignItems: "flex-start", fontSize: 17,
                            justifyContent: "flex-start",}]}
                        value={AppointmentTime}/>
                    <TouchableOpacity style={{width: "25%", height: "100%"}}
                        onPress={()=>set_ShowTime(!ShowTime)}>
                            <MaterialCommunityIcons name="clock-time-eight-outline" size={35} color="black"
                                style={{marginTop: 3}} />
                    </TouchableOpacity>
                </View>
                    <DatePicker
                        modal
                        mode='time'
                        open={ShowTime}
                        date={date}
                        onConfirm={(date) => {
                        set_ShowCalendar(false)
                        let nD = new Date(date);
                        console.log("Date Picker, date : ", date);
                        set_AppointmentTime(`${date.getHours()}:${date.getMinutes()}`);
                        //console.log("Date Picker, EventDate : ", EventDate);
                        }}
                        onCancel={() => {
                        set_ShowCalendar(false)
                        }}
                    />
              </View>
              <TextInput
                placeholder="Appointment Charges"
                onChangeText={(textR) => {
                    set_AppointmentCharges(textR);
                    CuresorPost = 0;
                }}
                style={[styles.textInput, {width: "95%", marginTop: 10,
                    height: SIZES.height * 0.05, alignItems: "flex-start", fontSize: 17,
                    justifyContent: "flex-start", backgroundColor: "#F3F2F2",
                    height: SIZES.height * 0.05, borderRadius: 10}]}
                value={AppointmentCharges} keyboardType='decimal-pad'/>
            <Text style={{color: color.primary_color, fontSize: 18,
                fontWeight: "700", marginTop: 10}}>Patient Details</Text>
            <Text style={{color: "#838585", fontSize: 18, marginLeft: 3,
                fontWeight: "700", marginTop: 10}}>Full Name</Text>
            <TextInput
              placeholder="Enter your full name"
              onChangeText={(textR) => {
                  set_PatientName(textR);
                  CuresorPost = 0;
              }}
              style={[styles.textInput, {width: "95%", marginTop: 10,
                  height: SIZES.height * 0.05, alignItems: "flex-start", fontSize: 17,
                  justifyContent: "flex-start", backgroundColor: "#F3F2F2",
                  height: SIZES.height * 0.05, borderRadius: 10}]}
              value={PatientName}/>
            <Text style={{color: "#838585", fontSize: 18, marginLeft: 3,
                fontWeight: "700", marginTop: 10}}>Age</Text>
            <TextInput
              placeholder="Enter your age"
              onChangeText={(textR) => {
                  set_PatientAge(textR);
                  CuresorPost = 0;
              }}
              style={[styles.textInput, {width: "95%", marginTop: 10,
                  height: SIZES.height * 0.05, alignItems: "flex-start", fontSize: 17,
                  justifyContent: "flex-start", backgroundColor: "#F3F2F2",
                  height: SIZES.height * 0.05, borderRadius: 10}]}
              value={PatientAge}/>
            <Text style={{color: "#838585", fontSize: 18,
                fontWeight: "700", marginTop: 10}}>Gender</Text>
            <View style={{flexDirection: "row", width: "95%", marginTop: 10}}>
              <Text style={{color: PatientGender == 0 ? "#FFFFFF" : color.primary_color,
                fontSize: 18, backgroundColor: PatientGender == 0 ? color.primary_color : "#FFFFFF",
                width: "30%", height: "100%", textAlign: "center", borderRadius: 10,
                padding: 5}} onPress={()=>set_PatientGender(0)}>Male</Text>
              <Text style={{color: PatientGender == 1 ? "#FFFFFF" : color.primary_color,
                fontSize: 18, backgroundColor: PatientGender == 1 ? color.primary_color : "#FFFFFF",
                width: "30%", height: "100%", textAlign: "center", borderRadius: 10,
                padding: 5}} onPress={()=>set_PatientGender(1)}>Female</Text>
              <Text style={{color: PatientGender == 2 ? "#FFFFFF" : color.primary_color,
                fontSize: 18, backgroundColor: PatientGender == 2 ? color.primary_color : "#FFFFFF",
                width: "30%", height: "100%", textAlign: "center", borderRadius: 10,
                padding: 5}} onPress={()=>set_PatientGender(2)}>Other</Text>
            </View>
            <Text style={{color: "#838585", fontSize: 18,
                fontWeight: "700", marginTop: 10}}>Write your problem</Text>
            <TextInput
                placeholder="Describe problem/s"
                onChangeText={(textR) => {
                    set_PatientProblem(textR);
                    CuresorPost = 1;
                }}
                style={[styles.textInput, {width: SIZES.width * 0.9, backgroundColor: "#F3F2F2",
                    height: SIZES.height * 0.2, alignItems: "flex-start", fontSize: 17,
                    justifyContent: "flex-start", textAlignVertical: 'top', marginTop: 10,
                    borderRadius: 20}]}
                value={PatientProblem}/>

            </View>
          </View>
          <View style={{width: "100%", height: SIZES.width * 0.12, alignItems: 'center',
                marginTop: 20}}>
                <View style={{width: "47%", height: "100%", alignItems: 'center',
                    justifyContent: 'center', borderRadius: 27,
                    backgroundColor: color.primary_color,}}>
                    {
                        isDataLoaded ? (
                            <ActivityIndicator/>
                        ):(
                            <TouchableOpacity onPress={()=>AppointmentBook()}>
                                <Text style={{color: color.white, fontSize: 20,
                                    fontWeight: 'bold'}}>{"Submit"}</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
            <View style={{marginTop: 20}}/>
          </ScrollView>              
      </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: color.white,
      },
    cardContainer: {
        alignContent: "center",
        justifyContent: "center",
        marginTop: 10,
        padding: 5,
        marginLeft: 5,
    },
    card: {
        backgroundColor: "#FFFFFF",
        shadowColor: "#000000",
        borderRadius: 10,
        width: SIZES.width - 20,
        alignContent: "center",
        justifyContent: "center",
        elevation: 10,
    },
    ButtonStyle: {
        flexDirection: "column",
        backgroundColor: color.primary_color,
        borderRadius: 10,
        padding: 5,
        width: SIZES.width * 0.3,
        height: SIZES.width * 0.15,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 15
    }
});