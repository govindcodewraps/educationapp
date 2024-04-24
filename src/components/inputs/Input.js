import {View, Text, StyleSheet, TextInput, Animated} from 'react-native';
import React, {useState} from 'react';
import color from '../../assets/theme/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FONTS} from '../../assets/theme/theme';

export default function Input({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <View style={styles.inputView}>
      <Animated.View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? color.red
              : isFocused
              ? color.blue
              : color.grey,
          },
        ]}>
        <TextInput
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          autoCorrect={false}
          style={styles.input}
          secureTextEntry={hidePassword}
          {...props}
        />
        {password && (
          <MaterialCommunityIcons
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword == false ? 'eye-outline' : 'eye-off-outline'}
            size={hp(3)}
            color={hidePassword == false ? color.blue : color.grey}
          />
        )}
      </Animated.View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  inputView: {
    marginBottom: 10,
  },
  label: {
    marginVertical: 5,
    fontSize: hp(2),
    color: color.grey,
  },
  inputContainer: {
    height: hp(7),
    backgroundColor: color.light,
    flexDirection: 'row',
    borderBottomWidth: 2,
    alignItems: 'center',
  },
  input: {
    color: color.darkBlue,
    flex: 1,
    paddingHorizontal: 2,
    fontFamily: FONTS.primarytext1,
    fontSize: 16,
  },
  error: {
    color: color.red,
    fontSize: hp(1.5),
    marginTop: hp(0.5),
  },
});
