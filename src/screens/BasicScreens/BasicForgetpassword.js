import React from 'react';
import {View, ScrollView, StyleSheet, StatusBar, Text} from 'react-native';
import LogoWithBackground from '../../components/LogoWithBackground';

import color from '../../assets/theme/color';
import Headline from '../../components/text/Headline';
import Input from '../../components/inputs/Input';
import App_Button from '../../components/buttons/App_Button';

export default function BasicForgetpassword({navigation, route}) {
  //   const {select_type, selPlan} = route.params;
  //   console.log('jkdsf', select_type);
  //   console.log('selPlan', selPlan);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.primary_color} />
      <ScrollView>
        <LogoWithBackground />

        <View style={styles.main_container}>
          <Headline title={'Forget Password'} />
          <View style={styles.inputs}>
            <Input placeholder="Email address" />
          </View>
          <View style={styles.button_container}>
            <App_Button
              title={'Send'}
              onPress={() =>
                navigation.navigate(
                  'BasicCheckmail',
                  // {
                  //   select_type: select_type,
                  //   selPlan: selPlan,
                  // }
                )
              }
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  main_container: {
    paddingHorizontal: 20,
  },
  inputs: {
    marginVertical: 20,
  },
  button_container: {
    marginVertical: 40,
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});
