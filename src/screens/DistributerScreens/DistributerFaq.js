import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import HamburgerHeader from '../../components/HamburgerHeader';
import color from '../../assets/theme/color';
import {FONTS, SIZES} from '../../assets/theme/theme';
import {Divider, List} from 'react-native-paper';
import {API_URL} from '../../constants/Strings';
import axios from 'axios';
import * as qs from 'qs';
import {useSelector} from 'react-redux';
export default function DistributerFaq({navigation}) {
  const [expendedSec1, setExpandedSec1] = useState(true);
  const [expendedSec2, setExpandedSec2] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [faq, setFaq] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [count, setCount] = useState();
  const reduxUser = useSelector(state => state.user);

  const handleexpendedSec1 = () => setExpandedSec1(!expendedSec1);

  const handleexpendedSec2 = () => setExpandedSec2(!expendedSec2);
  // const [expendedHome, setExpandedHome] = useState(true);
  // const [expendedFamily, setExpendedFamily] = useState(true);
  // const [expendedKhat, setExpendedKhat] = useState(true);
  // const [expendedFriend, setExpendedFriend] = useState(true);

  // const handleHomePress = () => setExpandedHome(!expendedHome);
  // const handleFamilyPress = () => setExpendedFamily(!expendedFamily);
  // const handleKhatPress = () => setExpendedKhat(!expendedKhat);
  // const handleFriendPress = () => setExpendedFriend(!expendedFriend);

  useEffect(() => {
    var policyHeader = new Headers();
    policyHeader.append('accept', 'application/json');
    policyHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    policyHeader.append('Cookie', 'PHPSESSID=vlr3nr52586op1m8ie625ror6b');

    var policyData = qs.stringify({
      get_faq: '1',
    });

    axios
      .post(API_URL, policyData, {
        headers: policyHeader,
      })
      .then(function (response) {
        if (response.data.success == 1) {
          setIsDataLoaded(true);
          setFaq(response.data.data);
        }
      });
  }, []);

  console.log('faq', faq);

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

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        gotoCart={() => navigation.navigate('CheckoutStack')}
        cartCount={cartData == '' ? 0 : count}
      />
      <HamburgerHeader hamTitle={'FAQ'} />
      <ScrollView>
        {faq.map((value, index) => (
          <List.Section>
            <List.Accordion
              style={{
                elevation: 6,
                shadowColor: color.black,
                backgroundColor: color.white,
                shadowOffset: {
                  width: 0,
                  height: 20,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
              }}
              titleStyle={{color: 'black', fontSize: 18, fontWeight: 'bold'}}
              title={
                <View>
                  <Text
                    style={{
                      fontFamily: FONTS.primarytext1,
                      color: color.black,
                      fontSize: SIZES.h3,
                    }}>
                    {value.question}
                  </Text>
                </View>
              }
              right={props =>
                expendedSec1 ? (
                  // <List.Icon {...props} icon="chevron-down" color="black" />
                  <View style={{flexDirection: 'row'}}>
                    {/* <List.Icon {...props} icon="download" color="black" /> */}
                    <List.Icon
                      {...props}
                      icon="minus-circle"
                      color={color.dark_theme}
                    />
                  </View>
                ) : (
                  <View style={{flexDirection: 'row'}}>
                    <List.Icon
                      {...props}
                      icon="plus-circle"
                      color={color.dark_theme}
                    />
                  </View>
                )
              }
              expended={expendedSec1}
              onPress={handleexpendedSec1}>
              <List.Accordion
                right={props => <List.Icon {...props} />}
                titleStyle={{
                  fontSize: 14,
                  color: 'black',
                  fontWeight: 'bold',
                  // marginHorizontal: 10,
                }}
                title={value.answer}></List.Accordion>
            </List.Accordion>
          </List.Section>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});
