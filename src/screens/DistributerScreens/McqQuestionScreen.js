import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
  Alert,
} from 'react-native';
import {SIZES, COLORS} from '../../assets/theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import * as qs from 'qs';
import {showMessage} from 'react-native-flash-message';
import color from '../../assets/theme/color';
import data from '../../data/QuizData';
import Clipboard from '@react-native-clipboard/clipboard';
import {useSelector} from 'react-redux';
import {API_URL} from '../../constants/Strings';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const McqQuestionScreen = ({navigation}) => {
  const reduxUser = useSelector(state => state.user);
  console.log('redux', reduxUser.customer.id);
  console.log('button', SIZES.h2 + 2);

  // console.log('data======', allQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [copiedText, setCopiedText] = useState('cccccccccc');
  const [certificateData, setCertificateData] = useState([]);

  const processGetMcqQuestionList = () => {
    var questionHeader = new Headers();
    questionHeader.append('accept', 'application/json');
    questionHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    questionHeader.append('Cookie', 'PHPSESSID=vlr3nr52586op1m8ie625ror6b');

    var questionListData = qs.stringify({
      mcqlist: '1',
    });

    axios
      .post(API_URL, questionListData, {headers: questionHeader})
      .then(function (response) {
        if (response.data.success == 1) {
          setQuestionList(response.data.data);
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
  // console.log('data', allQuestions);
  // console.log('data2', questionList);

  const answerList = questionList.map(item => item.answer);
  const answers = answerList.map(item => Object.values(item));

  const processGetCertificate = () => {
    var certificateHeader = new Headers();
    certificateHeader.append('accept', 'application/json');
    certificateHeader.append(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );
    certificateHeader.append('Cookie', 'PHPSESSID=vlr3nr52586op1m8ie625ror6b');

    var certificateFormData = qs.stringify({
      certification: '1',
      total_question: questionList.length,
      correct_question: score,
      user_id: reduxUser.customer.id,
    });
    axios
      .post(API_URL, certificateFormData, {headers: certificateHeader})
      .then(function (response) {
        if (response.data.success == 1) {
          setCertificateData(response.data.data.certification_no);
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
  console.log('certificate', certificateData);

  useEffect(() => {
    processGetMcqQuestionList();
  }, []);

  // if (score) {
  //   processGetCertificate();
  // } else {
  //   return null;
  // }

  const copyToClipboard = () => {
    Clipboard.setString(certificateData);

    Alert.alert('Your certificate is copy.');
  };

  const processHomePage = () => {
    setShowScoreModal(true);

    setCurrentQuestionIndex(0);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    navigation.navigate('DistributerHome2');
  };

  const validateAnswer = selectedOption => {
    let correct_option = questionList[currentQuestionIndex]['correct_answers'];

    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption == correct_option) {
      // Set Score
      setScore(score + 1);
    }
    // Show Next Button
    setShowNextButton(true);
  };

  // console.log('current', currentOptionSelected);
  // console.log('correct', correctOption);
  const handleNext = () => {
    if (currentQuestionIndex == questionList.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true);

      if (score > questionList.length / 2) {
        processGetCertificate();
      } else {
        return null;
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const restartQuiz = () => {
    setShowScoreModal(false);

    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const renderQuestion = () => {
    return (
      <View
        style={{
          marginVertical: 40,
        }}>
        {/* Question Counter */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              color: color.black,
              fontSize: 20,
              opacity: 0.6,
              marginRight: 2,
            }}>
            Question: {currentQuestionIndex + 1}
          </Text>
          <Text style={{color: color.black, fontSize: 18, opacity: 0.6}}>
            / {questionList.length}
          </Text>
        </View>

        {/* Question */}
        <Text
          style={{
            color: COLORS.white,
            fontSize: 30,
          }}>
          {questionList[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };
  const renderOptions = () => {
    return (
      <View>
        {answers[currentQuestionIndex]?.map(option => (
          // console.log('options', option),
          <TouchableOpacity
            onPress={() => validateAnswer(option)}
            disabled={isOptionsDisabled}
            key={option}
            style={{
              borderWidth: 3,
              borderColor:
                option === correctOption
                  ? color.light_green
                  : option == currentOptionSelected
                  ? COLORS.error
                  : COLORS.secondary + '40',
              backgroundColor:
                option == correctOption
                  ? color.light_green + '20'
                  : option == currentOptionSelected
                  ? COLORS.error + '20'
                  : COLORS.secondary + '20',
              height: 60,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              marginVertical: 10,
            }}>
            <Text style={{fontSize: 20, color: color.black}}>{option}</Text>

            {/* Show Check Or Cross Icon based on correct answer*/}
            {option == correctOption ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: color.light_green,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: color.primary_color,
                  borderWidth: 1,
                }}>
                <MaterialCommunityIcons
                  name="check"
                  style={{
                    color: color.white,
                    fontSize: 20,
                  }}
                />
              </View>
            ) : option == currentOptionSelected ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: color.red,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: color.white,
                  borderWidth: 1,
                }}>
                <MaterialCommunityIcons
                  name="close"
                  style={{
                    color: color.white,
                    fontSize: 20,
                  }}
                />
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const renderNextButton = () => {
    if (showNextButton) {
      {
        return currentQuestionIndex == questionList.length - 1 ? (
          <TouchableOpacity
            onPress={handleNext}
            style={{
              marginTop: 20,
              width: '100%',
              backgroundColor: color.primary_color,
              padding: 20,
              borderRadius: 5,
            }}>
            <Text
              style={{fontSize: 20, color: color.white, textAlign: 'center'}}>
              submit
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleNext}
            style={{
              marginTop: 20,
              width: '100%',
              backgroundColor: color.primary_color,
              padding: 20,
              borderRadius: 5,
            }}>
            <Text
              style={{fontSize: 20, color: color.white, textAlign: 'center'}}>
              Next
            </Text>
          </TouchableOpacity>
        );
      }
    } else {
      return null;
    }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, questionList.length],
    outputRange: ['0%', '100%'],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 20,
          borderRadius: 20,
          backgroundColor: '#00000020',
        }}>
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: color.primary_color,
            },
            {
              width: progressAnim,
            },
          ]}></Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={color.primary_color}
      />
      <View
        style={{
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: 16,
          backgroundColor: COLORS.background,
          position: 'relative',
        }}>
        {/* ProgressBar */}
        {renderProgressBar()}

        {/* Question */}
        {renderQuestion()}

        {/* Options */}
        {renderOptions()}

        {/* Next Button */}
        {renderNextButton()}

        {/* Score Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showScoreModal}>
          <View
            style={{
              flex: 1,
              backgroundColor: color.white,
              alignItems: 'center',
              // justifyContent: 'center',
            }}>
            <View
              style={{
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: SIZES.height / 10,
              }}>
              <Image
                style={{
                  tintColor: color.primary_color,
                  height: SIZES.height / 10,
                  width: SIZES.width / 4,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/images/submit.png')}
              />
              <Text
                style={{
                  fontSize: SIZES.h3 + 4,
                  marginTop: 10,
                  color: color.black,
                  fontFamily: 'Montserrat-Regular',
                }}>
                Your quiz has been submitted!
              </Text>
            </View>

            <View style={styles.scoreCardView}>
              <View style={{marginTop: 25}}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    color: color.black,
                    fontSize: SIZES.h3 + 2,
                  }}>
                  SCORE CARD
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={styles.scoreView2}>
                  <View style={styles.scoreView}>
                    <Text style={styles.scoreTxt}>{score}</Text>
                  </View>
                  <Text style={styles.txt}>Correct Answer</Text>
                </View>
                <View style={styles.scoreView2}>
                  <View style={styles.scoreView}>
                    <Text style={styles.scoreTxt}>{questionList.length}</Text>
                  </View>
                  <Text style={styles.txt}>Total Questions</Text>
                </View>
                <View style={styles.scoreView2}>
                  <View style={styles.scoreView}>
                    <Text style={styles.scoreTxt}>
                      {questionList.length - score}
                    </Text>
                  </View>
                  <Text style={styles.txt}>Wrong Answer</Text>
                </View>
              </View>
            </View>

            <View style={styles.bottemView}>
              <Text style={styles.txt2}>
                {score > questionList.length / 2 ? 'Congratulations!' : 'Oops!'}
              </Text>
              <Text style={styles.txt3}>
                {score > questionList.length / 2
                  ? 'You are passed the quiz, Your certification number below.!'
                  : 'Please Retry'}
              </Text>
            </View>

            {score > questionList.length / 2 ? (
              <>
                <View style={styles.codeView}>
                  <Text style={styles.codeTxt}>{certificateData}</Text>
                </View>
                <TouchableOpacity
                  onPress={copyToClipboard}
                  style={styles.btn}
                  activeOpacity={0.8}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: color.black,
                      fontSize: SIZES.h3,
                      fontFamily: 'Montserrat-SemiBold',
                      letterSpacing: 4,
                    }}>
                    COPY
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={processHomePage}
                  style={{
                    backgroundColor: color.primary_color,
                    padding: 10,
                    width: '90%',
                    borderRadius: 5,
                    marginTop: SIZES.height / 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: color.white,
                      fontSize: SIZES.h3,
                      fontFamily: 'Montserrat-Bold',
                    }}>
                    GO BACK TO HOME PAGE
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={restartQuiz}
                style={{
                  backgroundColor: color.primary_color,
                  padding: 15,
                  width: '80%',
                  borderRadius: 20,
                  marginTop: SIZES.height / 40,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: color.white,
                    fontSize: 20,
                  }}>
                  Retry Quiz
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scoreCardView: {
    marginTop: 20,
    width: '90%',
    height: '27%',
    backgroundColor: color.white,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 5,
    // shadowColor: 'black',
    shadowOffset: {width: -2, height: 8},
  },
  scoreView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: color.primary_color,
  },
  scoreView2: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: SIZES.width / 20,
  },
  scoreTxt: {
    fontSize: SIZES.h2,
    fontFamily: 'Montserrat-SemiBold',
    color: color.white,
    textAlign: 'center',
  },
  txt: {
    textAlign: 'center',
    fontSize: SIZES.h3 - 2,
    fontFamily: 'Montserrat-Regular',
    color: color.black,
    marginTop: 10,
  },
  bottemView: {
    marginTop: SIZES.height / 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  txt2: {
    fontSize: SIZES.h3,
    fontFamily: 'Montserrat-SemiBold',
    color: 'green',
    lineHeight: 30,
  },
  txt3: {
    fontSize: SIZES.h3,
    textAlign: 'center',
    lineHeight: 25,
    color: 'green',
    fontFamily: 'Montserrat-Regular',
  },
  codeView: {
    marginTop: 20,
    paddingHorizontal: SIZES.width / 4.5,
    paddingVertical: 20,
    borderRadius: 5,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: color.primary_color,
    paddingBottom: 30,
  },
  codeTxt: {
    fontSize: SIZES.h2 + 2,
    letterSpacing: 5,
    color: color.black,
    fontFamily: 'Montserrat-SemiBold',
    // bottom: 8,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 1.5,
    paddingHorizontal: SIZES.width / 12,
    paddingVertical: 8,
    // position: 'absolute',
    zIndex: 9999,
    bottom: heightPercentageToDP(2.5),
    backgroundColor: color.white,
    borderRadius: 5,
    // top: 0,
  },
});

export default McqQuestionScreen;
