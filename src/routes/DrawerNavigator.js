import * as React from 'react';
import {StyleSheet, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import color from '../assets/theme/color';
import {Icon} from 'react-native-elements';
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import BottomNavigation from './BottomNavigation';
import {
  AboutUs,
  PrivacyPolicy,
  ContactUs,
  TermCondition,
  FAQ,
} from '../screens';
import DrawerContent from '../components/DrawerContent';
import {FONTS} from '../assets/theme/theme';
import DrawerContent5 from '../components/DrawerContent5';
const Drawer = createDrawerNavigator();
export default function DrawerNavigator({navigation, route}) {
  // const {select_type} = route.params;

  // console.log('Selecttype', select_type);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: color.light_theme,
        drawerActiveTintColor: color.dark_blue,
      }}
      drawerContent={props => <DrawerContent5 {...props} />}>
      <Drawer.Screen
        name="BottomNavigation"
        component={BottomNavigation}
        options={{
          title: 'Home',
          drawerLabelStyle: {fontFamily: FONTS.primarytext5},
          drawerIcon: ({color, size}) => (
            <Image
              source={require('../assets/images/ham_icons/home.png')}
              style={{height: 22, width: 22, tintColor: color}}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          title: 'About Us',
          drawerLabelStyle: {fontFamily: FONTS.primarytext5},
          drawerIcon: ({color, size}) => (
            <Image
              source={require('../assets/images/ham_icons/about.png')}
              style={{height: 22, width: 22, tintColor: color}}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="FAQ"
        component={FAQ}
        options={{
          title: 'Help and FAQ',
          drawerLabelStyle: {fontFamily: FONTS.primarytext5},
          drawerIcon: ({color, size}) => (
            <Image
              source={require('../assets/images/ham_icons/help.png')}
              style={{height: 22, width: 22, tintColor: color}}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          title: 'Contact Us',
          drawerLabelStyle: {fontFamily: FONTS.primarytext5},
          drawerIcon: ({color, size}) => (
            <Image
              source={require('../assets/images/ham_icons/contact.png')}
              style={{height: 22, width: 22, tintColor: color}}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          title: 'Privacy Policy',
          drawerLabelStyle: {fontFamily: FONTS.primarytext5},
          drawerIcon: ({color, size}) => (
            <Image
              source={require('../assets/images/ham_icons/privacy.png')}
              style={{height: 22, width: 22, tintColor: color}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="TermCondition"
        component={TermCondition}
        options={{
          title: 'Term & Condition',
          drawerLabelStyle: {fontFamily: FONTS.primarytext5},
          drawerIcon: ({color, size}) => (
            <Image
              source={require('../assets/images/ham_icons/term.png')}
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
