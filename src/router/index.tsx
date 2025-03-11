import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackParamList, DrawerParamList } from '../types/navigation';

// Screens
import SignInScreen from '../screens/signin';
import CreateAccountsScreen from '../screens/CreateAccounts';
import ForgotPasswordScreen from '../screens/Forgot-Password';
import CodeOtpScreen from '../screens/Code-Otp';
import HomeScreen from '../screens/AuthScreens/Home';
import ProductScreen from '../screens/AuthScreens/Product';
import ProfileScreen from '../screens/AuthScreens/Profile';
import PrepareScreen from '../screens/AuthScreens/Prepare';
import AllRecipesScreen from '../screens/AuthScreens/AllRecipes';
import NewAddRecipiesScreen from '../screens/AuthScreens/NewAddRecipies';
import { DrawerMenu } from '../components/DrawerMenu';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <DrawerMenu {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="PerfilScreen" component={ProfileScreen} />
      <Drawer.Screen name="Product" component={ProductScreen} />
      <Drawer.Screen name="PrepareScreen" component={PrepareScreen} />
      <Drawer.Screen name="AllRecipes" component={AllRecipesScreen} />
    </Drawer.Navigator>
  );
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated() ? (
          // Auth Stack
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="CreateAccounts" component={CreateAccountsScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="CodeOtp" component={CodeOtpScreen} />
          </>
        ) : (
          // App Stack
          <>
            <Stack.Screen name="DrawerRoutes" component={DrawerRoutes} />
            <Stack.Screen name="NewAddRecipiesScreen" component={NewAddRecipiesScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRoutes;
