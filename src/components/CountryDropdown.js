import {View, Text, Image} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import React from 'react';
import {styles} from '../components/Styles';
const down_img = require('../assets/images/down.png');
const country = [
  'India',
  'Srilanka',
  'Pakistan',
  'USA',
  'Bangladesh',
  'New Your',
  'Japan',
  'China',
  'England',
];

export default function CountryDropdown({label, ...props}) {
  return (
    <View>
      <Text style={styles.label_text}>{label}</Text>
      <View style={{flexDirection: 'row'}}>
        <SelectDropdown
          data={country}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown}
          buttonTextStyle={styles.text_button}
          rowTextStyle={styles.row_text}
          dropdownStyle={styles.dropdown_style}
          {...props}
        />
        <Image style={styles.downimg} source={down_img}></Image>
      </View>
    </View>
  );
}
