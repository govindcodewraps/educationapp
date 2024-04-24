import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import color from '../../assets/theme/color';
import Header from '../../components/Header';

import {FONTS, SIZES} from '../../assets/theme/theme';
import SessionCards from '../../components/data/SessionCards';

export default function PremiumFavourites({navigation}) {
  const data = [
    {
      id: '1',
      img: require('../../assets/images/logo.png'),
      sessionName: 'Basic Introduction',
      sessionType: 'Video & PDF Content ',
      sessionNumber: '1',
      btnTitle: 'START SESSION 1',
    },
    {
      id: '2',
      img: require('../../assets/images/logo.png'),
      sessionName: 'Wound Care',
      sessionType: 'Video & PDF Content ',
      sessionNumber: '2',
      btnTitle: 'START SESSION 2',
    },
    {
      id: '3',
      img: require('../../assets/images/logo.png'),
      sessionName: 'Introduction',
      sessionType: 'Video & PDF Content ',
      sessionNumber: '3',
      btnTitle: 'START SESSION 3',
    },
    {
      id: '4',
      img: require('../../assets/images/logo.png'),
      sessionName: 'Introduction Session',
      sessionType: 'Video & PDF Content ',
      sessionNumber: '4',
      btnTitle: 'START SESSION 4',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <SessionCards
        type={item.sessionName}
        sessionTitle={item.sessionType}
        sessionNumber={item.sessionNumber}
        img={item.img}
        icon
        LabelTxt={'35 Min'}
        btnTitle={item.btnTitle}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.heading}>
        <Text style={styles.headingTxt}>FAVOURITE SESSIONS</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  heading: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  headingTxt: {
    fontFamily: FONTS.Rubik_Bold,
    color: color.primary_color,
    fontSize: SIZES.h2,
  },
  container2: {
    backgroundColor: color.white,
    paddingBottom: 20,
  },
});
