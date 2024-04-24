import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import color from '../../assets/theme/color';
import Header from '../../components/Header';
import axios from 'axios';

import ProductCards from '../../components/ProductCards';
import Heading from '../../components/Heading';

const DistributerRecommendedScreen = ({navigation}) => {
  const [recommendData, setRecommendData] = useState([]);

  const processgetRecommendData = () => {
    axios
      .get('https://neumedis.myshopify.com/admin/api/2022-10/products.json', {
        headers: {
          Authorization:
            'Basic MjRmMWJiMjQyNTNmOGVkMDNjNmFmY2VkMmVkMDVhY2M6c2hwYXRfMjgzZTZiNjMyOWIwOWM1OTI1YTkyOWNlMTczOTViNWQ=',
        },
      })
      .then(function (res) {
        // console.log(res);
        setRecommendData(res.data.products);
      })
      .catch(function (err) {
        console.log('err', err);
      });
  };

  console.log('recomm', recommendData);
  useEffect(() => {
    processgetRecommendData();
  }, []);

  const renderItem = ({item, index}) => {
    // console.log('item', item.id);
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() =>
            navigation.navigate('ProductDetailScreen', {
              id: item.id,
            })
          }>
          <ProductCards
            img={{
              uri: item.image == null ? item.image : item.image.src,
            }}
            productName={item.title}
            // price={item.id}
            // disPrice={item.disPrice}
          />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.page}>
      <Header
        navigation={navigation}
        gotoCart={() => navigation.navigate('CheckoutStack')}
      />
      <Heading HeadLine={'RECOMMENDED'} />
      <FlatList
        data={recommendData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
};

export default DistributerRecommendedScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.white,
  },
});
