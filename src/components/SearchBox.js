import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import color from '../assets/theme/color';
export default function SearchBox({onPress}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.primary_color,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
      }}>
      <View style={styles.parent}>
        <View
          style={{
            // flex: 0.2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'red',
          }}>
          <AntDesign name="search1" size={30} color={color.black} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 2,
            alignItems: 'center',
            backgroundColor: 'red',
          }}>
          {/* <View>
            <Text style={{fontWeight: 'bold'}}>Delivering To:</Text>
          </View> */}
          <View>
            <TextInput placeholder="Search" />
          </View>
        </View>
        {/* <View style={styles.ImageView}>
          <TouchableOpacity onPress={onPress}>
            <Image
              style={{
                height: hp(3),
                width: hp(3),
                tintColor: color.text_primary,
              }}
              source={require("../images/filte.png")}
            />
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 6,
    // marginTop: 20,
    paddingVertical: 20,
    borderColor: color.primary_color,
    paddingHorizontal: 8,
    backgroundColor: color.white,
  },
  ImageView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
