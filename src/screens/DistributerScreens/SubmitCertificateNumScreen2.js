import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {TouchableOpacity} from 'react-native';
import color from '../../assets/theme/color';
import Header from '../../components/Header';
import {SIZES} from '../../assets/theme/theme';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import * as qs from 'qs';
import axios from 'axios';
import Input from '../../components/inputs/Input';

const SubmitCertificateNumberScreen2 = ({route, navigation}) => {
  const reduxUser = useSelector(state => state.user);

  const [inputs, setInputs] = React.useState('');

  const [CheckcerticationData, setCheckCertificationData] = useState([]);
  const [certificateNumber, setCertificateNumber] = useState();
  const [getText, setGetText] = useState(certificateNumber);
  //   const {copyText} = route.params;

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setGetText(text);
    //   showMessage({
    //     message: 'Success',
    //     description: 'Your certificate number successfully submitted.',
    //     type: 'default',
    //     backgroundColor: color.text_primary,
    //   });
    //   navigation.navigate('DistributerHome2');
  };

  const processGetCertificationData = () => {
    var certificationHeader = new Headers();
    certificationHeader.append('accept', 'application/json');
    certificationHeader.append(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );
    certificationHeader.append(
      'Cookie',
      'PHPSESSID=vlr3nr52586op1m8ie625ror6b',
    );

    var certificationFormData = qs.stringify({
      check_certification: '1',
      user_id: reduxUser.customer.id,
    });
    axios
      .post(
        'http://13.126.10.232/development/education/appdata/webservice.php',
        certificationFormData,
        {headers: certificationHeader},
      )
      .then(function (response) {
        if (response.data.success == 1) {
          setCheckCertificationData(response.data.data);
          setCertificateNumber(response.data.data.certification_no);
        } else {
          showMessage({
            message: 'Fail',
            description: response.data.message,
            type: 'default',
            backgroundColor: 'red',
          });
        }
      })
      .catch(error => console.log('error', error));
  };
  console.log('certificate', CheckcerticationData.user_id);
  useEffect(() => {
    processGetCertificationData();
    // navigation.addListener('focus', () => processGetCertificationData());
  }, []);

  const processCheckInput = () => {
    if (
      certificateNumber == inputs &&
      CheckcerticationData.user_id == reduxUser.customer.id
    ) {
      showMessage({
        message: 'success, Your certificate number is submited.',
        // description: response.data.message,
        type: 'default',
        backgroundColor: 'green',
      });
      navigation.navigate('DistributerHome');
    } else {
      showMessage({
        message: 'Please enter valid certificate number',
        // description: response.data.message,
        type: 'default',
        backgroundColor: 'red',
      });
    }
  };

  return (
    <View style={styles.page}>
      <Header navigation={navigation} />

      {certificateNumber ? (
        <View style={styles.inputView}>
          <Text style={styles.headingTxt}>
            Please Paste Your certificate Number
          </Text>
          <TextInput
            style={{
              backgroundColor: 'white',
              borderWidth: 0.5,
              width: SIZES.width / 1.5,
              borderRadius: 3,
              paddingHorizontal: 10,
              textAlign: 'center',
            }}
            value={inputs}
            onChangeText={text => setInputs(text)}
          />
          {/* <TextInput
      placeholder={'Email'}
      value={inputs.email}
      // onChangeText={(email) => setEmail(email)}
      
      //   onFocus={() => handleError(null, 'email')}
      //   error={errors.}
    /> */}
          <TouchableOpacity style={styles.btn} onPress={fetchCopiedText}>
            <Text style={styles.btnTxt}>Click to paste</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={processCheckInput}>
            <Text style={styles.btnTxt}>Submit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Please go for certificate</Text>
      )}
    </View>
  );
};

export default SubmitCertificateNumberScreen2;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.white,
  },
  inputView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingTxt: {
    marginBottom: 10,
    fontSize: SIZES.h2 - 3,
    fontWeight: 'bold',
    color: color.black,
  },
  btn: {
    backgroundColor: color.primary_color,
    marginTop: 20,
    paddingHorizontal: SIZES.width / 6,
    paddingVertical: SIZES.height / 60,
    borderRadius: 5,
  },
  btnTxt: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: color.white,
  },
});
