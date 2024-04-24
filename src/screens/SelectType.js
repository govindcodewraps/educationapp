import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {SIZES} from '../assets/theme/theme';
import {LOGIN} from '../constants/Screens';

export default function SelectType({navigation}) {
  return (
    <View>
      <TouchableOpacity onpress={() => navigation.navigate('Login')}>
        <Text style={{fontSize: SIZES.h1}}>type 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onpress={() => navigation.navigate('Login', {Login_type: 'type1'})}>
        <Text>type 2</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>type 3</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
