import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import color from '../../assets/theme/color';

const Input3 = ({label, error, onFocus = () => {}, ...props}) => {
  const [isfocused, setIsfococused] = React.useState(false);
  return (
    <View style={styles.input_container}>
      <View style={styles.label_box}>
        <Text style={styles.label_text}>{label}</Text>
        <Text style={styles.asterisk}>*</Text>
      </View>
      <TextInput
        style={[
          styles.text_input,
          {borderColor: isfocused ? color.purple : color.gray},
        ]}
        autoCorrect={false}
        placeholderTextColor={color.light_gray}
        onFocus={() => {
          onFocus();
          setIsfococused(true);
        }}
        onBlur={() => {
          setIsfococused(false);
        }}
        {...props}
      />
    </View>
  );
};
export default Input3;
const styles = StyleSheet.create({
  input_container: {
    marginBottom: 10,
  },
  label_box: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  asterisk: {
    color: color.red,
  },
  text_input: {
    // flex: 1,
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 14,
    padding: 10,
    color: color.black,
    fontFamily: 'Montserrat-Medium',
  },
  label_text: {
    color: color.black,
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
  },
});
