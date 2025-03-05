import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from '../../screens/Intro';
import SignInScreen from '../../screens/signin';
import CreateAccountsScreen from '../../screens/CreateAccounts';
import ForgotPasswordScreen from '../../screens/Forgot-Password';

import ProductScreen from '../../screens/AuthScreens/Product';
import CodeOtpScreen from '../../screens/Code-Otp';

import ChangePasswordScreen from '../../screens/ChangePassword';
import DrawerRoutes from '../drawerStack';

import { useAuth } from '../../context/AuthContext';
import PrepareScreen from '../../screens/AuthScreens/Prepare';


export enum ERoutes {
  Intro = 'Intro',
  SignIn = 'SignIn',
  CreateAccounts = 'CreateAccounts',
  ForgotPassword = 'ForgotPassword',
  ReceitaScreen = 'ReceitaScreen',
  Product = 'Product',
  CodeOtp = 'CodeOtp',
  ChangePassword = 'ChangePassword',
  Home = 'Home',
  Prepare = 'Prepare',
  DrawerRoutes = 'DrawerRoutes',
}

export type RootStackParamList = {
  [ERoutes.Intro]: undefined;
  [ERoutes.SignIn]: undefined;
  [ERoutes.CreateAccounts]: undefined;
  [ERoutes.ForgotPassword]: undefined;
  [ERoutes.CodeOtp]: undefined;
  [ERoutes.Prepare]: undefined;
  [ERoutes.ChangePassword]: undefined;
  [ERoutes.DrawerRoutes]: undefined;
};

const Stack = createNativeStackNavigator();

export function MainStacks() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{ headerShown: false }}
    >
      {/* Public Routes */}
      {!isAuthenticated() ? (
        <>
          <Stack.Screen name={ERoutes.Intro} component={IntroScreen} />
          <Stack.Screen name={ERoutes.SignIn} component={SignInScreen} />
          <Stack.Screen name={ERoutes.CreateAccounts} component={CreateAccountsScreen} />
          <Stack.Screen name={ERoutes.ForgotPassword} component={ForgotPasswordScreen} />
          <Stack.Screen name={ERoutes.CodeOtp} component={CodeOtpScreen} />
          <Stack.Screen name={ERoutes.Product} component={ProductScreen} />
          <Stack.Screen name={ERoutes.ChangePassword} component={ChangePasswordScreen} />
        </>
      ) : (
        // Only have DrawerRoutes for authenticated state
        <>
          <Stack.Screen
            name={ERoutes.DrawerRoutes}
            component={DrawerRoutes}
          />
          <Stack.Screen name={ERoutes.Product} component={ProductScreen} />
          <Stack.Screen name={ERoutes.Prepare} component={PrepareScreen} />

        </>
      )}
    </Stack.Navigator>
  );
}
