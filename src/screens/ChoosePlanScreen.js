import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import color from '../assets/theme/color';
import {FONTS, SIZES} from '../assets/theme/theme';
import Headline from '../components/text/Headline';
import SubHeadline from '../components/text/SubHeadline';

import Entypo from 'react-native-vector-icons/Entypo';
import App_Button from '../components/buttons/App_Button';

export default function ChoosePlanScreen({navigation, route}) {
  const [selPlan, setSelectPlan] = useState('');

  const changeplan = selChangePlan => {
    setSelectPlan(selChangePlan);
  };

  // const {select_type} = route.params;
  // console.log(select_type);

  const handleProfessionalLogin = () => {
    if (selPlan == 'Basic') {
      navigation.navigate('BasicSignup', {selPlan: 'Basic'});
    } else if (selPlan == 'Standard') {
      navigation.navigate('Login', {selPlan: 'Standard'});
    } else if (selPlan == 'Premium') {
      navigation.navigate('ChoosePremiumOptionScreen', {selPlan: 'Premium'});
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.primary_color} />
      <View style={styles.main_container}>
        <View style={styles.headline}>
          <Headline title={'Choose Your Plans'} />
          <SubHeadline
            subTitle={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            }
          />
        </View>
        {/* option section */}
        <View style={styles.planView}>
          <TouchableOpacity
            onPress={() => changeplan('Basic')}
            style={[
              styles.planSec1,
              {
                backgroundColor:
                  selPlan == 'Basic' ? color.primary_color : color.white,
              },
            ]}
            activeOpacity={0.3}>
            {selPlan == 'Basic' ? (
              <View style={styles.priceSce}>
                <View>
                  <Text
                    style={[
                      styles.txt,
                      {color: selPlan == 'Basic' ? color.white : color.black},
                    ]}>
                    BASIC PLAN
                  </Text>
                </View>
                <View style={styles.price}>
                  <Text
                    style={[
                      styles.priceTxt,
                      {color: selPlan == 'Basic' ? color.white : color.black},
                    ]}>
                    €999
                  </Text>
                  <Text
                    style={[
                      styles.priceTxt2,
                      {color: selPlan == 'Basic' ? color.white : color.black},
                    ]}>
                    €499
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.priceSce}>
                <View>
                  <Text style={styles.txt}>BASIC PLAN</Text>
                </View>
                <View style={styles.price}>
                  <Text style={styles.priceTxt}>€999</Text>
                  <Text style={styles.priceTxt2}>€499</Text>
                </View>
              </View>
            )}

            <View style={styles.valmainView}>
              <View style={styles.valView}>
                {selPlan == 'Basic' ? (
                  <Entypo name="dot-single" size={30} color={color.white} />
                ) : (
                  <Entypo
                    name="dot-single"
                    size={30}
                    color={color.primary_color}
                  />
                )}

                <Text
                  style={[
                    styles.valTxt,
                    {color: selPlan == 'Basic' ? color.white : color.grey},
                  ]}>
                  Study Content PDF/Video Access
                </Text>
              </View>
              <View style={styles.valView}>
                {selPlan == 'Basic' ? (
                  <Entypo name="dot-single" size={30} color={color.white} />
                ) : (
                  <Entypo
                    name="dot-single"
                    size={30}
                    color={color.primary_color}
                  />
                )}
                <Text
                  style={[
                    styles.valTxt,
                    {color: selPlan == 'Basic' ? color.white : color.grey},
                  ]}>
                  3 Months Plan
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => changeplan('Standard')}
            style={[
              styles.planSec1,
              {
                backgroundColor:
                  selPlan == 'Standard' ? color.primary_color : color.white,
              },
            ]}
            activeOpacity={0.3}>
            {selPlan == 'Standard' ? (
              <View style={styles.priceSce}>
                <View>
                  <Text
                    style={[
                      styles.txt,
                      {
                        color:
                          selPlan == 'Standard' ? color.white : color.black,
                      },
                    ]}>
                    STANDARD PLAN
                  </Text>
                </View>
                <View style={styles.price}>
                  <Text
                    style={[
                      styles.priceTxt,
                      {
                        color:
                          selPlan == 'Standard' ? color.white : color.black,
                      },
                    ]}>
                    €1,599
                  </Text>
                  <Text
                    style={[
                      styles.priceTxt2,
                      {
                        color:
                          selPlan == 'Standard' ? color.white : color.black,
                      },
                    ]}>
                    €999
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.priceSce}>
                <View>
                  <Text style={styles.txt}>STANDARD PLAN</Text>
                </View>
                <View style={styles.price}>
                  <Text style={styles.priceTxt}>€1,599</Text>
                  <Text style={styles.priceTxt2}>€999</Text>
                </View>
              </View>
            )}

            <View style={styles.valmainView}>
              <View style={styles.valView}>
                {selPlan == 'Standard' ? (
                  <Entypo name="dot-single" size={30} color={color.white} />
                ) : (
                  <Entypo
                    name="dot-single"
                    size={30}
                    color={color.primary_color}
                  />
                )}

                <Text
                  style={[
                    styles.valTxt,
                    {color: selPlan == 'Standard' ? color.white : color.grey},
                  ]}>
                  Study Content PDF/Video Access
                </Text>
              </View>
              <View style={styles.valView}>
                {selPlan == 'Standard' ? (
                  <Entypo name="dot-single" size={30} color={color.white} />
                ) : (
                  <Entypo
                    name="dot-single"
                    size={30}
                    color={color.primary_color}
                  />
                )}
                <Text
                  style={[
                    styles.valTxt,
                    {color: selPlan == 'Standard' ? color.white : color.grey},
                  ]}>
                  3 Months Plan
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => changeplan('Premium')}
            style={[
              styles.planSec1,
              {
                backgroundColor:
                  selPlan == 'Premium' ? color.primary_color : color.white,
              },
            ]}
            activeOpacity={0.3}>
            {selPlan == 'Premium' ? (
              <View style={styles.priceSce}>
                <View>
                  <Text
                    style={[
                      styles.txt,
                      {color: selPlan == 'Premium' ? color.white : color.black},
                    ]}>
                    PREMIUM PLAN
                  </Text>
                </View>
                <View style={styles.price}>
                  <Text
                    style={[
                      styles.priceTxt,
                      {color: selPlan == 'Premium' ? color.white : color.black},
                    ]}>
                    €1,999
                  </Text>
                  <Text
                    style={[
                      styles.priceTxt2,
                      {color: selPlan == 'Premium' ? color.white : color.black},
                    ]}>
                    €1,599
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.priceSce}>
                <View>
                  <Text style={styles.txt}>PREMIUM PLAN</Text>
                </View>
                <View style={styles.price}>
                  <Text style={styles.priceTxt}>€1,999</Text>
                  <Text style={styles.priceTxt2}>€1,599</Text>
                </View>
              </View>
            )}

            <View style={styles.valmainView}>
              <View style={styles.valView}>
                {selPlan == 'Premium' ? (
                  <Entypo name="dot-single" size={30} color={color.white} />
                ) : (
                  <Entypo
                    name="dot-single"
                    size={30}
                    color={color.primary_color}
                  />
                )}

                <Text
                  style={[
                    styles.valTxt,
                    {color: selPlan == 'Premium' ? color.white : color.grey},
                  ]}>
                  Study Content PDF/Video Access
                </Text>
              </View>
              <View style={styles.valView}>
                {selPlan == 'Premium' ? (
                  <Entypo name="dot-single" size={30} color={color.white} />
                ) : (
                  <Entypo
                    name="dot-single"
                    size={30}
                    color={color.primary_color}
                  />
                )}
                <Text
                  style={[
                    styles.valTxt,
                    {color: selPlan == 'Premium' ? color.white : color.grey},
                  ]}>
                  1 Year Plan
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.btn}>
          <App_Button
            title={'Pay Now'}
            onPress={() => handleProfessionalLogin()}
            // onPress={() => navigation.navigate('Login')}
          />
          <Text style={styles.bottomTxt}>I will do it later</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  main_container: {
    paddingHorizontal: 20,
  },
  headline: {
    marginTop: SIZES.width / 6,
  },
  planView: {
    marginTop: 60,
  },
  planSec1: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: color.primary_color,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
  },
  priceSce: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valmainView: {
    marginTop: 20,
  },
  valView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  txt: {
    fontFamily: FONTS.Rubik_medium,
    fontSize: 20,
  },
  priceTxt: {
    textDecorationLine: 'line-through',
    fontFamily: FONTS.primarytext1,
    fontSize: 20,
  },
  priceTxt2: {
    fontFamily: FONTS.primarytext5,
    marginLeft: 5,
    fontSize: 20,
    color: color.primary_color,
  },
  valTxt: {
    fontSize: 15,
    fontFamily: FONTS.primarytext1,
  },
  btn: {
    marginTop: SIZES.height / 12,
    paddingHorizontal: SIZES.width / 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTxt: {
    fontFamily: FONTS.primarytext1,
    marginTop: 5,
  },
});
