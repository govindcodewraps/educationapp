import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Linking, Pressable, Image, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Avatar, Button, Icon} from 'react-native-elements';
import color from '../assets/theme/color';
import {useNavigation} from '@react-navigation/native';
import App_Button from './buttons/App_Button';
import {FONTS} from '../assets/theme/theme';

export default function DrawerContent2(props) {
  const navigation = useNavigation();
  // const {select_type} = route.params;
  const handleLogout = () => {
    navigation.navigate('TrainerLogin');
  };
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawer}>
          <View style={styles.avatar}>
            <Avatar
              rounded
              source={require('../assets/images/profile_demo2.png')}
              size={100}
            />
          </View>
          <View style={styles.profile}>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.login}>Guest Account</Text>
          </View>
        </View>
        <View style={styles.button_container}>
          <App_Button
            title={'Sign Up'}
            onPress={() => navigation.navigate('TrainerSignup')}
          />
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          label={'Log Out'}
          // onPress={() => navigation.navigate('DistributerLogin')}
          onPress={() => handleLogout()}
          labelStyle={{fontFamily: FONTS.primarytext5}}
          icon={({color, size}) => (
            <Image
              source={require('../assets/images/ham_icons/log_out.png')}
              style={{height: 22, width: 22, tintColor: color}}
            />
          )}
        />
      </DrawerContentScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawer: {
    flexDirection: 'row',
    paddingVertical: 20,
    backgroundColor: color.purple,
    // marginTop: -5,
  },
  welcome: {
    color: color.black,
    fontSize: 18,
    fontWeight: 'normal',
    fontFamily: FONTS.primarytext5,
    textTransform: 'uppercase',
  },
  login: {
    color: color.black,
    fontSize: 16,
    textTransform: 'capitalize',
    fontFamily: FONTS.primarytext5,
  },
  avatar: {
    marginHorizontal: 20,
  },
  icons: {
    width: 30,
  },
  profile: {
    justifyContent: 'center',
  },
  button_container: {
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: color.grey,
    marginBottom: 20,
  },
});
