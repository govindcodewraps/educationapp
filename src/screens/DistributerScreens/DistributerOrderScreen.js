import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Header from '../../components/Header';

import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../assets/theme/color';
import {FONTS, SIZES} from '../../assets/theme/theme';
import VioletButton from '../../components/VioletButton';
import {useSelector} from 'react-redux';
import axios from 'axios';
import * as qs from 'qs';
import {API_URL} from '../../constants/Strings';
import SelectDropdown from 'react-native-select-dropdown';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function DistributerOrderScreen({navigation}) {
  const reduxUser = useSelector(state => state.user);
  const [enquiryData, setEnquiryData] = useState([]);
  const [filterListdata, setFilterListData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [count, setCount] = useState();
  const [cartData, setCartData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const dropdownRef = useRef({});

  const monthData = [
    // { name: "select", id: "0" },
    {name: 'January', id: '01'},
    {name: 'February', id: '02'},
    {name: 'March', id: '03'},
    {name: 'April', id: '04'},
    {name: 'May', id: '05'},
    {name: 'June', id: '06'},
    {name: 'July', id: '07'},
    {name: 'August', id: '08'},
    {name: 'September', id: '09'},
    {name: 'October', id: '10'},
    {name: 'November', id: '11'},
    {name: 'December', id: '12'},
  ];

  const orderList = () => {
    var enquiryHeader = new Headers();
    enquiryHeader.append('accept', 'application/json');
    enquiryHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    enquiryHeader.append('Cookie', 'PHPSESSID=suum1ijkct2niss9cppuoem8v1');

    var enquiryFormData = qs.stringify({
      enquiry_history: '1',
      user_id: reduxUser.customer.id,
    });
    axios
      .post(
        `${API_URL}?enquiry_history=1&user_id=${reduxUser.customer.id}`,
        enquiryFormData,
        {
          headers: enquiryHeader,
        },
      )
      .then(function (response) {
        console.log('enq', response);
        if (response.data.success == 1) {
          setEnquiryData(response.data.data);
          setFilterListData(response.data.data);
        }
      });
  };

  useEffect(() => {
    orderList();
    navigation.addListener('focus', () => orderList()),
      dropdownRef.current.reset();
  }, []);

  const ListFilter = id => {
    console.log('id', id);

    // if (id === "0") {
    //   setRefresh((prev) => !prev);
    //   setFilterListData(ordersList);
    // } else {
    const newArray = enquiryData.filter(function (a) {
      // console.log("a", a.order_date?.split("-")[1]);
      return a.order_date?.split('-')[1] === id;
    });
    setRefresh(prev => !prev);
    setFilterListData(newArray);
    // }
  };

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

  const renderOrderList = ({item, index}) => {
    const Date = item.order_date.split(' ')[0];
    const time = item.order_date.split(' ')[1];

    return (
      <View style={styles.mainView}>
        <View style={styles.firstView}>
          {/* <View style={styles.imgView}>
            <Image resizeMode="contain" style={styles.img} source={item.img} />
          </View> */}
          <View style={styles.nameView}>
            <Text style={styles.nameTxt}>OrderId:- {item.order_id}</Text>
            <Text style={styles.addrsTxt}>Order Amount:- €{item.amount}</Text>
            <Text style={styles.addrsTxt}>Order Date:- {Date}</Text>
            <Text style={styles.addrsTxt}>Order Time:- {time}</Text>
          </View>
          <View style={styles.btnView}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                navigation.navigate('DistributerOrderTrack', {
                  order_id: item.order_id,
                })
              }>
              <Text style={styles.btnTxt}>View Details</Text>
            </TouchableOpacity>
            {/* <VioletButton buttonName={"Reorder"} /> */}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: color.white}}>
      <Header
        navigation={navigation}
        gotoCart={() => navigation.navigate('CheckoutStack')}
        cartCount={cartData == '' ? 0 : count}
      />

      {/* <View style={styles.view1}>
        <Text style={styles.txt1}>This Month</Text>
        <View style={styles.iconView}>
          <Text style={styles.txt2}>Filter</Text>
          <TouchableOpacity>
            <Ionicons name="chevron-down" size={35} color={color.light_grey} />
          </TouchableOpacity>
        </View>
      </View> */}

      <View style={styles.view1}>
        <Text style={styles.txt1}>This Month</Text>
        <View style={styles.iconView}>
          <TouchableOpacity>
            {/* <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.txt2}>Filter</Text>
                <Ionicons
                  name="chevron-down"
                  size={35}
                  color={color.light_grey}
                />
              </View> */}
            <SelectDropdown
              ref={dropdownRef}
              data={monthData}
              // .map(
              // (item) => {
              //   console.log("iiii", item);
              // }
              // { name: item.name, id: item.id }
              // )}
              defaultButtonText="Filter"
              onSelect={(selectedItem, index) => {
                console.log('select', selectedItem.id);
                ListFilter(selectedItem.id);
                // dropdownRef.current.reset();
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
              buttonStyle={{
                overflow: 'hidden',
                width: wp(31),
                height: hp(5),
                color: color.white,
                backgroundColor: color.primary_color,
                borderRadius: 5,
              }}
              buttonTextStyle={styles.btnTxt2}
              rowTextStyle={styles.row_text}
              dropdownStyle={{width: '32%'}}
              renderDropdownIcon={isOpened => {
                return (
                  <Ionicons
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={color.text_primary}
                    size={25}
                  />
                );
              }}
              dropdownIconPosition={'right'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filterListdata}
        renderItem={renderOrderList}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view1: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.width / 30,
    marginVertical: SIZES.height / 50,
  },
  txt1: {
    fontSize: SIZES.h3,
    color: color.black,
    fontFamily: FONTS.primarytext2,
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt2: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.primarytext2,
  },
  mainView: {
    borderWidth: 0.3,
    borderColor: color.black,
    borderRadius: 5,
    // paddingHorizontal: SIZES.width / 50,
    // paddingVertical: SIZES.height / 64 - 40,
    marginHorizontal: SIZES.width / 30,
    marginVertical: 5,
  },
  firstView: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomWidth: 0.4,
    borderBottomColor: color.black,
    paddingVertical: SIZES.height / 50,
    paddingHorizontal: 20,
    // backgroundColor: 'red',
    // marginVertical: 40,
  },
  // imgView: {
  //   alignItems: 'flex-start',
  //   justifyContent: 'center',
  //   flex: 0.6,
  // },
  img: {
    height: SIZES.height / 11,
    width: SIZES.width / 5,
  },
  nameView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  btnView: {
    flex: 0.55,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btn: {
    backgroundColor: color.primary_color,
    paddingHorizontal: SIZES.width / 50,
    paddingVertical: SIZES.height / 64 - 5,
    borderRadius: 5,
  },
  btnTxt: {
    color: color.white,
    fontFamily: FONTS.primarytext3,
    fontSize: SIZES.h4 - 3,
  },
  secondView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: SIZES.height / 40,
    borderBottomWidth: 0.3,
    paddingBottom: 10,
  },
  nameTxt: {
    fontSize: SIZES.h4,
    fontFamily: FONTS.primarytext2,
    marginBottom: 5,
    color: color.black,
  },
  addrsTxt: {
    fontSize: SIZES.h4,
    color: color.black,
    fontFamily: FONTS.primarytext3,
  },
});
