import React, {useEffect, useState, useRef, useCallback} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import color from '../assets/theme/color';

export default function Carousel() {
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
    {url: require('../assets/images/carouselImg.png')},
    {url: require('../assets/images/carouselImg.png')},
    {url: require('../assets/images/carouselImg.png')},
  ];

  const setIndex = event => {
    let viewSize = event.nativeEvent.layoutMeasurement.width;
    let contentOffset = event.nativeEvent.contentOffset.x;
    let carouselIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(carouselIndex);
  };
  return (
    <ImageBackground
      style={{
        width: dimension.width,
        // marginTop: 20,
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
              //   source={{ uri: `${value.url}` }}
              source={value.url}
              style={{
                width: dimension?.width - 20,
                height: 200,
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
