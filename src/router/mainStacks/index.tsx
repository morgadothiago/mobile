import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from '../../screens/Intro';
import SignInScreen from '../../screens/signin';
import CreateAccountsScreen from '../../screens/CreateAccounts';
import ForgotPasswordScreen from '../../screens/Forgot-Password';
import CodeOtpScreen from '../../screens/Code-Otp';
import ChangePasswordScreen from '../../screens/ChangePassword';


// Importação das Telas e rotas que sao auth
import { useAuth } from '../../context/AuthContext';
import DrawerRoutes from '../drawerStack';
import PrepareScreen from '../../screens/AuthScreens/Prepare';
import ProductScreen from '../../screens/AuthScreens/Product';
import HomeScreen from '../../screens/AuthScreens/Home';
import AllRecipes from '../../screens/AuthScreens/AllRecipes';
import DrawerExample from '../drawerStack';
import Home from '../../screens/AuthScreens/Home';


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
  AllRecipes = 'AllRecipes',

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
  [ERoutes.AllRecipes]: undefined;
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
          <Stack.Screen name={ERoutes.Home} component={HomeScreen} />
          <Stack.Screen name={ERoutes.Product} component={ProductScreen} />
          <Stack.Screen name={ERoutes.AllRecipes} component={AllRecipes} />
          <Stack.Screen name={ERoutes.Prepare} component={PrepareScreen} />

        </>
      )}
    </Stack.Navigator>
  );
}
