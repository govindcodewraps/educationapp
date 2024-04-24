import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {
  OnboardingScreens,
  Login,
  Registration,
  ForgetPassword,
  CheckEmail,
  SelectType,
} from '../screens';
import DrawerNavigator from './DrawerNavigator';
import OtpScreen from '../screens/OtpScreen';
import ChooseOptionScreen from '../screens/ChooseOptionScreen';
import ChoosePlanScreen from '../screens/ChoosePlanScreen';
import PaymentOption from '../screens/PaymentOption';
import PaymentSuccess from '../screens/PaymentSuccess';
import DistributerDrawerNavigator from './navigation/DistributerStack/DistributerDrawerNavigator';
import TrainerDrawerNavigator from './navigation/TrainerStack/TrainerDrawerNavigator';
import TrainerDetailFormScreen from '../screens/TrainerScreens/TrainerDetailFormScreen';
import ChooseOption2 from '../screens/ChooseOption2';
import DistributerLogin from '../screens/DistributerScreens/DistributerLogin';
import DistributerSignup from '../screens/DistributerScreens/DistributerSignup';
import DistributerOtp from '../screens/DistributerScreens/DistributerOtp';
import DistributerForgetpassword from '../screens/DistributerScreens/DistributerForgetpassword';
import DistributerCheckmail from '../screens/DistributerScreens/DistributerCheckmail';
import TrainerLogin from '../screens/TrainerScreens/TrainerLogin';
import TrainerCheckmail from '../screens/TrainerScreens/TrainerCheckmail';
import TrainerForgetpassword from '../screens/TrainerScreens/TrainerForgetpassword';
import TrainerSignup from '../screens/TrainerScreens/TrainerSignup';
import TrainerOtp from '../screens/TrainerScreens/TrainerOtp';
import BasicCheckmail from '../screens/BasicScreens/BasicCheckmail';
import BasicForgetpassword from '../screens/BasicScreens/BasicForgetpassword';
import BasicOtp from '../screens/BasicScreens/BasicOtp';
import BasicLogin from '../screens/BasicScreens/BasicLogin';
import BasicSignup from '../screens/BasicScreens/BasicSignup';
import BasicPaymentOption from '../screens/BasicScreens/BasicPaymentOption';
import BasicPaymentSuccess from '../screens/BasicScreens/BasicPaymentSuccess';
import BasicDrawerNavigator from './navigation/BasicStack/BasicDrawerNavigator';
import ChoosePremiumOptionScreen from '../screens/ChoosePremiumOptionScreen';
import PremiumLogin from '../screens/PremiumScreens/PremiumLogin';
import PremiumSignup from '../screens/PremiumScreens/PremiumSignup';
import PremiumCheckmail from '../screens/PremiumScreens/PremiumCheckmail';
import PremiumForgetpassword from '../screens/PremiumScreens/PremiumForgetpassword';
import PremiumOtp from '../screens/PremiumScreens/PremiumOtp';
import PremiumDrawerNavigator from './navigation/PremiumStack/PremiumDrawerNavigator';
import PremiumPaymentOption from '../screens/PremiumScreens/PremiumPaymentOption';
import PremiumPaymentSuccess from '../screens/PremiumScreens/PremiumPaymentSuccess';
import DistributerChangePassword from '../screens/DistributerScreens/DistributerChangePassword';
import TrainerChangePassword from '../screens/TrainerScreens/TrainerChangePassword';
import {useSelector} from 'react-redux';
import DistributerDetailFormScreen from '../screens/DistributerScreens/DistributerDetailFormScreen';
import GovNotAllowedScreen from '../screens/DistributerScreens/GovNotAllowedScreen';
import DoctorSignup from '../screens/Doctor/DoctorSignup';
import DrOtpVerification from '../screens/Doctor/DrOtpVerification';
import DrLogin from '../screens/Doctor/DrLogin';
import DrProfile from '../screens/Doctor/DrProfile';
// import SelectType from '../screens/SelectType';

