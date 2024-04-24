import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../assets/theme/color';
import {FONTS, SIZES} from '../../assets/theme/theme';
import App_Button from '../buttons/App_Button';

export default function SessionCards({
  type,
  sessionNumber,
  sessionTitle,
  img,
  icon,
  LabelTxt,
  btnTitle,
  onPress,
}) {
  const [selFav, setSelFav] = useState();

  const handleChecked = () => {
    setSelFav(!selFav);
  };
  return (
    <View style={styles.cardView}>
      <View style={styles.imgView}>
        <Image style={styles.img} source={img} />

        {icon && (
          <View style={styles.iconView}>
            {!selFav ? (
              <TouchableOpacity onPress={handleChecked}>
                <Ionicons
                  name="heart-circle"
                  size={30}
                  color={color.light_grey}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleChecked}>
                <Ionicons
                  name="heart-circle"
                  size={30}
                  color={color.dark_theme}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {LabelTxt && (
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: 10,
            backgroundColor: color.dark_theme,
            paddingHorizontal: 15,
            paddingVertical: 4,
          }}>
          <Text style={styles.labelTxt}>{LabelTxt}</Text>
        </View>
      )}

      <View style={styles.cardBottom}>
        <View style={styles.heading1}>
          <Text style={styles.headingTxt}>{sessionNumber}.</Text>
          <Text style={styles.headingTxt}>{type}</Text>
        </View>
        <Text style={styles.headingTxt2}>{sessionTitle}</Text>
      </View>
      <View style={styles.btnView}>
        <App_Button
          title={btnTitle}
          btnColor={color.dark_theme}
          onPress={onPress}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: color.black,
    marginHorizontal: SIZES.width / 48,
    marginVertical: SIZES.height / 64,
  },
  imgView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.card_bg,
    paddingVertical: 10,
  },
  img: {
    height: SIZES.height / 6,
    width: SIZES.width / 2.8,
  },
  iconView: {
    position: 'absolute',
    left: 0,
    left: 10,
    bottom: 0,
  },
  cardBottom: {
    marginHorizontal: 10,
    marginTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  heading1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  headingTxt: {
    fontFamily: FONTS.primarytext2,
    color: color.black,
  },
  headingTxt2: {
    fontFamily: FONTS.primarytext1,
  },
  btnView: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelTxt: {
    color: color.white,
    fontFamily: FONTS.primarytext1,
  },
});
