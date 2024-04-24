import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import App_Button from '../../components/buttons/App_Button';
import Headline from '../../components/text/Headline';
import color from '../../assets/theme/color';
import {SIZES} from '../../assets/theme/theme';

export default function DistributerCheckmail({navigation, route}) {
  //   const {select_type, selPlan} = route.params;
  //   console.log('SelPlan', selPlan);
  //   console.log('selectType', select_type);

  //   const handleChekmailScreen = () => {
  //     if (select_type == 'Distributor') {
  //       navigation.navigate('Login', {select_type: select_type});
  //     } else if (select_type == 'Trainer') {
  //       navigation.navigate('OtpScreen', {select_type: select_type});
  //     } else if (selPlan == selPlan)
  //       navigation.navigate('Login', {selPlan: selPlan});
  //   };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.white} />
      <Headline title={'Check your email'} />

      <Text style={styles.text}>
        We have sent a password recovery instruction to your email.
      </Text>
      <View style={styles.btn_container}>
        <App_Button
          title={'Okay'}
          onPress={() =>
            // () => handleChekmailScreen()
            navigation.navigate(
              'DistributerLogin',
              // {select_type: select_type}
            )
          }
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Regular',
    fontSize: 16,
    marginVertical: 10,
  },
  btn_container: {
    marginTop: SIZES.height / 25,
    marginHorizontal: 6,
    width: SIZES.width / 1.2,
  },
});
