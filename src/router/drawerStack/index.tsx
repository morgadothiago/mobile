import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerMenu } from '../../components/DrawerMenu';
import HomeScreen from '../../screens/AuthScreens/Home';
import ProfileScreen from '../../screens/AuthScreens/Profile';
import NewAddRecipiesScreen from '../../screens/AuthScreens/NewAddRecipies';

export enum DrawerERoutes {
  DrawerRoutes = 'DrawerRoutes',
  Perfil = "PerfilScreen",
  NewAddRecipiesScreen = "NewAddRecipiesScreen",
}

export type RootStackParamList = {
  [DrawerERoutes.Perfil]: undefined;
  [DrawerERoutes.DrawerRoutes]: undefined;
  [DrawerERoutes.NewAddRecipiesScreen]: undefined;
};

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <DrawerMenu {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
} 