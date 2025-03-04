import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../screens/AuthScreens/Home';
import ProductScreen from '../../screens/AuthScreens/Product';
import ReceitaScreen from '../../screens/AuthScreens/ReceitaScreen';
import PrepareScreen from '../../screens/AuthScreens/Prepare';
import { DrawerMenu } from '../../components/DrawerMenu';

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
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Product" component={ProductScreen} />
      <Drawer.Screen name="Receita" component={ReceitaScreen} />
      <Drawer.Screen name="Prepare" component={PrepareScreen} />
    </Drawer.Navigator>
  );
} 