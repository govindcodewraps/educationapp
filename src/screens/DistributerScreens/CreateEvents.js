import {Keyboard, StyleSheet, Text, TextInput, View, TouchableOpacity,
        ScrollView, FlatList, Animated, Easing, Alert, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import * as qs from 'qs';
import DatePicker from 'react-native-date-picker'

import {FONTS, SIZES} from '../../assets/theme/theme';
import color from '../../assets/theme/color';
import {showMessage} from 'react-native-flash-message';
import { set } from 'react-native-reanimated';
import { API_URL } from '../../constants/Strings';

export default function CreateEvents ({USER_ID}) {
    console.log("CreateEvents.js-----------------------------route : ", USER_ID);

    const [ShowCalendar, set_ShowCalendar] = useState(false);
    const [ShowTime, set_ShowTime] = useState(false);

    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [date, setDate] = useState(new Date())
    const [EventName, set_EventName] = useState("");
    const [Contact, set_Contact] = useState("");
    const [EmailID, set_EmailID] = useState("");
    const [EventDate, set_EventDate] = useState(new Date());
    const [EventTime, set_EventTime] = useState("");
    const [EventLink, set_EventLink] = useState("");
    const [EventMeetingV, set_EventMeetingV] = useState("");
    const [Location, set_Location] = useState("");
    const [EventDes, set_EventDes] = useState("");
    const [EventMode, set_EventMode] = useState("Select");
    const [EventModeDes, set_EventModeDes] = useState("");
    const [EventPrice, set_EventPrice] = useState(0.00);
    const ModeList = [{id: 1, mode: "Online"}, {id: 2, mode: "Offline"}];
    const [SubmitBMarTop, set_SubmitBMarTop] = useState("0%");
    
    const [ModeLView, set_ModeLView] = useState("none");
    const [isKeyboardVisible, set_KeyboardVisible] = useState("0%");
    let CuresorPost = 0;

    const fadeInValue = new Animated.Value(0)
    const spinValue = new Animated.Value(0)

    const [rotateValue, setRotateValue] = useState(new Animated.Value(0));

    const handleAnimationClockW = () => {
      Animated.timing(rotateValue, {
        toValue: 180,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };
    const handleAnimationAntiClockW = () => {
        Animated.timing(rotateValue, {
          toValue: -0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
            rotateValue.setValue(0);
          });
    };
    //----------------------------------
    useEffect(()=>{
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
            console.log("KeyBoard is Open");
                //if(CuresorPost == 1)
                set_KeyboardVisible("-15%");
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
    }, []);

    //-----------------------------------
    const SubmitToServer = () => {
        console.log('SubmitToServer ====> ', EventModeDes.length, EventDes.length);
        if(EventName.length > 0 && Contact.length > 5 && EmailID.length > 6 &&
            EventDate.length > 0 && EventMode.length > 0 &&
            EventDes.length > 10){
            setIsDataLoaded(true);
            var EventData = qs.stringify({
                create_event: '1',
                user_id: USER_ID,
                evnet_name: EventName,
                contact: Contact,
                email: EmailID,
                event_date: EventDate,
                time: EventTime,
                platform: EventMode,
                metting: EventMode,
                link: EventLink,
                venue: EventMeetingV,
                location: Location,
                price: EventPrice,
                description: EventDes,
            });

            var EventHeader = new Headers();
                EventHeader.append('accept', 'application/json');
                EventHeader.append('Content-Type', 'application/x-www-form-urlencoded');
                EventHeader.append('Cookie', 'PHPSESSID=u2jcj8bnk6e2kcj7hke0fdt0mm');

            axios
                .post(API_URL, EventData, {headers: EventHeader})
                .then(function (response) {
                console.log('Event Create Response ====>', response);

                if (response.data.success == 1) {
                    Alert.alert(response.data.message);
                    showMessage({
                    message: 'success',
                    description: "Event successfully created.",             //response.data.message,
                    type: 'default',
                    backgroundColor: 'green',
                    });
                } else {
                    showMessage({
                    message: 'Error',
                    description: ''+response.data.message,
                    type: 'default',
                    backgroundColor: 'red',
                    });
                }
                setIsDataLoaded(false);
            }).catch(function (err) {
                console.log('err', err);
            });
        }else{
            Alert.alert("Please fill neccessory information");
        }
        setTimeout(()=> setIsDataLoaded(false), 1000);
    }
    //-----------------------------------
    const ShowModeList = (item, index) => {
        console.log("ShowModeList, item : ", item);
        return(
            <TouchableOpacity style={{flexDirection: 'column', width: "50%", marginTop: 10}}
                onPress={()=>{
                    set_EventMode(item.mode)
                    set_ModeLView("none")
                    set_SubmitBMarTop("0%")
                    handleAnimationAntiClockW();
                    if(item.mode == "Online"){
                        set_SubmitBMarTop("25%")
                    }
                    if(item.mode == "Offline"){
                        set_SubmitBMarTop("40%")
                    }
                }}>
                <Text style={{fontSize: 22, color: "#000000", marginLeft: 10}}>{item.mode}</Text>
            </TouchableOpacity>
        );
    }
    //-----------------------------------
    return (
        <View style={[styles.page, {top: isKeyboardVisible}]}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{marginLeft: 20, marginTop: 40, flex: 1,}}>
            <TextInput placeholder="  Event Name"
                onChangeText={(textR) => {
                    set_EventName(textR);
                    CuresorPost = 0;
                }}
                style={[styles.textInput, {width: SIZES.width * 0.9, backgroundColor: "#F3F2F2",
                    height: SIZES.height * 0.05, alignItems: "flex-start", fontSize: 17,
                    justifyContent: "flex-start", textAlignVertical: 'top',
                    borderRadius: 20, color: "#000000"}]}
                value={EventName}/>

            <TextInput
                placeholder="  Contact"
                onChangeText={(textR) => {
                    set_Contact(textR);
                    CuresorPost = 0;
                }}
                style={[styles.textInput, {width: SIZES.width * 0.9, backgroundColor: "#F3F2F2",
                    height: SIZES.height * 0.05, alignItems: "flex-start", fontSize: 17,
                    justifyContent: "flex-start", textAlignVertical: 'top', marginTop: 20,
                    borderRadius: 20, color: "#000000"}]}
                value={Contact} keyboardType='decimal-pad'/>

            <TextInput
                placeholder="  Email"
                onChangeText={(textR) => {
                    set_EmailID(textR);
                    CuresorPost = 0;
                }}
                style={[styles.textInput, {width: SIZES.width * 0.9, backgroundColor: "#F3F2F2",
                    height: SIZES.height * 0.05, alignItems: "flex-start", fontSize: 17,
                    justifyContent: "flex-start", textAlignVertical: 'top', marginTop: 20,
                    borderRadius: 20, color: "#000000"}]}
                value={EmailID}/>

            <View style={{flexDirection: 'row', width: "100%"}}>
            <View style={{flexDirection: 'column', width: "50%"}}>
                <View style={{flexDirection: 'row', width: "100%"}}>
                    <TextInput
                        placeholder="  Event Date"
                        onChangeText={(textR) => {
                            set_EventDate(textR);
                            CuresorPost = 0;
                        }}
                        style={[styles.textInput, {width: "70%", backgroundColor: "#F3F2F2",
                            height: SIZES.height * 0.05, alignItems: "flex-start", fontSize: 17,
                            justifyContent: "flex-start", textAlignVertical: 'top', marginTop: 20,
                            borderRadius: 20}]}
                        value={EventDate}/>
                    <TouchableOpacity style={{width: "25%", height: "100%"}}
                        onPress={()=>set_ShowCalendar(!ShowCalendar)}>
                        <AntDesign name="calendar" size={30} color="black"
                            style={{marginTop: 24}} />
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

                        set_EventDate(`${nD.getFullYear()}-${nD.getMonth()+1}-${nD.getDate()}`);
                        //console.log("Date Picker, EventDate : ", EventDate);
                        }}
                        onCancel={() => {
                        set_ShowCalendar(false)
                        }}
                    />
            </View>
            <View style={{flexDirection: 'column', width: "50%"}}>
                    <View style={{flexDirection: 'row', width: "100%", marginLeft: 10}}>
                        <TextInput
                            placeholder="  Time"
                            onChangeText={(textR) => {
                                set_EventTime(textR);
                                CuresorPost = 1;
                            }}
                            style={[styles.textInput, {width: "60%", backgroundColor: "#F3F2F2",
                                height: SIZES.height * 0.05, alignItems: "flex-start", fontSize: 17,
                                justifyContent: "flex-start", textAlignVertical: 'top', marginTop: 20,
                                borderRadius: 20}]}
                            value={EventTime} keyboardType='decimal-pad'/>
                        <TouchableOpacity style={{width: "25%", height: "100%"}}
                            onPress={()=>set_ShowTime(!ShowTime)}>
                            <MaterialCommunityIcons name="clock-time-eight-outline" size={40} color="black"
                                style={{marginTop: 20}} />
                        </TouchableOpacity>
                    </View>
                    <DatePicker
                        modal
                        mode='time'
                        open={ShowTime}
                        date={date}
                        onConfirm={(date) => {
                        set_ShowTime(false)
                        set_EventTime(`${date.getHours()}:${date.getMinutes()}`);
                        }}
                        onCancel={() => {
                        set_ShowTime(false)
                        }}
                    />
                </View>
            </View>

            <TextInput
                placeholder="  Price"
                onChangeText={(textR) => {
                    set_EventPrice(textR);
                    CuresorPost = 1;
                }}
                style={[styles.textInput, {width: "45%", backgroundColor: "#F3F2F2",
                    height: SIZES.height * 0.05, alignItems: "flex-start", fontSize: 17,
                    justifyContent: "flex-start", textAlignVertical: 'top', marginTop: 20,
                    borderRadius: 20}]}
                value={EventPrice} keyboardType='decimal-pad'/>

            <TextInput
                placeholder="Description"
                onChangeText={(textR) => {
                    set_EventDes(textR);
                    CuresorPost = 1;
                }}
                style={[styles.textInput, {width: SIZES.width * 0.9, backgroundColor: "#F3F2F2",
                    height: SIZES.height * 0.2, alignItems: "flex-start", fontSize: 17,
                    justifyContent: "flex-start", textAlignVertical: 'top', marginTop: 20,
                    borderRadius: 20}]}
                value={EventDes}/>
            <View style={{flexDirection: 'row', width: "100%", marginTop: 20}}>
                <Text style={{color: "#000000", fontSize: 17, marginTop: 10}}>Mode of event :</Text>
                <TouchableOpacity style={{width: SIZES.width * 0.55, backgroundColor: "#F3F2F2",
                        height: SIZES.height * 0.05, fontSize: 17,
                        marginTop: 5, marginLeft: 10, alignItems: 'center',
                        borderRadius: 20, flexDirection: 'row'}}
                        onPress={()=> {
                            if(ModeLView == "none"){
                                set_ModeLView("flex");
                                handleAnimationClockW();
                            }else{
                                set_ModeLView("none");
                                handleAnimationAntiClockW();
                            }
                        }}>
                    <Text style={{color: "#000000", fontSize: 17, marginTop: 0,
                            marginLeft: 10, width: SIZES.width * 0.45}}>{EventMode}</Text>
                     <Animated.View
                        style={{
                        transform: [{ rotate: rotateValue.interpolate({
                            inputRange: [0, 180],
                            outputRange: ["0deg", "180deg"],
                        }) }],
                        }}
                    >
                    <AntDesign name="caretdown" size={20} color="black"/>
                        </Animated.View>
                </TouchableOpacity>
            </View>
            <View style={{width: "57%", height: "15%", left: "36%", display: ModeLView,
                    backgroundColor: "#F3F2F2", marginTop: 3,
                    borderRadius: 20,
                }}>
                <FlatList contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false} nestedScrollEnabled
                    data={ModeList} style={[styles.dropdownClass, {}]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => ShowModeList(item, index)}
                />
            </View>
            <View style={{flexDirection: 'row', width: "100%", marginTop: 5,
                            marginBottom: 10}}>
            {
                EventMode == "Select" ? (
                    <></>
                ):(
                    EventMode == "Online" ? (
                        <View style={{flexDirection: 'column', width: "100%", marginTop: 0,
                            }}>
                            <TextInput
                                placeholder={"Description for "+EventMode}
                                onChangeText={(textR) => {
                                    set_EventLink(textR);
                                    CuresorPost = 1;
                                }}
                                style={[styles.textInput, {width: SIZES.width * 0.9, backgroundColor: "#F3F2F2",
                                    height: SIZES.height * 0.1,
                                    alignItems: "flex-start", fontSize: 17,
                                    justifyContent: "flex-start", textAlignVertical: 'top', marginTop: 20,
                                    borderRadius: 20}]}
                                value={EventLink}/>
                        </View>
                    ):(
                        <View style={{flexDirection: 'column', width: "100%", marginTop: 0,
                            }}>
                            <TextInput
                                placeholder={"Meeting Venue for "+EventMode}
                                onChangeText={(textR) => {
                                    set_EventMeetingV(textR);
                                    CuresorPost = 1;
                                }}
                                style={[styles.textInput, {width: SIZES.width * 0.9, backgroundColor: "#F3F2F2",
                                    height: SIZES.height * 0.1,
                                    alignItems: "flex-start", fontSize: 17,
                                    justifyContent: "flex-start", textAlignVertical: 'top', marginTop: 20,
                                    borderRadius: 20}]}
                                value={EventMeetingV}/>

                            <TextInput
                                placeholder={"Location"}
                                onChangeText={(textR) => {
                                    set_Location(textR);
                                    CuresorPost = 1;
                                }}
                                style={[styles.textInput, {width: SIZES.width * 0.9, backgroundColor: "#F3F2F2",
                                    height: EventMode == "Online" ? SIZES.height * 0.1 : SIZES.height * 0.2,
                                    alignItems: "flex-start", fontSize: 17,
                                    justifyContent: "flex-start", textAlignVertical: 'top', marginTop: 20,
                                    borderRadius: 20}]}
                                value={Location}/>

                        </View>
                    )
                )
            }
            </View>

            <View style={{width: "100%", height: SIZES.width * 0.12, alignItems: 'center',
                marginTop: 10}}>
                <View style={{width: "47%", height: "100%", alignItems: 'center',
                    justifyContent: 'center', borderRadius: 27,
                    backgroundColor: color.primary_color,}}>
                    {
                        isDataLoaded ? (
                            <ActivityIndicator/>
                        ):(
                            <TouchableOpacity onPress={()=>SubmitToServer()}>
                                <Text style={{color: color.white, fontSize: 20,
                                    fontWeight: 'bold'}}>{"Submit"}</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
            <View style={{marginTop: ModeLView == 'none' ? 60 : 80}}/>
            
            </View>
            </ScrollView>
        </View>
    );
};

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
    marginTop: "7%",
    marginBottom: "4%",
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
  dropdownClass: {
    backgroundColor: "#F3F2F2",
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
  },

});
