import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';

import Header2 from '../../components/Header2';
import Carousel from '../../components/Carousel';
import color from '../../assets/theme/color';

import {SIZES, FONTS} from '../../assets/theme/theme';
import {Divider} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBox from '../../components/SearchBox';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function TrainerListScreen({navigation}) {
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
    {
      id: '9',
      img: require('../../assets/images/profile_demo2.png'),
      name: 'Deepak Bhardwaj',
    },
    {
      id: '10',
      img: require('../../assets/images/profile_demo2.png'),
      name: 'Deepak Bhardwaj',
    },
    {
      id: '11',
      img: require('../../assets/images/profile_demo2.png'),
      name: 'Deepak Bhardwaj',
    },
    {
      id: '12',
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
              <View>
                <Text style={styles.txt2}>{item.name}</Text>
                <Text>View chat...</Text>
              </View>
              <View
                style={{
                  backgroundColor: 'green',
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <Text style={{color: color.white}}>3</Text>
              </View>
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
      <View style={styles.inputMainView}>
        <View style={styles.parent}>
          <View
            style={{
              flex: 0.2,
              alignItems: 'center',
              justifyContent: 'center',
              //   backgroundColor: 'red',
            }}>
            <AntDesign name="search1" size={20} color={color.primary_color} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 2,
              alignItems: 'center',
              //   backgroundColor: 'red',
            }}>
            <View>
              <TextInput placeholder="Search" />
            </View>
          </View>
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
  },
  img: {
    height: SIZES.height / 12,
    width: SIZES.width / 8,
  },
  nameView: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputMainView: {
    backgroundColor: color.primary_color,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  parent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 24,
    borderColor: color.primary_color,
    paddingHorizontal: 8,
    backgroundColor: color.white,
  },
});
