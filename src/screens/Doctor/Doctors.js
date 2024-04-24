import React, {useRef} from "react";
import { useNavigation } from '@react-navigation/native'
import { View, Text, Dimensions, TouchableOpacity, Image, StyleSheet, FlatList, 
            RefreshControl, ActivityIndicator, StatusBar, Pressable} from "react-native";
import * as qs from 'qs';
import axios from 'axios';
            
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

export default function Doctors ({navigation, route}){
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
    const [count, setCount] = React.useState();
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);
    const [CheckcerticationData, setCheckCertificationData] = React.useState([]);
    const [certificateNumber, setCertificateNumber] = React.useState();
  
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
            }
            }).catch(error => console.log('error', error));
  
      }catch (error) {
        console.log('Error loading stored credentials:', error);
      }
    }
    //----------------
      React.useEffect(()=>{
          FetchUserInfo();
          FetchDrList();
      },[])

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
    const ShowDoctors = ({item, index}) => {
        return(
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                <View style={{flexDirection: "row", padding: 10}}>
                    <Image source={require('../../assets/images/dr_profile_image.png')}
                        style={{width: 80, height: 80, borderRadius: 10}}/>
                    <View style={{flexDirection: "column", marginLeft: 10}}>
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
                        <Text style={{color: "#000000", fontSize: 15}}>{item.user_sub_type}</Text>
                        <Text style={{color: "#000000", fontSize: 15}}>The Valley Hospital</Text>
                    </View>
                    <Pressable style={styles.ButtonStyle} 
                        onPress={()=> navigation.navigate("BookAppointment", {DrID: item.id,
                              EditID: "0", DroctorName: item.name, DrSpeciality: item.user_sub_type})}>
                        <Text style={{color: "#FFFFFF", fontSize: 17,
                            fontWeight: "600", }}>Book</Text>
                        <Text style={{color: "#FFFFFF", fontSize: 17,
                            fontWeight: "600"}}>Appointment</Text>
                    </Pressable>
                </View>
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
        // PageNo = 1;
        // set_ShowBottomM(true);
        // set_BotActivityInd(true);
        // ResetData(0);
        // setTimeout(()=> {
        //     listRef?.current?.scrollToIndex({
        //         animated: true,
        //         index: 0,
        //     });
        //     setTimeout(()=> {
        //         setTMFlatListRF(!TMFlatListRF);
        //         setFlatListRF(!FlatListRF);
        //         set_BotActivityInd(false);
        //     },3000);
        // },2000);
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
                    height: "10%",}}>
                    <View style={{height: "100%", flexDirection: "row", 
                            marginLeft: 0, }}>
                        <FlatList showsHorizontalScrollIndicator={false}
                            data={TopMenu} horizontal extraData={TMFlatListRF}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={(item, index)=> ShowTopMenu(item, index)}
                        />
                    <View style={{marginLeft: 10}}/>
                    </View>
                </View>

                <View style={{backgroundColor: "#FFFFFF", width: SIZES.width,
                    height: "91%",}}>
                    <View style={{height: "100%",}}>
                        <FlatList showsVerticalScrollIndicator={false}
                            data={DrList} extraData={TMFlatListRF}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={(item, index)=> ShowDoctors(item, index)}
                        />
                    </View>
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
    }
});