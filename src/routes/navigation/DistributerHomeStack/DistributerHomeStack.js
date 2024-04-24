import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import DistributerHome from '../../../screens/DistributerScreens/DistributerHome';
import NotificationScreen from '../../../screens/NotificationScreen';
import ProductDetailScreen from '../../../screens/DistributerScreens/ProductDetailScreen';
import CheckoutStack from '../DistributerCheckoutStack/CheckoutStack';
import EnquirySuccess from '../../../screens/DistributerScreens/EnquirySuccess';
import SubmitEnqFormScreen from '../../../screens/DistributerScreens/SubmitEnqFormScreen';
import DistributerHome2 from '../../../screens/DistributerScreens/DistributerHome2';
import McqQuestionScreen from '../../../screens/DistributerScreens/McqQuestionScreen';
import SubmitCertificateNumberScreen from '../../../screens/DistributerScreens/SubmitCertificateNumberScreen';
import EventScreen from '../../../screens/DistributerScreens/EventScreen';
import EventDetail from '../../../screens/DistributerScreens/EventDetail';
import PaymentSuccessScreen from '../../../screens/DistributerScreens/PaymentSuccessScreen';
import SubmitCertificateNumberScreen2 from '../../../screens/DistributerScreens/SubmitCertificateNumScreen2';
import DistributerRecommendedScreen from '../../../screens/DistributerScreens/DistributerRecommendedScreen';
import DistributerNotification from '../../../screens/DistributerScreens/DistributerNotification';
import StartChatWith from '../../../screens/StartChat';
import BookEvent from '../../../screens/DistributerScreens/BookEvent';
import Doctors from '../../../screens/Doctor/Doctors';
import BookAppointment from '../../../screens/Doctor/BookAppointment';
import BookAppointmentList from '../../../screens/Doctor/B_Appointment_List';

export default function DistributerHomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DistributerHome2" component={DistributerHome2} />
      <Stack.Screen name="DistributerHome" component={DistributerHome} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen
        name="DistributerNotification"
        component={DistributerNotification}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      <Stack.Screen name="CheckoutStack" component={CheckoutStack} />
      <Stack.Screen name="EnquirySuccess" component={EnquirySuccess} />
      <Stack.Screen
        name="SubmitEnqFormScreen"
        component={SubmitEnqFormScreen}
      />
      <Stack.Screen name="McqQuestionScreen" component={McqQuestionScreen} />
      <Stack.Screen
        name="SubmitCertificateNumberScreen"
        component={SubmitCertificateNumberScreen}
      />
      <Stack.Screen name="EventScreen" component={EventScreen} />
      <Stack.Screen name="EventDetail" component={EventDetail} />
      <Stack.Screen name="BookEvent" component={BookEvent} />
      <Stack.Screen
        name="PaymentSuccessScreen"
        component={PaymentSuccessScreen}
      />

      <Stack.Screen
        name="SubmitCertificateNumberScreen2"
        component={SubmitCertificateNumberScreen2}
      />
      <Stack.Screen
        name="DistributerRecommendedScreen"
        component={DistributerRecommendedScreen}
      />
      <Stack.Screen
        name="Doctors"
        component={Doctors}
      />
      <Stack.Screen
        name="BookAppointment"
        component={BookAppointment}
      />
      <Stack.Screen
        name="BookedAppointmentList"
        component={BookAppointmentList}
      />
    </Stack.Navigator>
  );
}
