import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  Text,
  FlatList,
  Animated,
} from 'react-native';
import Header from '../../components/Header';
import {ActivityIndicator} from 'react-native';
import {Image} from 'react-native-elements';
import color from '../../assets/theme/color';
import SessionCards from '../../components/data/SessionCards';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SessionCards2 from '../../components/data/SessionCards2';
import {FONTS, SIZES} from '../../assets/theme/theme';
import BottomView from '../../components/bottom/BottomView';
import {TouchableOpacity} from 'react-native';

export default function PremiumHome({navigation}) {
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollRef = useRef();
  let intervalId = null;

  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);

  const onSlideChange = useCallback(() => {
    const newIndex =
      selectedIndex === carouselImages.length - 1 ? 0 : selectedIndex + 1;

    setSelectedIndex(newIndex);

    scrollRef?.current?.scrollTo({
      animated: true,
      y: 0,
      x: dimension.width * newIndex,
    });
  }, [selectedIndex]);

  const startInterval = useCallback(() => {
    intervalId = setInterval(onSlideChange, 30000);
  }, [onSlideChange]);

  useEffect(() => {
    startInterval();

    return () => {
      clearInterval(intervalId);
    };
  }, [onSlideChange]);

  const onTouchStart = () => {
    clearInterval(intervalId);
  };

  const onTouchEnd = () => {
    startInterval();
  };

  const carouselImages = [
    {url: 'https://i.ibb.co/FDwNR9d/img1.jpg'},
    {url: 'https://i.ibb.co/7G5qqGY/1.jpg'},
    {url: 'https://i.ibb.co/Jx7xqf4/pexels-august-de-richelieu-4427816.jpg'},
  ];

  const setIndex = event => {
    let viewSize = event.nativeEvent.layoutMeasurement.width;
    let contentOffset = event.nativeEvent.contentOffset.x;
    let carouselIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(carouselIndex);
  };

  const data = [
    {
      id: '1',
      img: require('../../assets/images/logo.png'),
      sessionName: 'Introduction Session',
      sessionType: 'Video & PDF Content ',
      sessionNumber: '1',
      btnTitle: 'Start Session',
    },
    {
      id: '2',
      img: require('../../assets/images/logo.png'),
      sessionName: 'Introduction Session',
      sessionType: 'Video & PDF Content ',
      sessionNumber: '2',
      btnTitle: 'Start Session',
    },
    {
      id: '3',
      img: require('../../assets/images/logo.png'),
      sessionName: 'Introduction',
      sessionType: 'Video & PDF Content ',
      sessionNumber: '3',
      btnTitle: 'Start Session',
    },
    {
      id: '4',
      img: require('../../assets/images/logo.png'),
      sessionName: 'Introduction Session',
      sessionType: 'Video & PDF Content ',
      sessionNumber: '4',
      btnTitle: 'Start Session',
    },
  ];

  const data2 = [
    {
      id: '1',
      img: require('../../assets/images/logo.png'),
      sessionName: 'Launching Neudebri wound debridement tool in Belgium',
      sessionType:
        'It was held last 30th of July 2020 in Hasselt (Limburg), Belgium....',
      sessionNumber: '1',
    },
    {
      id: '2',
      img: require('../../assets/images/logo.png'),
      sessionName: 'Launching Neudebri wound debridement tool in Belgium',
      sessionType:
        'It was held last 30th of July 2020 in Hasselt (Limburg), Belgium....',
      sessionNumber: '2',
    },
    {
      id: '3',
      img: require('../../assets/images/logo.png'),
      sessionName: 'Launching Neudebri wound debridement tool in Belgium',
      sessionType:
        'It was held last 30th of July 2020 in Hasselt (Limburg), Belgium....',
      sessionNumber: '3',
    },
    {
      id: '4',
      img: require('../../assets/images/logo.png'),
      sessionName: 'Launching Neudebri wound debridement tool in Belgium',
      sessionType:
        'It was held last 30th of July 2020 in Hasselt (Limburg), Belgium....',
      sessionNumber: '4',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('PremiumLogin')}>
        <SessionCards
          type={item.sessionName}
          sessionTitle={item.sessionType}
          sessionNumber={item.sessionNumber}
          img={item.img}
          icon
          btnTitle={item.btnTitle}
        />
      </TouchableOpacity>
    );
  };

  const renderItem2 = ({item}) => {
    return (
      <SessionCards2
        type={item.sessionName}
        sessionTitle={item.sessionType}
        img={item.img}
      />
    );
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, data.length],
    outputRange: ['30%', '100%'],
  });
  const renderProgressBar = () => {
    return (
      <View style={{alignItems: 'center', marginTop: 30}}>
        <View
          style={{
            width: '40%',
            height: 10,
            borderRadius: 20,
            backgroundColor: color.grey,
          }}>
          <Animated.View
            style={[
              {
                height: 10,
                borderRadius: 20,
                backgroundColor: color.dark_theme,
              },
              {
                width: progressAnim,
              },
            ]}></Animated.View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView>
        <View
          style={{
            width: dimension.width,
            marginTop: 20,
            backgroundColor: color.white,
            paddingVertical: 20,
          }}>
          <ScrollView
            horizontal
            ref={scrollRef}
            onMomentumScrollEnd={setIndex}
            showsHorizontalScrollIndicator={false}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            pagingEnabled>
            {carouselImages.map((value, key) => (
              <View style={{marginHorizontal: 10}}>
                <Image
                  source={{uri: `${value.url}`}}
                  style={{
                    width: dimension?.width - 20,
                    height: 150,
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </View>
            ))}
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              bottom: 30,
              alignSelf: 'center',

              // backgroundColor: 'red',
            }}>
            {carouselImages.map((val, key) => (
              <Text
                key={key}
                style={
                  key === selectedIndex
                    ? {color: color.primary_color}
                    : {color: '#fff'}
                }>
                ⬤
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.container2}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          {/* {renderProgressBar()} */}
        </View>
        <View style={[styles.container2, {paddingBottom: 20}]}>
          <View style={styles.headerView}>
            <Text style={styles.headerTxt1}>News</Text>
            <Text style={styles.headerTxt2}>Latest Update</Text>
          </View>
          <FlatList
            data={data2}
            renderItem={renderItem2}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <BottomView />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    backgroundColor: color.white,
    marginVertical: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerView: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  headerTxt1: {
    fontFamily: FONTS.Rubik_medium,
    color: color.primary_color,
    fontSize: 16,
  },
  headerTxt2: {
    fontFamily: FONTS.Rubik_medium,
    color: color.black,
    fontSize: 18,
  },
});
