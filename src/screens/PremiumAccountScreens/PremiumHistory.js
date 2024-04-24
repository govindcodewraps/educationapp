import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Header from '../../components/Header';
import {FONTS, SIZES} from '../../assets/theme/theme';
import color from '../../assets/theme/color';
import SessionCards from '../../components/data/SessionCards';

export default function PremiumHistory({navigation}) {
  const data = [
    {
      id: '1',
      img: require('../../assets/images/logo.png'),
      sessionName: 'Introduction Session',
      sessionType: 'Video & PDF Content ',
      sessionNumber: '1',
      btnTitle: 'PURCHASED',
    },
    {
      id: '2',
      img: require('../../assets/images/logo.png'),
      sessionName: 'Introduction Session',
      sessionType: 'Video & PDF Content ',
      sessionNumber: '2',
      btnTitle: 'PURCHASED',
    },
    {
      id: '3',
      img: require('../../assets/images/logo.png'),
      sessionName: 'Introduction',
      sessionType: 'Video & PDF Content ',
      sessionNumber: '3',
      btnTitle: 'PURCHASED',
    },
    {
      id: '4',
      img: require('../../assets/images/logo.png'),
      sessionName: 'Introduction Session',
      sessionType: 'Video & PDF Content ',
      sessionNumber: '4',
      btnTitle: 'PURCHASED',
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
        LabelTxt={'35 HOUR'}
        // onPress={() => navigation.navigate('Sessions')}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.heading}>
        <Text style={styles.headingTxt}>HISTORY</Text>
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
    marginVertical: 20,
    paddingBottom: 20,
  },
});