const AuthStack = createStackNavigator();
export default function AuthNavigator() {
  const reduxUser = useSelector(state => state.user);

  console.log('-------------------?????---------reduxuser', reduxUser);

  return (
    <AuthStack.Navigator>
      {reduxUser.isLoggedIn != true ? (
        <>
          <AuthStack.Screen
            name="OnboardingScreens"
            component={OnboardingScreens}
            options={{
              headerShown: false,
              ...TransitionPresets.ModalFadeTransition,
            }}
          />
          <AuthStack.Screen
            name="ChooseOptionScreen"
            component={ChooseOptionScreen}
            options={{
              headerShown: false,
              ...TransitionPresets.DefaultTransition,
            }}
          />
          <AuthStack.Screen
            name="ChooseOption2"
            component={ChooseOption2}
            options={{
              headerShown: false,
              ...TransitionPresets.DefaultTransition,
            }}
          />

          <AuthStack.Screen
            name="DistributerLogin"
            component={DistributerLogin}
            options={{
              headerShown: false,
              ...TransitionPresets.DefaultTransition,
              // ...select_type,
            }}
          />
          <AuthStack.Screen
            name="DistributerSignup"
            component={DistributerSignup}
            options={{
              headerShown: false,
              ...TransitionPresets.DefaultTransition,
              // ...select_type,
            }}
          />
          <AuthStack.Screen
            name="DistributerDetailFormScreen"
            component={DistributerDetailFormScreen}
            options={{
              headerShown: false,
              ...TransitionPresets.DefaultTransition,
              // ...select_type,
            }}
          />
          <AuthStack.Screen
            name="DistributerOtp"
            component={DistributerOtp}
            options={{
              headerShown: false,
              ...TransitionPresets.DefaultTransition,
              // ...select_type,
            }}
          />
          <AuthStack.Screen
            name="DistributerForgetpassword"
            component={DistributerForgetpassword}
            options={{
              headerShown: false,
              ...TransitionPresets.DefaultTransition,
              // ...select_type,
            }}
          />
          <AuthStack.Screen
            name="DistributerChangePassword"
            component={DistributerChangePassword}
            options={{
              headerShown: false,
              ...TransitionPresets.DefaultTransition,
              // ...select_type,
            }}
          />
          <AuthStack.Screen
            name="DistributerCheckmail"
            component={DistributerCheckmail}
            options={{
              headerShown: false,
              ...TransitionPresets.DefaultTransition,
              // ...select_type,
            }}
          />
          <AuthStack.Screen
            name="GovNotAllowedScreen"
            component={GovNotAllowedScreen}
            options={{
              headerShown: false,
              ...TransitionPresets.DefaultTransition,
              // ...select_type,
            }}
          />
        </>
      ) : (
        <AuthStack.Screen
          name="DistributerDrawerNavigator"
          component={DistributerDrawerNavigator}
          options={{
            headerShown: false,
            ...TransitionPresets.DefaultTransition,
            // ...select_type,
          }}
        />
      )}

      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
        }}
      />
      <AuthStack.Screen
        name="Registration"
        component={Registration}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
        }}
      />

      <AuthStack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
        }}
      />

      <AuthStack.Screen
        name="ChoosePlanScreen"
        component={ChoosePlanScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
        }}
      />
      <AuthStack.Screen
        name="PaymentOption"
        component={PaymentOption}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
        }}
      />
      <AuthStack.Screen
        name="PaymentSuccess"
        component={PaymentSuccess}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
        }}
      />
      <AuthStack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
        }}
      />
      <AuthStack.Screen
        name="CheckMail"
        component={CheckEmail}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
        }}
      />

      <AuthStack.Screen
        name="TrainerDetailFormScreen"
        component={TrainerDetailFormScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />

      <AuthStack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />

      <AuthStack.Screen
        name="TrainerLogin"
        component={TrainerLogin}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="TrainerOtp"
        component={TrainerOtp}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="TrainerSignup"
        component={TrainerSignup}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="TrainerForgetpassword"
        component={TrainerForgetpassword}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="TrainerChangePassword"
        component={TrainerChangePassword}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="TrainerCheckmail"
        component={TrainerCheckmail}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="TrainerDrawerNavigator"
        component={TrainerDrawerNavigator}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="BasicSignup"
        component={BasicSignup}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="BasicLogin"
        component={BasicLogin}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="BasicOtp"
        component={BasicOtp}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="BasicForgetpassword"
        component={BasicForgetpassword}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="BasicCheckmail"
        component={BasicCheckmail}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="BasicPaymentOption"
        component={BasicPaymentOption}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="BasicPaymentSuccess"
        component={BasicPaymentSuccess}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="BasicDrawerNavigator"
        component={BasicDrawerNavigator}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="ChoosePremiumOptionScreen"
        component={ChoosePremiumOptionScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="PremiumLogin"
        component={PremiumLogin}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="PremiumSignup"
        component={PremiumSignup}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="PremiumCheckmail"
        component={PremiumCheckmail}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="PremiumForgetpassword"
        component={PremiumForgetpassword}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="PremiumOtp"
        component={PremiumOtp}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="PremiumPaymentOption"
        component={PremiumPaymentOption}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="PremiumPaymentSuccess"
        component={PremiumPaymentSuccess}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="PremiumDrawerNavigator"
        component={PremiumDrawerNavigator}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="DoctorSignup"
        component={DoctorSignup}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="DrOtpVerify"
        component={DrOtpVerification}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="DrSignin"
        component={DrLogin}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
      <AuthStack.Screen
        name="DrsProfile"
        component={DrProfile}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
          // ...select_type,
        }}
      />
    </AuthStack.Navigator>
  );
}
