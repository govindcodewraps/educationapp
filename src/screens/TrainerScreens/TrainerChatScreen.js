import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import color from '../../assets/theme/color';
import {SIZES} from '../../assets/theme/theme';
import Header2 from '../../components/Header2';
import {Bubble, GiftedChat, Send, InputToolbar} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function TrainerChatScreen({navigation}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello Deepak',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello Trainer',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: color.white,
            borderWidth: 0.5,
            borderTopRightRadius: 0,
          },

          left: {
            backgroundColor: color.chat_bg,
            borderTopLeftRadius: 0,
          },
        }}
        textStyle={{
          right: {
            color: color.black,
          },
        }}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View
          style={{
            backgroundColor: color.primary_color,
            paddingHorizontal: 20,
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginRight: 10,
          }}>
          <Text style={{fontWeight: '500', color: color.white, fontSize: 15}}>
            Send{' '}
          </Text>
          <MaterialCommunityIcons name="send" color={color.white} size={20} />
        </View>
      </Send>
    );
  };

  const scrollToBottomComponent = () => {
    return (
      <FontAwesome name="angle-double-down" size={22} color={color.black} />
    );
  };

  return (
    <View style={styles.page}>
      <Header2 navigation={navigation} />

      <View style={styles.topHeaderView}>
        <View style={styles.imgView}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={require('../../assets/images/profile.png')}
          />
        </View>
        <View style={styles.txtView}>
          <Text style={styles.txt1}>Deepak</Text>
          <View style={styles.onlineView}>
            <View
              style={{
                backgroundColor: 'green',
                height: 10,
                width: 10,
                borderRadius: 5,
              }}></View>
            <Text style={styles.txt2}> Online</Text>
          </View>
        </View>
      </View>

      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        timeTextStyle={{
          right: {
            color: color.black,
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  topHeaderView: {
    backgroundColor: color.primary_color,
    flexDirection: 'row',
    paddingVertical: 15,
  },
  imgView: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: SIZES.height / 12,
    width: SIZES.width / 2,
  },
  txtView: {
    // backgroundColor: 'red',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  onlineView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  txt1: {
    fontWeight: 'bold',
    fontSize: SIZES.h3 + 2,
    color: color.white,
  },
  txt2: {
    color: color.white,
    fontWeight: '500',
  },
});
