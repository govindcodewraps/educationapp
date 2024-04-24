import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import color from '../../assets/theme/color';
import {Checkbox, RadioButton} from 'react-native-paper';

import {FONTS, SIZES} from '../../assets/theme/theme';

import Headline from '../../components/text/Headline';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {PaymentIcon} from 'react-native-payment-icons';
import SelectDropdown from 'react-native-select-dropdown';

import App_Button from '../../components/buttons/App_Button';

export default function PremiumPaymentOption({navigation}) {
  const [checked, setChecked] = React.useState('first');
  const [checked2, setChecked2] = React.useState(false);

  const [selOpt, setSelOpt] = useState('');

  const [value, setValue] = useState('');
  const handleSelect = ele => {
    // console.log('e', e);
    setValue(ele);
  };

  const changeSelect = selType => {
    setSelOpt(selType);
  };

  const renderDropdownIcon = () => {
    return <Ionicons name="chevron-down" size={20} />;
  };

  const year = [
    'Month 1',
    'Month 2',
    'Month 3',
    'Month 4',
    'Month 5',
    'Month 6',
    'Month 7',
    'Month 8',
    'Month 9',
    'Month 10',
    'Month 11',
    'Month 12',
  ];
  const month = [
    'Month 1',
    'Month 2',
    'Month 3',
    'Month 4',
    'Month 5',
    'Month 6',
    'Month 7',
    'Month 8',
    'Month 9',
    'Month 10',
    'Month 11',
    'Month 12',
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.primary_color} />
      <ScrollView>
        <View style={styles.main_container}>
          <View style={styles.headline}>
            <Headline title={'How will you be paying?'} />
          </View>
          <View style={styles.optionView}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[
                styles.opt1,
                {
                  backgroundColor:
                    selOpt == 'Card' ? color.primary_color : color.chat_bg,
                },
              ]}
              onPress={() => changeSelect('Card')}>
              <View style={styles.optionSec}>
                {selOpt == 'Card' ? (
                  <View style={styles.sec1}>
                    <FontAwesome5
                      name="credit-card"
                      color={color.white}
                      size={20}
                    />
                    <Text style={[styles.txt, {color: color.white}]}>
                      Credit/Debit Card
                    </Text>
                  </View>
                ) : (
                  <View style={styles.sec1}>
                    <FontAwesome5
                      name="credit-card"
                      color="#0DBAF0"
                      size={20}
                    />
                    <Text style={styles.txt}>Credit/Debit Card</Text>
                  </View>
                )}
                <View>
                  <RadioButton
                    value="first"
                    status={
                      selOpt == 'Card'
                        ? checked === 'first'
                          ? 'checked'
                          : 'unchecked'
                        : !checked === 'first'
                        ? 'checked'
                        : 'unchecked'
                    }
                    color={selOpt == 'Card' && color.white}
                    onPress={() => setChecked('first')}
                  />
                </View>
              </View>
              {selOpt == 'Card' ? (
                <>
                  <View style={styles.cardView}>
                    <View style={styles.cardSec}>
                      <View style={styles.card}>
                        <PaymentIcon type="visa" width={50} />
                      </View>
                      <View style={styles.card}>
                        <PaymentIcon type="paypal" width={50} />
                      </View>
                      <View style={styles.card}>
                        <PaymentIcon type="master" width={50} />
                      </View>
                      <View style={styles.card}>
                        <PaymentIcon type="american-express" width={50} />
                      </View>
                    </View>
                  </View>
                  <View style={styles.inputView}>
                    <View style={styles.view1}>
                      <TextInput placeholder="Card name" style={styles.input} />
                    </View>
                    <View style={styles.view2}>
                      <SelectDropdown
                        data={year}
                        onSelect={(selectedItem, index) => {
                          console.log(selectedItem, index);
                          handleSelect(selectedItem);
                        }}
                        buttonStyle={{
                          flex: 1,
                          width: SIZES.width - 50,
                          marginVertical: SIZES.height / 64,
                          borderBottomColor: 'black',
                          borderWidth: 0.5,
                          backgroundColor: color.white,
                        }}
                        defaultButtonText="Expiry year"
                        buttonTextStyle={{
                          textAlign: 'left',
                          fontSize: 15,
                          left: 12,
                          color: color.grey,
                        }}
                        renderDropdownIcon={renderDropdownIcon}
                        dropdownIconPosition="right"
                      />
                      <SelectDropdown
                        data={month}
                        onSelect={(selectedItem, index) => {
                          console.log(selectedItem, index);
                          handleSelect(selectedItem);
                        }}
                        buttonStyle={{
                          flex: 1,
                          width: SIZES.width - 50,
                          marginVertical: SIZES.height / 64,
                          borderBottomColor: 'black',
                          borderWidth: 0.5,
                          backgroundColor: color.white,
                          marginRight: 10,
                        }}
                        defaultButtonText="Expiry month"
                        buttonTextStyle={{
                          textAlign: 'left',
                          fontSize: 15,
                          left: 12,
                          color: color.grey,
                        }}
                        renderDropdownIcon={renderDropdownIcon}
                        dropdownIconPosition="right"
                      />
                    </View>
                    <View style={styles.view3}>
                      <View>
                        <TextInput placeholder="CVV" style={styles.cvvInput} />
                      </View>
                      <View style={styles.chkView}>
                        <Checkbox
                          status={checked2 ? 'checked' : 'unchecked'}
                          onPress={() => {
                            setChecked2(!checked2);
                          }}
                          color={color.white}
                        />
                        <Text style={styles.saveTxt}>
                          Save card information
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[
                styles.opt1,
                {
                  backgroundColor:
                    selOpt == 'Bancontact'
                      ? color.primary_color
                      : color.chat_bg,
                },
              ]}
              onPress={() => changeSelect('Bancontact')}>
              <View style={styles.optionSec}>
                {selOpt == 'Bancontact' ? (
                  <View style={styles.sec1}>
                    <FontAwesome name="bank" color={color.white} size={20} />
                    <Text style={[styles.txt, {color: color.white}]}>
                      Bancontact
                    </Text>
                  </View>
                ) : (
                  <View style={styles.sec1}>
                    <FontAwesome name="bank" color="#0DBAF0" size={20} />
                    <Text style={styles.txt}>Bancontact</Text>
                  </View>
                )}
                <View>
                  <RadioButton
                    value="first"
                    status={
                      selOpt == 'Bancontact'
                        ? checked === 'first'
                          ? 'checked'
                          : 'unchecked'
                        : !checked === 'first'
                        ? 'checked'
                        : 'unchecked'
                    }
                    color={selOpt == 'Bancontact' && color.white}
                    onPress={() => setChecked('first')}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[
                styles.opt1,
                {
                  backgroundColor:
                    selOpt == 'Paypal' ? color.primary_color : color.chat_bg,
                },
              ]}
              onPress={() => changeSelect('Paypal')}>
              <View style={styles.optionSec}>
                {selOpt == 'Paypal' ? (
                  <View style={styles.sec1}>
                    <FontAwesome name="paypal" color={color.white} size={20} />
                    <Text style={[styles.txt, {color: color.white}]}>
                      Paypal
                    </Text>
                  </View>
                ) : (
                  <View style={styles.sec1}>
                    <FontAwesome name="paypal" color="#0DBAF0" size={20} />
                    <Text style={styles.txt}>Paypal</Text>
                  </View>
                )}
                <View>
                  <RadioButton
                    value="first"
                    status={
                      selOpt == 'Paypal'
                        ? checked === 'first'
                          ? 'checked'
                          : 'unchecked'
                        : !checked === 'first'
                        ? 'checked'
                        : 'unchecked'
                    }
                    color={selOpt == 'Paypal' && color.white}
                    onPress={() => setChecked('first')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.btn}>
        <App_Button
          title={'PAY €999'}
          onPress={() => navigation.navigate('PremiumPaymentSuccess')}
        />
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
    flex: 1,
  },
  headline: {
    marginTop: SIZES.width / 6,
  },
  optionView: {
    marginTop: 60,
  },
  opt1: {
    paddingHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 6,
  },
  sec1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontFamily: FONTS.primarytext5,
    marginLeft: 10,
  },
  btn: {
    marginVertical: SIZES.height / 50,
    paddingHorizontal: SIZES.width / 10,
  },
  optionSec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardView: {
    alignItems: 'center',
    marginVertical: 15,
    // backgroundColor: 'blue',
  },
  cardSec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginHorizontal: 5,
  },
  input: {
    backgroundColor: color.white,
    paddingHorizontal: 10,
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view3: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: ""
  },
  cvvInput: {
    backgroundColor: color.white,
    paddingHorizontal: 10,
    width: SIZES.width / 2.5,
  },
  chkView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveTxt: {
    fontFamily: FONTS.primarytext1,
    fontSize: SIZES.h4 - 2,
  },
});
