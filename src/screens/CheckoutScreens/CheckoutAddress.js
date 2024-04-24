import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import color from '../../assets/theme/color';
import {SIZES} from '../../assets/theme/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RadioButton} from 'react-native-paper';
import VioletButton from '../../components/VioletButton';
import Heading from '../../components/Heading';

export default function CheckoutAddress({navigation}) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [checked, setChecked] = React.useState('first');
  const [routes] = React.useState([
    {key: 'first', title: 'DELIVERY DETAILS'},
    {key: 'second', title: 'PAYMENT DETAILS'},
  ]);

  const FirstRoute = () => (
    <View style={{flex: 1, backgroundColor: color.white}}>
      <>
        <View style={styles.addressView}>
          <View style={styles.addressType1}>
            <Text style={styles.txt1}>Home, Deepak singh</Text>
            <Text style={styles.txt2}>
              J326 Dakshinpuri new delhi 110062 j Block dakshinpuri ambedkar
              nagar sec 5 , Near Kali building school
            </Text>
          </View>
          <View style={styles.radioBtnView}>
            <RadioButton
              color={color.dark_theme}
              value="first"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')}
            />
          </View>
        </View>
        <View style={styles.addressView}>
          <View style={styles.addressType1}>
            <Text style={styles.txt1}>Work, Deepak singh </Text>
            <Text style={styles.txt2}>
              J326 Dakshinpuri new delhi 110062 j Block dakshinpuri ambedkar
              nagar sec 5 , Near Kali building school
            </Text>
          </View>
          <View style={styles.radioBtnView}>
            <RadioButton
              color={color.dark_theme}
              value="second"
              status={checked === 'second' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('second')}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            // backgroundColor: 'red',
            marginTop: SIZES.height / 6.1,
          }}>
          <View style={styles.totalView}>
            <Text style={styles.priceTxt}>Total(1 items)</Text>

            <Text style={styles.txt1}>Total(1 items)</Text>
          </View>
          <View style={styles.totalView}>
            <Text style={styles.priceTxt}>Shipping</Text>

            <Text style={styles.amountTxt}>$5</Text>
          </View>
          <View style={styles.totalView}>
            <Text style={styles.priceTxt}>Taxes</Text>

            <Text style={styles.amountTxt}>$0.00</Text>
          </View>
          <View style={styles.totalView}>
            <Text style={styles.priceTxt}>Grand Total</Text>

            <Text style={[styles.amountTxt, {color: color.black}]}>
              $549.99
            </Text>
          </View>
        </View>
        {/* <View
          style={{
            flex: 1,
            marginBottom: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}> */}
        <VioletButton buttonName={'CONTINUE'} />
        {/* </View> */}
      </>
    </View>
  );
  const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: color.white}}>
      <View style={styles.paymentView}>
        <Text style={[styles.txt1, {fontSize: SIZES.h3}]}>
          Cash at the door
        </Text>
        <RadioButton
          color={color.dark_theme}
          value="first"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('first')}
        />
      </View>
      <View style={styles.paymentView}>
        <Text style={[styles.txt1, {fontSize: SIZES.h3}]}>Paypal</Text>
        <RadioButton
          color={color.dark_theme}
          value="second"
          status={checked === 'second' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('second')}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          // backgroundColor: 'red',
          marginTop: SIZES.height / 3.7,
        }}>
        <View style={styles.totalView}>
          <Text style={styles.priceTxt}>Total(1 items)</Text>

          <Text style={styles.txt1}>Total(1 items)</Text>
        </View>
        <View style={styles.totalView}>
          <Text style={styles.priceTxt}>Shipping</Text>

          <Text style={styles.amountTxt}>$5</Text>
        </View>
        <View style={styles.totalView}>
          <Text style={styles.priceTxt}>Taxes</Text>

          <Text style={styles.amountTxt}>$0.00</Text>
        </View>
        <View style={styles.totalView}>
          <Text style={styles.priceTxt}>Grand Total</Text>

          <Text style={[styles.amountTxt, {color: color.black}]}>$549.99</Text>
        </View>
      </View>
      {/* <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}> */}
      <VioletButton
        buttonName={'CONTINUE'}
        onPress={() => navigation.navigate('OrderSuccess')}
      />
      {/* </View> */}
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{
        borderWidth: 1,
        borderColor: color.primary_color,
      }}
      style={{
        backgroundColor: color.white,
        marginTop: SIZES.height / 35,
        elevation: 4,
      }}
      renderLabel={({route, focused}) =>
        focused ? (
          <Text
            style={{
              color: color.primary_color,
            }}>
            {route.title}
          </Text>
        ) : (
          <Text style={{color: color.light_grey}}>{route.title}</Text>
        )
      }
    />
  );
  return (
    <View style={{flex: 1, backgroundColor: color.white}}>
      <Header navigation={navigation} />
      <Heading HeadLine={'CHECKOUT'} />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addressView: {
    marginVertical: SIZES.height / 50,
    flexDirection: 'row',
    // alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.width / 30,
  },
  addressType1: {
    flex: 0.8,
    // flexDirection: "row",
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: SIZES.width / 40,
  },
  txt1: {
    // fontSize: SIZES.h2,
    fontWeight: 'bold',
    marginBottom: SIZES.height / 64,
  },
  txt2: {
    textAlign: 'justify',
    fontSize: SIZES.h3 - 3,
  },
  radioBtnView: {
    flex: 0.2,
    alignItems: 'flex-end',
  },

  paymentView: {
    marginVertical: SIZES.height / 50,
    flexDirection: 'row',
    // alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.width / 30,
  },
  totalView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.width / 40,
    paddingVertical: SIZES.width / 40,
    backgroundColor: color.white,
    borderBottomColor: color.black,
    borderBottomWidth: 0.2,
    // backgroundColor: 'yellow',
  },
  priceTxt: {
    fontSize: SIZES.h3 + 2,
    fontWeight: 'bold',
    color: color.light_grey,
  },
  amountTxt: {
    color: color.light_grey,
    fontSize: SIZES.h3 + 2,
    fontWeight: '500',
  },
});
