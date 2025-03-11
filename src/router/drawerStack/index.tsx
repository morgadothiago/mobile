import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerMenu } from '../../components/DrawerMenu';
import ProfileScreen from '../../screens/AuthScreens/Profile';
import { MainStacks } from '../mainStacks';



export enum DrawerERoutes {
  DrawerRoutes = 'DrawerRoutes',
  Perfil = "PerfilScreen",
}

export type RootStackParamList = {
  [DrawerERoutes.Perfil]: undefined;
  [DrawerERoutes.DrawerRoutes]: undefined;
};



const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: '70%',
        },
      }}
      drawerContent={(props) => <DrawerMenu {...props} />}
    >
      <Drawer.Screen name="HomeDrawer" component={MainStacks} />
      <Drawer.Screen name={DrawerERoutes.Perfil} component={ProfileScreen} />

    </Drawer.Navigator>
  );
} 