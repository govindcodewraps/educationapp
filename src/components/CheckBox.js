import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Checkbox} from 'react-native-paper';
import color from '../assets/theme/color';

export default function CheckBox({optionName, ...props}) {
  const [isChecked, setChecked] = useState(false);
  console.log(isChecked);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Checkbox
        style={styles.checkbox}
        color={isChecked ? color.primary_color : color.primary_color}
        status={isChecked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!isChecked);
        }}
        {...props}
      />
      <View style={styles.optionName}>
        <Text style={styles.optionName}>{optionName}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  optionName: {
    // fontFamily: "Regular",
    color: color.black,
    marginLeft: 3,
  },
});

// import React,{useState} from "react";
// import {View, Text} from 'react-native';

// export default function CheckBox() {

//   const [isChecked, setChecked] = useState(false);
//   return (
//     <View>
//       <Text>CheckBox</Text>
//     </View>
//   );
// }
