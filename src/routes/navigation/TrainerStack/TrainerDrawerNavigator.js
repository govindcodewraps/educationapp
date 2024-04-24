import * as React from 'react';
import {StyleSheet, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import color from '../../../assets/theme/color';
import {Icon} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BottomNavigation from '../../BottomNavigation';
import {
  AboutUs,
  PrivacyPolicy,
  ContactUs,
  TermCondition,
  FAQ,
} from '../../../screens';
import DrawerContent from '../../../components/DrawerContent';
import {FONTS} from '../../../assets/theme/theme';
import TrainerAboutUs from '../../../screens/TrainerScreens/TrainerAboutUs';
import TrainerFAQ from '../../../screens/TrainerScreens/TrainerFAQ';
import TrainerContactUs from '../../../screens/TrainerScreens/TrainerContactUs';
import TrainerProfile from '../../../screens/TrainerScreens/TrainerProfile';
import TrainerChatScreen from '../../../screens/TrainerScreens/TrainerChatScreen';
import TrainerTermCondition from '../../../screens/TrainerScreens/TrainerTermCondition';
import TrainerHomeStack from './TrainerHomeStack';
import DrawerContent2 from '../../../components/DrawerContent2';
import ChatWith from '../../../screens/ChatWith';
// import DistributerBottomNavigator from './DistributerBottomNavigator';
const Drawer = createDrawerNavigator();
export default function DistributerDrawerNavigator({navigation}) {
  //   const {select_type} = route.params;

  //   console.log('Selecttype', select_type);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: color.primary_color,
        drawerActiveTintColor: color.dark_blue,
      }}
      drawerContent={props => <DrawerContent2 {...props} />}>
      {/* <Drawer.Screen
        name="DistributerBottomNavigator"
        component={DistributerBottomNavigator}
        options={{
          title: 'Home',
          drawerLabelStyle: {fontFamily: FONTS.primarytext5},
          drawerIcon: ({color, size}) => (
            <Image
              source={require('../../../assets/images/ham_icons/home.png')}
              style={{height: 22, width: 22, tintColor: color}}
            />
          ),
        }}
      /> */}

      <Drawer.Screen
        name="TrainerHomeStack"
        //component={TrainerHomeStack}
        component={ChatWith}
        options={{
          title: 'Home',
          drawerLabelStyle: {fontFamily: FONTS.primarytext5},
          drawerIcon: ({color, size}) => (
            <Image
              source={require('../../../assets/images/ham_icons/home.png')}
              style={{height: 22, width: 22, tintColor: color}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="TrainerProfile"
        component={TrainerProfile}
        options={{
          title: 'Profile',
          drawerLabelStyle: {fontFamily: FONTS.primarytext5},
          drawerIcon: ({color, size}) => (
            <FontAwesome5 name="user-circle" size={25} color={color} />
            // <Image
            //   source={require('../../../assets/images/ham_icons/Group.png')}
            //   style={{height: 25, width: 25, tintColor: color}}
            // />
          ),
        }}
      />
      <Drawer.Screen
        name="TrainerChatScreen"
        component={TrainerChatScreen}
        options={{
          title: 'Chat With Trainer',
          drawerLabelStyle: {fontFamily: FONTS.primarytext5},
          drawerIcon: ({color, size}) => (
            <Image
              source={require('../../../assets/images/ham_icons/chat.png')}
              style={{height: 22, width: 24, tintColor: color}}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="TrainerAboutUs"
        component={TrainerAboutUs}
        options={{
          title: 'About Us',
          drawerLabelStyle: {fontFamily: FONTS.primarytext5},
          drawerIcon: ({color, size}) => (
            <Image
              source={require('../../../assets/images/ham_icons/about.png')}
              style={{height: 22, width: 22, tintColor: color}}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="TrainerFAQ"
        component={TrainerFAQ}
        options={{
          title: 'Help and FAQ',
          drawerLabelStyle: {fontFamily: FONTS.primarytext5},
          drawerIcon: ({color, size}) => (
            <Image
              source={require('../../../assets/images/ham_icons/help.png')}
              style={{height: 22, width: 22, tintColor: color}}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="TrainerContactUs"
        component={TrainerContactUs}
        options={{
          title: 'Contact Us',
          drawerLabelStyle: {fontFamily: FONTS.primarytext5},
          drawerIcon: ({color, size}) => (
            <Image
              source={require('../../../assets/images/ham_icons/contact.png')}
              style={{height: 22, width: 22, tintColor: color}}
            />
          ),
        }}
      />

      {/* <Drawer.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          title: 'Privacy Policy',
          drawerLabelStyle: {fontFamily: FONTS.primarytext5},
          drawerIcon: ({color, size}) => (
            <Image
              source={require('../../../assets/images/ham_icons/privacy.png')}
              style={{height: 22, width: 22, tintColor: color}}
            />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="TrainerTermCondition"
        component={TrainerTermCondition}
        options={{
          title: 'Term & Condition',
          drawerLabelStyle: {fontFamily: FONTS.primarytext5},
          drawerIcon: ({color, size}) => (
            <Image
              source={require('../../../assets/images/ham_icons/term.png')}
              style={{height: 22, width: 22, tintColor: color}}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  icons: {
    width: 30,
  },
});
