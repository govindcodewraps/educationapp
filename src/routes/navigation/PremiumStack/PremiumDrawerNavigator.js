import * as React from 'react';
import {StyleSheet, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import color from '../../../assets/theme/color';
import {Icon} from 'react-native-elements';
import {MaterialCommunityIcons} from 'react-native-vector-icons';
// import BottomNavigation from './BottomNavigation';
import {
  AboutUs,
  PrivacyPolicy,
  ContactUs,
  TermCondition,
  FAQ,
} from '../screens';
import DrawerContent from '../../../components/DrawerContent';
import {FONTS} from '../../../assets/theme/theme';
import PremiumBottomNavigation from './PremiumBottomNavigation';
import PremiumAboutUs from '../../../screens/PremiumScreens/PremiumAboutUs';
import PremiumFaq from '../../../screens/PremiumScreens/PremiumFaq';
import PremiumContactUs from '../../../screens/PremiumScreens/PremiumContactUs';
import PremiumTerms from '../../../screens/PremiumScreens/PremiumTerms';
import PremiumChatScreen from '../../../screens/PremiumScreens/PremiumChatScreen';
import DrawerContent4 from '../../../components/DrawerContent4';

const Drawer = createDrawerNavigator();
export default function PremiumDrawerNavigator({navigation, route}) {
  // const {select_type} = route.params;

  // console.log('Selecttype', select_type);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: color.light_theme,
        drawerActiveTintColor: color.dark_blue,
      }}
      drawerContent={props => <DrawerContent4 {...props} />}>
      <Drawer.Screen
        name="PremiumBottomNavigation"
        component={PremiumBottomNavigation}
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
        name="PremiumAboutUs"
        component={PremiumAboutUs}
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
        name="PremiumFaq"
        component={PremiumFaq}
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
        name="PremiumContactUs"
        component={PremiumContactUs}
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

      <Drawer.Screen
        name="PremiumChatScreen"
        component={PremiumChatScreen}
        options={{
          title: 'Chat with Trainer',
          drawerLabelStyle: {fontFamily: FONTS.primarytext5},
          drawerIcon: ({color, size}) => (
            <Image
              source={require('../../../assets/images/ham_icons/privacy.png')}
              style={{height: 22, width: 22, tintColor: color}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="PremiumTerms"
        component={PremiumTerms}
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
