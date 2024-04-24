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
import {API_URL} from '../../constants/Strings';

const SubmitCertificateNumberScreen = ({route, navigation}) => {
  const reduxUser = useSelector(state => state.user);

  const [inputs, setInputs] = React.useState(getText);

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
  console.log('');
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
      .post(API_URL, certificationFormData, {headers: certificationHeader})
      .then(function (response) {
        if (response.data.success == 1) {
          setCheckCertificationData(response.data.data);
          setCertificateNumber(response.data.data.certification_no);
          // setGetText(response.data.data.certification_no);
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
  console.log('certificate', CheckcerticationData);
  useEffect(() => {
    processGetCertificationData();
    // navigation.addListener('focus', () => processGetCertificationData());
  }, []);

  const processCheckInput = () => {
    if (
      certificateNumber == getText &&
      CheckcerticationData.user_id == reduxUser.customer.id
    ) {
      showMessage({
        message: 'success, Your certificate number is submited.',
        // description: response.data.message,
        type: 'default',
        backgroundColor: 'green',
      });
      navigation.replace('DistributerHome');
    } else {
      showMessage({
        message: 'Please enter valid certificate number',
        // description: response.data.message,
        type: 'default',
        backgroundColor: 'red',
      });
    }
  };

  const processVerifyCertificateNumber = () => {
    var VerifyHeader = new Headers();
    VerifyHeader.append('accept', 'application/json');
    VerifyHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    VerifyHeader.append('Cookie', 'PHPSESSID=vlr3nr52586op1m8ie625ror6b');

    var verifyFormData = qs.stringify({
      submit_certification_number: '1',
      user_id: reduxUser.customer.id,
      certification_number: certificateNumber,
      status: CheckcerticationData.status,
    });
    axios
      .post(API_URL, verifyFormData, {headers: VerifyHeader})
      .then(function (response) {
        if (response.data.success == 1) {
          // setCheckCertificationData(response.data.data);
          // setCertificateNumber(response.data.data.certification_no);
          // setGetText(response.data.data.certification_no);
          // showMessage({
          //   message: 'Success',
          //   description: response.data.message,
          //   type: 'default',
          //   backgroundColor: 'green',
          // });
          console.log('verifyres', response);

          processCheckInput();
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
            value={getText}
            onChangeText={text => setGetText(text)}
          />

          <TouchableOpacity style={styles.btn} onPress={fetchCopiedText}>
            <Text style={styles.btnTxt}>Click to paste</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={processVerifyCertificateNumber}
            // onPress={() => navigation.navigate('DistributerHome')}
          >
            <Text style={styles.btnTxt}>Submit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.inputView}>
          <Text style={styles.headingTxt}>
            Please apply for the certificate first.
          </Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('McqQuestionScreen')}>
            <Text style={styles.btnTxt}>Apply for Certificate</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SubmitCertificateNumberScreen;

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
    fontSize: SIZES.h3,
    // fontWeight: 'bold',
    color: color.black,
    fontFamily: 'Montserrat-SemiBold',
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
    fontFamily: 'Montserrat-Bold',
    color: color.white,
  },
});
