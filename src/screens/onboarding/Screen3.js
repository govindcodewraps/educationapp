import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import styles from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const {height, width} = Dimensions.get('window');
export default function Screen3() {
  return (
    <View style={styles.container}>
      <View style={styles.text_container}>
        <Text style={styles.subHead}>IT’S ALL ABOUT</Text>
        <Text style={styles.head}>COMMUNICATION</Text>

        <Text style={styles.sub_title}>
          lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis
          sem nibh id elit.
        </Text>
      </View>
      <View style={styles.onboard_img}>
        <Image
          style={[styles.deal, {height: hp(42), width: hp(42)}]}
          source={require('../../assets/images/communication2.png')}
        />
      </View>
    </View>
  );
}
