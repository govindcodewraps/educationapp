import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  Keyboard,
} from 'react-native';
import LogoWithBackground from '../../components/LogoWithBackground';

import color from '../../assets/theme/color';
import Headline from '../../components/text/Headline';
import Input from '../../components/inputs/Input';
import App_Button from '../../components/buttons/App_Button';
import {showMessage} from 'react-native-flash-message';
import axios from 'axios';

export default function TrainerForgetpassword({navigation, route}) {
  //   const {select_type, selPlan} = route.params;
  //   console.log('jkdsf', select_type);
  //   console.log('selPlan', selPlan);

  const [inputs, setInputs] = useState({
    email: '',
  });
  const [errors, setErrors] = React.useState({});

  const [email, setEmail] = useState('');
  const [apiStatus, setApiStatus] = useState(false);

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const processForgetPassword = () => {
    Keyboard.dismiss();
    var valid = true;

    if (!inputs.email) {
      handleError('Please enter your email', 'email');
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      valid = false;
    }

    Promise.resolve()
      .then(() => {
        setApiStatus(!apiStatus);
      })
      .then(() => {
        var data = new FormData();
        data.append('forgotpassword', '1'), data.append('email', inputs.email);

        // var data = qs.stringify({
        //   forgotpassword: "1",
        //   email: inputs.email,
        // });

        console.log('for ====>', data);

        var forgetHeader = new Headers();
        forgetHeader.append('accept', 'application/json');
        forgetHeader.append(
          'Content-Type',
          'application/x-www-form-urlencoded',
        );
        forgetHeader.append('Cookie', 'PHPSESSID=nchjkmv207jqqhdvms0f8ud04o');

        console.log('apistatus', apiStatus);
        if (valid) {
          axios
            .post(
              'http://13.126.10.232/development/education/appdata/webservice.php',
              data,
              {
                headers: forgetHeader,
              },
            )
            .then(function (response) {
              console.log('forgetRes', response);

              if (response.data.success == 1) {
                // const info = {
                //   password: response.data.data.password,
                // };
                // // rdStoreRecovery(info);
                // console.log('info', info);
                showMessage({
                  message: 'success',
                  description: 'Password sent on your email',
                  type: 'default',
                  backgroundColor: 'green',
                });
                navigation.navigate('TrainerChangePassword', {
                  password: response.data.data.password,
                });
              } else {
                showMessage({
                  message: 'Error',
                  description: response.data.message,
                  type: 'default',
                  backgroundColor: 'red',
                });
                setApiStatus(false);
              }
            });
        }
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.primary_color} />
      <ScrollView>
        <LogoWithBackground />

        <View style={styles.main_container}>
          <Headline title={'Forget Password'} />
          <View style={styles.inputs}>
            <Input
              placeholder={'Email'}
              value={inputs.email}
              onChangeText={text => handleOnchange(text, 'email')}
              onFocus={() => handleError(null, 'email')}
              error={errors.email}
            />
          </View>
          <View style={styles.button_container}>
            <App_Button title={'Send'} onPress={processForgetPassword} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  main_container: {
    paddingHorizontal: 20,
  },
  inputs: {
    marginVertical: 20,
  },
  button_container: {
    marginVertical: 40,
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});
