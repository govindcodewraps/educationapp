import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Header from '../../components/Header';
import color from '../../assets/theme/color';
import SessionCards from '../../components/data/SessionCards';
import {FONTS, SIZES} from '../../assets/theme/theme';

export default function PremiumCourses({navigation}) {
  const data = [
    {
      id: '1',
      img: require('../../assets/images/logo.png'),
      sessionName: 'Introduction Session',
      sessionType: 'Video & PDF Content ',
      sessionNumber: '1',
      btnTitle: 'VIEW COURCES',
    },
    {
      id: '2',
      img: require('../../assets/images/logo.png'),
      sessionName: 'Introduction Session',
      sessionType: 'Video & PDF Content ',
      sessionNumber: '2',
      btnTitle: 'VIEW COURCES',
    },
    {
      id: '3',
      img: require('../../assets/images/logo.png'),
      sessionName: 'Introduction',
      sessionType: 'Video & PDF Content ',
      sessionNumber: '3',
      btnTitle: 'VIEW COURCES',
    },
    {
      id: '4',
      img: require('../../assets/images/logo.png'),
      sessionName: 'Introduction Session',
      sessionType: 'Video & PDF Content ',
      sessionNumber: '4',
      btnTitle: 'VIEW COURCES',
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
        btnTitle={item.btnTitle}
        onPress={() => navigation.navigate('PremiumAllCourses')}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.heading}>
        <Text style={styles.headingTxt}>CATEGORIES</Text>
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
  container2: {
    backgroundColor: color.white,
    paddingBottom: 20,
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
});
