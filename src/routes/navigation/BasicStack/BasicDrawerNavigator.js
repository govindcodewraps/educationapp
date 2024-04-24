import * as React from 'react';
import {StyleSheet, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import color from '../../../assets/theme/color';
import {Icon} from 'react-native-elements';
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import BottomNavigation from '../../BottomNavigation';

import DrawerContent3 from '../../../components/DrawerContent3';
import {FONTS} from '../../../assets/theme/theme';

import BasicHome from '../../../screens/BasicScreens/BasicHome';
import BasicAboutUs from '../../../screens/BasicScreens/BasicAboutUs';
import BasicFaq from '../../../screens/BasicScreens/BasicFaq';
import BasicTerms from '../../../screens/BasicScreens/BasicTerms';
import BasicContactUs from '../../../screens/BasicScreens/BasicContactUs';
import BasicProfile from '../../../screens/BasicScreens/BasicProfile';

import BasicHomeStack from './BasicHomeStack';
import BasicCertificateStatusScreen from '../../../screens/BasicScreens/BasicCertificateStatusScreen';
const Drawer = createDrawerNavigator();
export default function BasicDrawerNavigator({navigation}) {
  //   const {select_type} = route.params;

  //   console.log('Selecttype', select_type);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: color.primary_color,
        drawerActiveTintColor: color.dark_blue,
      }}
      initialRouteName="DistributerHome"
      drawerContent={props => <DrawerContent3 {...props} />}>
      <Drawer.Screen
        name="BasicHomeStack"
        component={BasicHomeStack}
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
        name="BasicCertificateStatusScreen"
        component={BasicCertificateStatusScreen}
        options={{
          title: 'Certificate Status',
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
        name="BasicProfile"
        component={BasicProfile}
        options={{
          title: 'Profile',
          drawerLabelStyle: {fontFamily: FONTS.primarytext5},
          drawerIcon: ({color, size}) => (
            <Image
              source={require('../../../assets/images/ham_icons/term.png')}
              style={{height: 22, width: 22, tintColor: color}}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="BasicAboutUs"
        component={BasicAboutUs}
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
        name="BasicFaq"
        component={BasicFaq}
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
        name="BasicContactUs"
        component={BasicContactUs}
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
        name="BasicTerms"
        component={BasicTerms}
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
