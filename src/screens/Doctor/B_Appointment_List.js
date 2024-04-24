import React, {useRef} from "react";
import { useNavigation } from '@react-navigation/native'
import { View, Text, Dimensions, TouchableOpacity, Image, StyleSheet, FlatList, 
        Modal, RefreshControl, ActivityIndicator, StatusBar, Pressable} from "react-native";
import * as qs from 'qs';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import color from '../../assets/theme/color';
import {SIZES} from '../../assets/theme/theme';
import Header from "../../components/Header";
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {API_URL} from '../../constants/Strings';

const TopMenu = [{id: 0, Title: "All", Active: 1},
{id: 1, Title: "General", Active: 0},
{id: 2, Title: "Dentist", Active: 0},
{id: 3, Title: "Nutritionist", Active: 0},
{id: 4, Title: "Pediatric", Active: 0}];

export default function BookAppointmentList ({navigation, route}){
    //let listRef =  useRef();
    const reduxUser = useSelector(state => state.user);
    console.log('redux', reduxUser);
  
    const [ActivMenuIndex, Set_ActivMenuIndex] = React.useState(0);
    const [refreshing, setRefreshing] = React.useState(false);
    const [isLoading, set_isLoading] = React.useState(true);
    const [FlatListRF, setFlatListRF] = React.useState(true);
    const [TMFlatListRF, setTMFlatListRF] = React.useState(true);
    const [cartData, setCartData] = React.useState([]);
    const [DrList, set_DrList] = React.useState([]);
    const [BAppointmentList, set_BAppointmentList] = React.useState([]);
    const [count, setCount] = React.useState();
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);
    const [CheckcerticationData, setCheckCertificationData] = React.useState([]);
    const [certificateNumber, setCertificateNumber] = React.useState();

    const [isEditDBoxVisival, set_EDBox] = React.useState(false);
    const [IDforDelete, set_IDforDelete] = React.useState(0);
    const [userIDforDelete, set_userIDforDelete] = React.useState(0);

    const FetchUserInfo=async ()=>{
        //const reduxUser = AsyncStorage.getItem(ASYNC_LOGIN_KEY);
        //reduxUser.customer.user_type = "trainer";
        //console.log('ChatWith.js, -----------------customer : ', reduxUser);
        // try {
        //   let value = await AsyncStorage.getItem(ASYNC_LOGIN_KEY);
        //   console.log("ChatWith.js, ----....................>>>>>>>>>>>>>>>>>>>>>>key", value)
        //   let userm = JSON.parse(value);
        //   console.log("ChatWith.js, ----....................>>>>>>>>>>>>>>>>>>>>>>key", userm.user_type);
  
        //   if(userm.user_type == "trainer" || userm.user_type == "Trainer"){
        //     set_UserType("distributor");
        //     //FetchList("distributor");
        //   }else{
        //     set_UserType("trainer");
        //     //FetchList(reduxUser.customer.user_type);
        //   }
  
        //   setTimeout(()=> set_isLoading(false), 600);
        // } catch (error) {
        //     console.log('Error loading stored credentials:', error);
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
    //---------------------
    const FetchDrList=async ()=>{
        set_isLoading(true);
        try {
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
      
          var DrFormData = qs.stringify({
            dr_list: '1',
          });
        axios
            .post(API_URL, DrFormData, {headers: certificationHeader})
            .then(function (response) {
              if (response.data.success == 1) {
                console.log("------------------------Doctors.js-------------response.data.data : ", response.data.data);
                set_DrList(response.data.data);
                console.log("------------------------Doctors.js-------------response.data.data : ", DrList.length);
                //-----------------------------
                try {
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
                
                    var DrFormData = qs.stringify({
                    appointment_list: '1',
                    });
                    axios
                        .post(API_URL, DrFormData, {headers: certificationHeader})
                        .then(function (response) {
                        if (response.data.success == 1) {
                            console.log("----------Doctors.js-------------response.data.data : ", response.data.data);
                            set_BAppointmentList(response.data.data);
                            console.log("----------Doctors.js-------------response.data.data : ", BAppointmentList.length);
                            set_isLoading(false);
                        }else{
                            set_isLoading(false);
                            console.log('Error data :', error);
                            showMessage({
                                message: 'Not Valid',
                                description: 'something went wrong try again.',
                                type: 'default',
                                backgroundColor: color.red,
                            });        
                        }
                    }).catch(error => {
                        console.log('error', error)
                        set_isLoading(false);
                        showMessage({
                            message: 'Not Valid',
                            description: 'something went wrong try again.',
                            type: 'default',
                            backgroundColor: color.red,
                        });        
                    });        

                }catch (error) {
                    console.log('Error loading stored credentials:', error);
                    set_isLoading(false);
                    showMessage({
                        message: 'Not Valid',
                        description: 'something went wrong try again.',
                        type: 'default',
                        backgroundColor: color.red,
                    });        
                }
            //-----------------------------
            }else{
                set_isLoading(false);
                console.log('Error data :', error);
                showMessage({
                    message: 'Not Valid',
                    description: 'something went wrong try again.',
                    type: 'default',
                    backgroundColor: color.red,
                });        
            }
        }).catch(error => console.log('error', error));
  
      }catch (error) {
        set_isLoading(false);
        console.log('Error loading stored credentials:', error);
        showMessage({
            message: 'Not Valid',
            description: 'something went wrong try again.',
            type: 'default',
            backgroundColor: color.red,
        });
      }

    }
    //---------------------
    const FetchAppointmentList=async ()=>{
        //-----------------------------
        try {
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
        
            var DrFormData = qs.stringify({
            appointment_list: '1',
            });
            axios
                .post(API_URL, DrFormData, {headers: certificationHeader})
                .then(function (response) {
                if (response.data.success == 1) {
                    console.log("----------Doctors.js-------------response.data.data : ", response.data.data);
                    set_BAppointmentList(response.data.data);
                    console.log("----------Doctors.js-------------response.data.data : ", BAppointmentList.length);
                    set_isLoading(false);
                }else{
                    set_isLoading(false);
                    console.log('Error data :', error);
                    showMessage({
                        message: 'Not Valid',
                        description: 'something went wrong try again.',
                        type: 'default',
                        backgroundColor: color.red,
                    });        
                }
            }).catch(error => {
                console.log('error', error)
                set_isLoading(false);
                showMessage({
                    message: 'Not Valid',
                    description: 'something went wrong try again.',
                    type: 'default',
                    backgroundColor: color.red,
                });        
            });        

        }catch (error) {
            console.log('Error loading stored credentials:', error);
            set_isLoading(false);
            showMessage({
                message: 'Not Valid',
                description: 'something went wrong try again.',
                type: 'default',
                backgroundColor: color.red,
            });        
        }
    }
  //----------------
      React.useEffect(()=>{
          FetchUserInfo();
          FetchDrList();
          FetchAppointmentList();
      },[])
  //--------------------
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
          })
          .catch(error => console.log('error', error));
      };
      console.log('certificate', CheckcerticationData);
    
      const certificate = certificateNumber;
    
      React.useEffect(() => {
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
    
      React.useEffect(() => {
        processGetcartData();
        navigation.addListener('focus', () => processGetcartData());
      }, []);
    //-----------------------------------
    const toggleModalVisibility = () => {
        set_EDBox(!isEditDBoxVisival);
    }
    //-----------------------------------
    const DeleteModelOpen = (deleteID, userID) => {
      set_EDBox(false);
      set_IDforDelete(deleteID);
      set_userIDforDelete(userID);
    }
    //-----------------------------------
    const DeleteBokkedAppointment = () => {
      try {
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
    
        var DrFormData = qs.stringify({
          deleteappointment: '1',
          id: IDforDelete,
          user_id: userIDforDelete
        });
        axios
            .post(API_URL, DrFormData, {headers: certificationHeader})
            .then(function (response) {
            if (response.data.success == 1) {
                console.log("----------Doctors.js-------------response.data.data : ", response.data.data);
                set_BAppointmentList(response.data.data);
                console.log("----------Doctors.js-------------response.data.data : ", BAppointmentList.length);
                set_isLoading(false);
                showMessage({
                  message: 'success',
                  description: response.data.message,
                  type: 'default',
                  backgroundColor: 'green',
                });
    
            }else{
                set_isLoading(false);
                console.log('Error data :', error);
                showMessage({
                    message: 'Error',
                    description: 'something went wrong try again.',
                    type: 'default',
                    backgroundColor: color.red,
                });        
            }
        }).catch(error => {
            console.log('error', error)
            set_isLoading(false);
            showMessage({
                message: 'Not Valid',
                description: 'something went wrong try again.',
                type: 'default',
                backgroundColor: color.red,
            });        
        });        

    }catch (error) {
        console.log('Error loading stored credentials:', error);
        set_isLoading(false);
        showMessage({
            message: 'Not Valid',
            description: 'something went wrong try again.',
            type: 'default',
            backgroundColor: color.red,
        });        
    }

      set_EDBox(false);

    }
    //-----------------------------------
    const EditAppointment = (deleteID, userID) => {

    }
    //-----------------------------------
    const ShowBookedAppointment = ({item, index}) => {
        let j = 0, DrName = '', DrSpec = '';
        for(j = 0; j < DrList; j++){
            if(DrList[j].name == item.dr_id){
                DrName = DrList[j].name;
                DrSpec = DrList[j].user_sub_type
            }
        }
        return(
        <View style={styles.cardContainer}>
            <View style={styles.card}>
              <AntDesign name="delete" size={34} color="grey"
                onPress={()=>DeleteModelOpen(item.id, item.user_id)}
                style={{alignItems: "flex-end"}}/>

                <Pressable style={styles.ButtonStyle}>
                    <View style={{flexDirection: "column", marginLeft: 10}}>                        
                        {
                            DrName.length > 15 ? (
                                <Text style={{color: "#000000", fontSize: 18,
                                    fontWeight: "bold", width: "100%"}}>
                                    Dr. : {DrName.substring(0, 15)}..</Text>
                            ) : (
                                <Text style={{color: "#000000", fontSize: 18,
                                    fontWeight: "bold", width: "100%"}}>Dr. : {DrName}</Text>
                            )
                        }
                        {
                            item.name.length > 15 ? (
                                <Text style={{color: "#000000", fontSize: 18,
                                    fontWeight: "bold", width: "100%"}}>
                                    {item.name.substring(0, 15)}..</Text>
                            ) : (
                                <Text style={{color: "#000000", fontSize: 18,
                                    fontWeight: "bold", width: "100%"}}>{item.name}</Text>
                            )
                        }
                        <Text style={{color: "#000000", fontSize: 15}}>Date : {item.date}</Text>
                        <Text style={{color: "#000000", fontSize: 15}}>Time : {item.time}</Text>
                    </View>
                </Pressable>
                <MaterialCommunityIcons name="file-document-edit-outline" size={34} color="grey"
                  onPress={()=> navigation.navigate("BookAppointment", {DrID: item.dr_id, DroctorName: DrName,
                                EditID: item.id, UserID: user_id, UserName: item.name, AppointDate: item.date,
                                AppointTime: item.time, PatientAge: item.age, PatientGender: item.gender,
                                DrFees: item.fees, Desc: item.discription, DrSpeciality: DrSpec})}
                  style={{marginTop: 10, alignItems: "flex-end"}}/>
            </View>
        </View>
        );
    }
    //-----------------------------------
    const ShowTopMenu = ({item, index}) => {
        return(
            <TouchableOpacity onPress={()=> WhoActive(item.id)}
                style={{width: SIZES.width * 0.3,
                    height: SIZES.height * 0.18, paddingTop: 7}}>
                <View style={{backgroundColor: item.Active == 1 ? color.primary_color : "#FFFFFF",
                        borderRadius: 15, height: "27%", borderWidth: 2, marginLeft: 5, marginRight: 5,
                        borderColor: color.primary_color, alignItems: "center"}}>
                    <Text style={{color: item.Active == 1 ? "#FFFFFF" : color.primary_color,
                        fontSize: 15, padding: 3, }}>
                        {item.Title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    //-----------------------------------
    const WhoActive = (idd) => {
        Set_ActivMenuIndex(idd);
        console.log("WorldCup.js, WhoActive idd : ", idd);
        let z=0;
        for(z=0; z<5; z++){
            if(TopMenu[z].id == idd){
                TopMenu[z].Active = 1;
                console.log("WorldCup.js, WhoActive TopMenu[z].Active : ", TopMenu[z].Active, "id : ", z);
            }else{
                TopMenu[z].Active = 0;
            }
        }
    }
    //--------------------------
    return (
        <View style={styles.page}>
            <StatusBar backgroundColor={color.primary_color} />
              <Header
              icon
              navigation={navigation}
              gotoCart={() => navigation.navigate('CheckoutStack')}
              cartCount={cartData == '' ? 0 : count}
              />
            <View style={{width: SIZES.width, height: SIZES.height * 0.83}}>

                <View style={{backgroundColor: "#FFFFFF", width: SIZES.width,
                    height: "91%",}}>
                    <View style={{height: "100%",}}>
                        <FlatList showsVerticalScrollIndicator={false}
                            data={DrList} extraData={TMFlatListRF}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={(item, index)=> ShowBookedAppointment(item, index)}
                        />
                    </View>
                </View>
            </View>

    <Modal animationType="slide" transparent visible={isEditDBoxVisival} 
        presentationStyle="overFullScreen" onDismiss={toggleModalVisibility}>
      <View style={styles.viewWrapper}>
        <View style={styles.modalView}>
          <Text style={{fontSize: 18, color: "#000000"}}>
            Proceed with same
          </Text>
          <View style={{flexDirection: "row", alignContent: "center",
              marginTop: 20}}>
            <TouchableOpacity style={{width: "30%", height: "50%"}}>
              <Text style={{fontSize: 18, color: "#000000"}}>
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width: "30%", height: "50%"}}>
              <Text style={{fontSize: 18, color: "#000000"}}>
                No
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>


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
        flexDirection: "column",
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
    },
    viewWrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "40%",
      left: "50%",
      elevation: 5,
      transform: [{ translateX: -(SIZES.width * 0.4) }, 
                  { translateY: -90 }],
      height: SIZES.height * 0.5,
      width: SIZES.width * 0.8,
      backgroundColor: "#DFE0E1",
      borderRadius: 7,
  },
  
});