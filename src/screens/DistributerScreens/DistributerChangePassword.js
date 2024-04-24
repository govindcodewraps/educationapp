import React, {useEffect, useState} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAsyncData} from '../../utils';
import {API_URL, ASYNC_LOGIN_KEY} from '../../constants/Strings';
import * as qs from 'qs';

export default function DistributerChangepassword({navigation, route}) {
  const {password, userID} = route.params;
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [id, setId] = useState();
  console.log('id', userID, password);
  useEffect(() => {
    if (!infoLoaded) {
      getAsyncData(ASYNC_LOGIN_KEY).then(asUser => {
        console.log('AS', asUser);
        if (asUser != null) {
          var temp = JSON.parse(asUser);
          setId(temp.id);
        } else {
          console.log('notfound');
        }
      });
      setInfoLoaded(true);
    }
  }, [infoLoaded]);

  const [inputs, setInputs] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [errors, setErrors] = React.useState({});

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const processChangePassword = () => {
    Keyboard.dismiss();
    var valid = true;
    setLoading(true);
    if (!inputs.oldPassword) {
      handleError('Please enter your old Password', 'oldPassword');
      valid = false;
    } else if (inputs.oldPassword != password) {
      handleError('Old Password is not correct', 'oldPassword');
      valid = false;
    }
    if (!inputs.newPassword) {
      handleError('Please enter your new password', 'newPassword');
      valid = false;
    }

    Promise.resolve()
      .then(() => {
        setApiStatus(!apiStatus);
        setLoading(false);
      })
      .then(() => {
        var changeData = qs.stringify({
          changepassword: '1',
          old_password: password,
          new_password: inputs.newPassword,
          user_id: userID,
        });

        // var data = qs.stringify({
        //   forgotpassword: "1",
        //   email: inputs.email,
        // });

        console.log('for ====>', changeData);

        var changeHeader = new Headers();
        changeHeader.append('accept', 'application/json');
        changeHeader.append(
          'Content-Type',
          'application/x-www-form-urlencoded',
        );
        changeHeader.append('Cookie', 'PHPSESSID=nchjkmv207jqqhdvms0f8ud04o');
        if (valid) {
          axios
            .post(API_URL, changeData, {
              headers: changeHeader,
            })
            .then(function (response) {
              console.log('changeres', response);

              if (response.data.success == 1) {
                setLoading(false);
                // const info = {
                //   password: response.data.data.password,
                // };
                // // rdStoreRecovery(info);
                // console.log('info', info);
                showMessage({
                  message: 'success',
                  description: 'Password Change Successfully',
                  type: 'default',
                  backgroundColor: 'green',
                });
                navigation.navigate('DistributerLogin');
              } else {
                setLoading(false);
                showMessage({
                  message: 'Error',
                  description: response.data.message,
                  type: 'default',
                  backgroundColor: 'red',
                });
                setApiStatus(false);
              }
            })
            .catch(error => {
              console.log(error);
              setLoading(false);
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
          <Headline title={'Change your Password'} />
          <View style={styles.inputs}>
            <Input
              placeholder={'Enter Your old password'}
              value={inputs.oldPassword}
              onChangeText={text => handleOnchange(text, 'oldPassword')}
              onFocus={() => handleError(null, 'oldPassword')}
              error={errors.oldPassword}
              password
            />
            <Input
              placeholder={'Enter Your new password'}
              value={inputs.newPassword}
              onChangeText={text => handleOnchange(text, 'newPassword')}
              onFocus={() => handleError(null, 'newPassword')}
              error={errors.newPassword}
              password
            />
          </View>
          <View style={styles.button_container}>
            <App_Button
              title={'Send'}
              onPress={processChangePassword}
              loading={loading}
            />
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
