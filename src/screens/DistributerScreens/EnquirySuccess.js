import {View, Text, StatusBar, Image} from 'react-native';
import React from 'react';
import color from '../../assets/theme/color';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import VioletButton from '../../components/VioletButton';
import {FONTS, SIZES} from '../../assets/theme/theme';
// import VioletButton2 from '../../component/VioletButton2';
// import BackButton from '../../component/Backbutton';
// import {SIZES} from '../assets/theme/theme';

export default function EnquirySuccess({navigation}) {
  return (
    <View
      style={{
        // paddingHorizontal: 15,
        flex: 1,
        backgroundColor: color.white,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/* <StatusBar backgroundColor={color.primary_color} /> */}
      {/* <BackButton onPress={() => navigation.goBack()} /> */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{
            height: hp(15),
            width: wp(95),
            resizeMode: 'cover',
            // backgroundColor: 'red',
            overflow: 'hidden',
          }}
          source={require('../../assets/images/logo1.png')}
          //   source={require("../images/forgetpasswordimg2.png")}
        />
        <Text
          style={{
            // flexWrap: "wrap",
            textAlign: 'center',
            marginVertical: 10,
            fontSize: 22,
            fontFamily: FONTS.primarytext3,
            color: color.black,
          }}>
          Enquiry Successfully Send
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: color.black,
            textAlign: 'center',
            fontFamily: FONTS.primarytext1,
          }}>
          We have send your Enquiry.
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '90%',
          marginBottom: 30,
        }}>
        <VioletButton
          buttonName="OKAY"
          onPress={() => navigation.navigate('DistributerHome')}
        />
      </View>
    </View>
  );
}
