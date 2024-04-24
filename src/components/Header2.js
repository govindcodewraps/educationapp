import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import color from '../assets/theme/color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Header2({navigation, onPress}) {
  // const {select_type} = route.params;
  // console.log('Sele', select_type);

  return (
    <View style={styles.head_container}>
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}>
        <Ionicons name="md-menu" size={35} color={color.primary_color} />
      </TouchableOpacity>
      <View>
        <Image
          style={styles.logo}
          source={require('../assets/images/logo1.png')}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('TrainerNotificationScreen')}>
        <Ionicons
          name="ios-notifications"
          size={30}
          color={color.primary_color}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  head_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.white,
    paddingVertical: 10,
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 10,
    elevation: 4,
  },
  logo: {
    height: hp(8.5),
    width: hp(31),
  },
});
