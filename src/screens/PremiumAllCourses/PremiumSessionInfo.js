import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Alert,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import Header from '../../components/Header';
import color from '../../assets/theme/color';
import {FONTS, SIZES, COLORS} from '../../assets/theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Divider, List} from 'react-native-paper';
import VideoPlayer from 'react-native-video-player';

export default function PremiumSessionInfo({navigation}) {
  const [selFav, setSelFav] = useState();
  const [playing, setPlaying] = useState(false);
  const [selSection, setSelSection] = useState('CourseContent');
  const [expendedSession, setExpandedSession] = useState(true);
  const [expendedPdf, setExpandedPdf] = useState(true);
  const [selStart, setSelStart] = useState();

  const handleSessionPress = () => setExpandedSession(!expendedSession);
  const handlePdfPress = () => setExpandedPdf(!expendedPdf);

  const changeSelection = selChange => {
    setSelSection(selChange);
  };

  const handleChecked = () => {
    setSelFav(!selFav);
  };

  const handleStart = () => {
    setSelStart(!selStart);
  };

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);
  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.heading}>
        <Text style={styles.headingTxt}>1.Basic Introduction</Text>

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
      </View>
      <ScrollView>
        <VideoPlayer
          video={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          videoWidth={1600}
          videoHeight={900}
          thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
        />
        {/* <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} /> */}

        <View style={styles.tranieeMainView}>
          <View style={styles.tranieeView}>
            <View style={styles.imgView}>
              <Image
                resizeMode="contain"
                style={styles.logoImg}
                source={require('../../assets/images/logo.png')}
              />
            </View>
            <View style={styles.traineeDtlView}>
              <Text style={styles.nameTxt}>Annalyn Garcia</Text>
              <Text style={styles.nameTxt2}>
                Trainer and CEO of Neudebri Academy
              </Text>
            </View>
          </View>
        </View>
        <View>
          <ScrollView
            horizontal
            style={{
              paddingVertical: SIZES.height / 64,

              // backgroundColor: 'green',
            }}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.multiView}>
              {/* <Divider
            style={{borderBottomWidth: 1, backgroundColor: color.black}}
          /> */}
              <TouchableOpacity
                onPress={() => changeSelection('CourseContent')}>
                {selSection == 'CourseContent' ? (
                  <View style={styles.payView1}>
                    <Text style={styles.txt2}>Cource Content</Text>
                  </View>
                ) : (
                  <View style={styles.payView2}>
                    <Text style={[styles.txt2, {color: color.light_grey}]}>
                      Cource Content
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => changeSelection('DetailOverview')}>
                {selSection == 'DetailOverview' ? (
                  <View style={styles.payView1}>
                    <Text style={styles.txt2}>Detail Overview</Text>
                  </View>
                ) : (
                  <View style={styles.payView2}>
                    <Text style={[styles.txt2, {color: color.light_grey}]}>
                      Detail Overview
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => changeSelection('Comments')}>
                {selSection == 'Comments' ? (
                  <View style={styles.payView1}>
                    <Text style={styles.txt2}>Comments</Text>
                  </View>
                ) : (
                  <View style={styles.payView2}>
                    <Text style={[styles.txt2, {color: color.light_grey}]}>
                      Comments
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        {selSection == 'CourseContent' && (
          <View style={{flex: 1}}>
            <ScrollView>
              <List.Section>
                <List.Accordion
                  title={
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: FONTS.Rubik_Bold,
                          color: color.black,
                        }}>
                        SESSION : 1 Basic Introduction
                      </Text>
                      <Text style={{fontFamily: FONTS.Rubik_medium}}> 4/5</Text>
                    </View>
                  }
                  // left={props => <List.Icon {...props} icon={false} />}
                  right={props =>
                    expendedSession ? (
                      // <List.Icon {...props} icon="chevron-down" color="black" />
                      <View style={{flexDirection: 'row'}}>
                        {/* <List.Icon {...props} icon="download" color="black" /> */}
                        <List.Icon
                          {...props}
                          icon="chevron-down"
                          color="black"
                        />
                      </View>
                    ) : (
                      <View style={{flexDirection: 'row'}}>
                        <List.Icon {...props} icon="download" color="black" />
                        <List.Icon {...props} icon="chevron-up" color="black" />
                      </View>
                    )
                  }
                  expended={expendedSession}
                  onPress={handleSessionPress}>
                  <View style={styles.listmainView}>
                    <View style={styles.topicView}>
                      {!selStart ? (
                        <TouchableOpacity onPress={handleStart}>
                          <Ionicons
                            name="play-outline"
                            color={color.label_bg}
                            size={30}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={handleStart}>
                          <Ionicons
                            name="pause-outline"
                            color={color.label_bg}
                            size={30}
                          />
                        </TouchableOpacity>
                      )}
                      <Text style={{fontFamily: FONTS.primarytext1}}>
                        What is an open wound?
                      </Text>
                    </View>
                    <Image
                      resizeMode="contain"
                      style={styles.doneImg}
                      source={require('../../assets/images/success.png')}
                    />
                  </View>

                  <View style={styles.listmainView}>
                    <View style={styles.topicView}>
                      {!selStart ? (
                        <TouchableOpacity onPress={handleStart}>
                          <Ionicons
                            name="play-outline"
                            color={color.label_bg}
                            size={30}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={handleStart}>
                          <Ionicons
                            name="pause-outline"
                            color={color.label_bg}
                            size={30}
                          />
                        </TouchableOpacity>
                      )}
                      <View>
                        <Text
                          style={{
                            fontFamily: FONTS.primarytext1,
                          }}>
                          Are there different types of open wounds?
                        </Text>
                      </View>
                    </View>
                    <Image
                      resizeMode="contain"
                      style={styles.doneImg}
                      source={require('../../assets/images/success.png')}
                    />
                  </View>

                  <View style={styles.listmainView}>
                    <View style={styles.topicView}>
                      {!selStart ? (
                        <TouchableOpacity onPress={handleStart}>
                          <Ionicons
                            name="play-outline"
                            color={color.label_bg}
                            size={30}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={handleStart}>
                          <Ionicons
                            name="pause-outline"
                            color={color.label_bg}
                            size={30}
                          />
                        </TouchableOpacity>
                      )}
                      <Text style={{fontFamily: FONTS.primarytext1}}>
                        What is an open wound?
                      </Text>
                    </View>
                    <Image
                      resizeMode="contain"
                      style={styles.doneImg}
                      source={require('../../assets/images/success.png')}
                    />
                  </View>

                  <View style={styles.listmainView}>
                    <View style={styles.topicView}>
                      {!selStart ? (
                        <TouchableOpacity onPress={handleStart}>
                          <Ionicons
                            name="play-outline"
                            color={color.label_bg}
                            size={30}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={handleStart}>
                          <Ionicons
                            name="pause-outline"
                            color={color.label_bg}
                            size={30}
                          />
                        </TouchableOpacity>
                      )}
                      <Text style={{fontFamily: FONTS.primarytext1}}>
                        What is an open wound?
                      </Text>
                    </View>
                    <Image
                      resizeMode="contain"
                      style={styles.doneImg}
                      source={require('../../assets/images/success.png')}
                    />
                  </View>
                </List.Accordion>
              </List.Section>
              <List.Section>
                <List.Accordion
                  title={
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: FONTS.Rubik_Bold,
                          color: color.black,
                        }}>
                        PDF Content
                      </Text>
                    </View>
                  }
                  // left={props => <List.Icon {...props} icon={false} />}
                  right={props =>
                    expendedPdf ? (
                      // <List.Icon {...props} icon="chevron-down" color="black" />
                      <View style={{flexDirection: 'row'}}>
                        {/* <List.Icon {...props} icon="download" color="black" /> */}
                        <List.Icon
                          {...props}
                          icon="chevron-down"
                          color="black"
                        />
                      </View>
                    ) : (
                      <View style={{flexDirection: 'row'}}>
                        <List.Icon {...props} icon="download" color="black" />
                        <List.Icon {...props} icon="chevron-up" color="black" />
                      </View>
                    )
                  }
                  expended={expendedPdf}
                  onPress={handlePdfPress}>
                  <View style={styles.listmainView}>
                    <View style={styles.topicView}>
                      <AntDesign
                        name="pdffile1"
                        color={color.label_bg}
                        size={20}
                      />

                      <Text
                        style={{
                          fontFamily: FONTS.primarytext1,
                          textDecorationLine: 'underline',
                        }}>
                        Notes
                      </Text>
                    </View>
                    <Image
                      resizeMode="contain"
                      style={styles.doneImg}
                      source={require('../../assets/images/success.png')}
                    />
                  </View>

                  <View style={styles.listmainView}>
                    <View style={styles.topicView}>
                      <AntDesign
                        name="pdffile1"
                        color={color.label_bg}
                        size={20}
                      />

                      <Text
                        style={{
                          fontFamily: FONTS.primarytext1,
                          textDecorationLine: 'underline',
                        }}>
                        Notes
                      </Text>
                    </View>
                    <Image
                      resizeMode="contain"
                      style={styles.doneImg}
                      source={require('../../assets/images/success.png')}
                    />
                  </View>

                  <View style={styles.listmainView}>
                    <View style={styles.topicView}>
                      <AntDesign
                        name="pdffile1"
                        color={color.label_bg}
                        size={20}
                      />

                      <Text
                        style={{
                          fontFamily: FONTS.primarytext1,
                          textDecorationLine: 'underline',
                        }}>
                        Notes
                      </Text>
                    </View>
                    <Image
                      resizeMode="contain"
                      style={styles.doneImg}
                      source={require('../../assets/images/success.png')}
                    />
                  </View>

                  <View style={styles.listmainView}>
                    <View style={styles.topicView}>
                      <AntDesign
                        name="pdffile1"
                        color={color.label_bg}
                        size={20}
                      />

                      <Text
                        style={{
                          fontFamily: FONTS.primarytext1,
                          textDecorationLine: 'underline',
                        }}>
                        Notes
                      </Text>
                    </View>
                    <Image
                      resizeMode="contain"
                      style={styles.doneImg}
                      source={require('../../assets/images/success.png')}
                    />
                  </View>
                </List.Accordion>
              </List.Section>
            </ScrollView>
          </View>
        )}

        {selSection == 'DetailOverview' && (
          <View style={styles.detailView}>
            <Text style={styles.detailTxt}>
              Lorem ipsum dolor sit amet consectetur. At eget ultrices feugiat
              enim magnis velit eget. Vitae massa neque cursus consectetur
              mauris dolor risus donec elementum. Arcu praesent pharetra amet
              est eget donec quam leo vitae.
            </Text>

            <Text style={styles.detailTxt}>
              Lorem ipsum dolor sit amet consectetur. At eget ultrices feugiat
              enim magnis velit eget. Vitae massa neque cursus consectetur
              mauris dolor risus donec elementum. Arcu praesent pharetra amet
              est eget donec quam leo vitae.
            </Text>
          </View>
        )}

        {selSection == 'Comments' && (
          <>
            <View style={styles.topView}>
              <View style={styles.headingView}>
                <Text style={[styles.nameTxt, {marginRight: 5}]}>
                  Top Comments
                </Text>
                <Ionicons name="chevron-down" size={30} color={color.black} />
              </View>
            </View>
            <ScrollView style={{marginBottom: 10}}>
              <View style={styles.commentMainView}>
                <View style={styles.profileImgView}>
                  <Image
                    resizeMode="contain"
                    style={styles.profileImg}
                    source={require('../../assets/images/logo.png')}
                  />
                </View>
                <View style={styles.nameMainView}>
                  <View style={styles.nameAlignView1}>
                    <View style={styles.nameAlignView2}>
                      <Text style={styles.userTxt}>Kadin Korsgaard</Text>
                      <Text style={styles.dayTxt}>1D</Text>
                    </View>
                    <TouchableOpacity>
                      <Text style={[styles.dayTxt, {fontSize: SIZES.h4 - 2}]}>
                        Reply
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.commentTxtView}>
                    <Text style={styles.commentTxt}>
                      Lorem ipsum dolor sit amet consectetur. Amet facilisis sed
                      urna phasellus auctor viverra egestas amet cursus.
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.commentMainView,
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 40,
                    marginVertical: 10,
                  },
                ]}>
                <View style={styles.profileImgView}>
                  <Image
                    resizeMode="contain"
                    style={styles.profileImg}
                    source={require('../../assets/images/logo.png')}
                  />
                </View>
                <View style={styles.nameMainView}>
                  <View style={styles.nameAlignView1}>
                    <View style={styles.nameAlignView2}>
                      <Text style={styles.userTxt}>Annalyn Garcia</Text>
                      <Text style={styles.dayTxt}>Just Now</Text>
                    </View>
                  </View>
                  <View style={styles.commentTxtView}>
                    <Text style={styles.commentTxt}>
                      Lorem ipsum dolor sit amet consectetur. Amet facilisis sed
                      urna phasellus auctor viverra egestas amet cursus.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.commentMainView}>
                <View style={styles.profileImgView}>
                  <Image
                    resizeMode="contain"
                    style={styles.profileImg}
                    source={require('../../assets/images/logo.png')}
                  />
                </View>
                <View style={styles.nameMainView}>
                  <View style={styles.nameAlignView1}>
                    <View style={styles.nameAlignView2}>
                      <Text style={styles.userTxt}>Kadin Korsgaard</Text>
                      <Text style={styles.dayTxt}>1D</Text>
                    </View>
                    <TouchableOpacity>
                      <Text style={[styles.dayTxt, {fontSize: SIZES.h4 - 2}]}>
                        Reply
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.commentTxtView}>
                    <Text style={styles.commentTxt}>
                      Lorem ipsum dolor sit amet consectetur. Amet facilisis sed
                      urna phasellus auctor viverra egestas amet cursus.
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View style={styles.msgView}>
              <View style={styles.inputView}>
                <TextInput placeholder="Enter Message" style={styles.input} />
              </View>
              <View style={styles.btnView}>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.btnTxt}>SEND</Text>
                  <View>
                    <Ionicons name="send" color={color.white} size={13} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  heading: {
    paddingHorizontal: 20,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headingTxt: {
    fontFamily: FONTS.Rubik_Bold,
    color: color.primary_color,
    fontSize: SIZES.h2,
  },
  tranieeMainView: {
    marginVertical: SIZES.height / 64,
  },
  tranieeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgView: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    height: SIZES.height / 12,
    width: SIZES.width / 2,
  },
  traineeDtlView: {
    flex: 0.75,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  nameTxt: {
    fontFamily: FONTS.primarytext2,
    fontSize: SIZES.h3,
    color: color.black,
  },
  nameTxt2: {
    fontFamily: FONTS.primarytext1,
    fontSize: SIZES.h4 - 2,
    color: color.black,
  },
  multiView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  payView1: {
    borderWidth: 1,
    backgroundColor: color.primary_color,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: SIZES.width / 22,
    paddingVertical: SIZES.height / 64 - 3,
    marginRight: 10,
    borderRadius: SIZES.radius - 8,
    width: SIZES.width / 2.65,
  },
  payView2: {
    borderWidth: 1,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: SIZES.width / 22,
    paddingVertical: SIZES.height / 64 - 3,
    marginRight: 10,
    borderRadius: SIZES.radius - 8,
    width: SIZES.width / 2.65,
  },
  txt2: {
    color: color.white,
    fontFamily: FONTS.Rubik_Bold,
  },
  listmainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  topicView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    flex: 0.9,
  },
  doneImg: {
    flex: 0.1,
    height: SIZES.height / 40,
    width: SIZES.width / 1.5,

    alignItems: 'center',
    justifyContent: 'center',
  },
  detailView: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  detailTxt: {
    fontFamily: FONTS.Rubik_medium,
    textAlign: 'justify',
    color: color.black,
    marginVertical: 5,
  },

  topView: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  headingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentMainView: {
    flexDirection: 'row',
  },
  profileImgView: {
    flex: 0.15,
    paddingHorizontal: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImg: {
    height: SIZES.height / 14,
    width: SIZES.width / 4,
  },
  nameMainView: {
    flex: 0.85,
    paddingHorizontal: 10,
  },
  nameAlignView1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameAlignView2: {
    flexDirection: 'row',
  },
  userTxt: {
    fontFamily: FONTS.primarytext2,
    marginRight: 5,
    color: color.black,
  },
  dayTxt: {
    fontFamily: FONTS.primarytext2,
  },
  commentTxtView: {
    marginTop: 2,
  },
  commentTxt: {
    fontFamily: FONTS.primarytext3,
    fontSize: SIZES.h4 - 2,
    textAlign: 'justify',
  },
  msgView: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputView: {
    borderWidth: 0.8,
    borderColor: color.black,
    width: SIZES.width / 1.4,
    height: SIZES.height / 18,
    borderRadius: 7,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnView: {
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary_color,
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  btnTxt: {
    fontFamily: FONTS.primarytext2,
    color: color.white,
    marginRight: 5,
  },
});
