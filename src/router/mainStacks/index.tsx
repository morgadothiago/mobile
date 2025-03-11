import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../../context/AuthContext';
import DrawerRoutes from '../drawerStack';
import ProductScreen from '../../screens/AuthScreens/Product';
import PrepareScreen from '../../screens/AuthScreens/Prepare';
import AllRecipesScreen from '../../screens/AuthScreens/AllRecipes';
import NewAddRecipiesScreen from '../../screens/AuthScreens/NewAddRecipies';
import SignInScreen from '../../screens/signin';
import CreateAccountsScreen from '../../screens/CreateAccounts';
import ForgotPasswordScreen from '../../screens/Forgot-Password';
import CodeOtpScreen from '../../screens/Code-Otp';
import { RootStackParamList } from '../../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export enum ERoutes {
  SignIn = 'SignIn',
  CreateAccounts = 'CreateAccounts',
  ForgotPassword = 'ForgotPassword',
  CodeOtp = 'CodeOtp',
  DrawerRoutes = 'DrawerRoutes',
  Product = 'Product',
  Prepare = 'Prepare',
  AllRecipes = 'AllRecipes',
  NewAddRecipiesScreen = 'NewAddRecipiesScreen',
}

export function MainStacks() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated() ? (
        // Auth Screens
        <>
          <Stack.Screen name={ERoutes.SignIn} component={SignInScreen} />
          <Stack.Screen name={ERoutes.CreateAccounts} component={CreateAccountsScreen} />
          <Stack.Screen name={ERoutes.ForgotPassword} component={ForgotPasswordScreen} />
          <Stack.Screen name={ERoutes.CodeOtp} component={CodeOtpScreen} />
        </>
      ) : (
        // App Screens
        <>
          <Stack.Screen name={ERoutes.DrawerRoutes} component={DrawerRoutes} />
          <Stack.Screen name={ERoutes.Product} component={ProductScreen} />
          <Stack.Screen name={ERoutes.Prepare} component={PrepareScreen} />
          <Stack.Screen name={ERoutes.AllRecipes} component={AllRecipesScreen} />
          <Stack.Screen
            name="NewAddRecipiesScreen"
            component={NewAddRecipiesScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
