import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import color from '../assets/theme/color';
import {SIZES} from '../assets/theme/theme';

export default function ProductCards({
  productName,
  // breedType,
  price,
  disPrice,
  img,
}) {
  return (
    <View style={styles.parent}>
      <View style={styles.imgView}>
        <Image
          resizeMode="contain"
          style={{
            height: SIZES.height / 6,
            width: SIZES.width / 2,
            alignSelf: 'center',
          }}
          source={img}
        />
      </View>
      <Text style={styles.nameTxt}>{productName}</Text>
      {/* <Text style={styles.typeTxt}>{breedType}</Text> */}

      <View style={styles.price}>
        <Text style={styles.OldPrice}>{price}</Text>
        <View>
          <Text style={{color: color.dark_theme, fontWeight: 'bold'}}>
            {disPrice}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  parent: {
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: color.light_grey,
    marginHorizontal: SIZES.width / 64,
    marginVertical: SIZES.height / 64,
    paddingVertical: SIZES.height / 50,
    paddingHorizontal: SIZES.width / 40,
    backgroundColor: color.white,
    elevation: 4,

    width: SIZES.width / 2.2,
    overflow: 'hidden',
  },
  imgView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.height / 64,
  },
  nameTxt: {
    fontSize: SIZES.h3 - 2,
    color: color.black,
    fontFamily: 'Montserrat-SemiBold',
    // marginBottom: 5,
  },
  typeTxt: {
    color: color.black,
    fontSize: SIZES.h3 - 2,
    fontWeight: '500',
  },

  OldPrice: {
    textDecorationLine: 'line-through',
    color: color.light_grey,
    fontWeight: '500',
  },
});
