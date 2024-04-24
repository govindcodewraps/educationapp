import * as React from 'react';
import {StyleSheet, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import color from '../../../assets/theme/color';
import {Icon} from 'react-native-elements';
import {MaterialCommunityIcons} from 'react-native-vector-icons';
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
import DistributerBottomNavigator from './DistributerBottomNavigator';
import DistributerAboutUs from '../../../screens/DistributerScreens/DistributerAboutUs';
import DistributerFaq from '../../../screens/DistributerScreens/DistributerFaq';
import DistributerContactUs from '../../../screens/DistributerScreens/DistributerContactUs';
import DistributerTerms from '../../../screens/DistributerScreens/DistributerTerms';
import DistributerHomeStack from '../DistributerHomeStack/DistributerHomeStack';
import EventScreen from '../../../screens/DistributerScreens/EventScreen';
const Drawer = createDrawerNavigator();

export default function DrDrawerNavigator({navigation}) {
  //   const {select_type} = route.params;

  //   console.log('Selecttype', select_type);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: color.primary_color,
        drawerActiveTintColor: color.dark_blue,
      }}
      initialRouteName="DrHome"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="DrBottomNavigator"
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
      />


    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  icons: {
    width: 30,
  },
});
