import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import Header2 from '../../components/Header2';
import Carousel from '../../components/Carousel';
import color from '../../assets/theme/color';

import {SIZES, FONTS} from '../../assets/theme/theme';
import {Divider} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TrainerHome({navigation}) {
  const professionalListData = [
    {
      id: '1',
      img: require('../../assets/images/profile_demo2.png'),
      name: 'Deepak',
    },
    {
      id: '2',
      img: require('../../assets/images/profile_demo2.png'),
      name: 'Umseh',
    },
    {
      id: '3',
      img: require('../../assets/images/profile_demo2.png'),
      name: 'Seally Donna',
    },
    {
      id: '4',
      img: require('../../assets/images/profile_demo2.png'),
      name: 'Marcus Dupius',
    },
    {
      id: '5',
      img: require('../../assets/images/profile_demo2.png'),
      name: 'Umseh',
    },
    {
      id: '6',
      img: require('../../assets/images/profile_demo2.png'),
      name: 'Umseh',
    },
    {
      id: '7',
      img: require('../../assets/images/profile_demo2.png'),
      name: 'Lincoln Culhane',
    },
    {
      id: '8',
      img: require('../../assets/images/profile_demo2.png'),
      name: 'Deepak Bhardwaj',
    },
  ];

  const renderList = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => navigation.navigate('TrainerChatScreen')}>
          <View style={styles.listMain}>
            <View style={styles.imgView}>
              <Image
                source={item.img}
                resizeMode="contain"
                style={styles.img}
              />
            </View>
            <View style={styles.nameView}>
              <Text style={styles.txt2}>{item.name}</Text>
              <Text>View chat...</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Divider style={{borderColor: color.light_grey, borderWidth: 0.3}} />
      </>
    );
  };

  return (
    <View style={styles.page}>
      <Header2 navigation={navigation} />
      <Carousel />
      <View style={styles.topView}>
        <Text style={styles.txt1}>PROFESIONALS</Text>
        <View style={styles.listofView}>
          <Text style={styles.txt2}>LIST OF PROFESSIONALS (30)</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('TrainerListScreen')}>
            <Ionicons name="chevron-forward" size={30} color={color.black} />
          </TouchableOpacity>
        </View>
      </View>
      <Divider />
      <FlatList
        data={professionalListData}
        renderItem={renderList}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    // backgroundColor: color.white,
  },
  topView: {
    backgroundColor: color.white,
    paddingHorizontal: 10,
    marginTop: 20,
    paddingVertical: 20,
  },
  txt1: {
    fontWeight: 'bold',
    color: color.dark_theme,
    fontSize: SIZES.h2 - 6,
  },
  listofView: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt2: {
    fontWeight: 'bold',
    color: color.black,
    marginRight: 5,
  },
  listMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: color.white,
    paddingHorizontal: 10,
  },
  imgView: {
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  img: {
    height: SIZES.height / 12,
    width: SIZES.width / 8,
  },
  nameView: {
    // backgroundColor: 'yellow',
    flex: 1,
    alignItems: 'flex-start',
  },
});
