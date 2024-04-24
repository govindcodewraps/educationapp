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

const {height, width} = Dimensions.get('window');
export default function Screen1() {
  return (
    <View style={styles.container}>
      <View style={styles.text_container}>
        <Text style={styles.subHead}>WELCOME TO</Text>
        <Text style={styles.head}>neudebri academy</Text>

        <Text style={styles.sub_title}>
          lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis
          sem nibh id elit.
        </Text>
      </View>
      <View style={styles.onboard_img}>
        <Image
          style={styles.deal}
          source={require('../../assets/images/academy2.png')}
        />
      </View>
    </View>
  );
}
