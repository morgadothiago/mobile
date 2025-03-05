import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons, AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import { ERoutes } from '../../router/mainStacks';
import { DrawerERoutes } from '../../router/drawerStack';
import { useAuth } from '../../context/AuthContext';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type HeaderProps = {
  title?: string;
  slogan?: string;
  navigation?: string;
};

type Theme = {
  color: string;
  IconBack: any;
  size: number;
  iconAction?: any;
  slogan?: string;
  sloganColor?: string;
};

enum EStatus {
  Auth
}

type DrawerParamList = {
  Home: undefined;
  Product: undefined;
  Receita: undefined;
  Prepare: undefined;
  Profile: undefined;
};

export default function Header({ title, }: HeaderProps) {
  const { logout, user } = useAuth();
  const [notification, setNotification] = useState(0);
  const route = useRoute();
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const [theme, setTheme] = useState<Theme>({
    color: 'white',
    IconBack: () => <MaterialIcons name="arrow-back" size={24} color="black" />,
    size: 47,
  });



  useEffect(() => {
    switch (route.name) {
      case ERoutes.SignIn:
      case ERoutes.CreateAccounts:
      case ERoutes.ForgotPassword:
      case ERoutes.CodeOtp:
        setTheme({
          color: 'white',
          IconBack: () => <MaterialIcons name='arrow-back' size={theme?.size} color={theme?.color} />,
          size: 47
        })
        break;
      case ERoutes.ReceitaScreen:
        setTheme({
          color: '#66324B',
          IconBack: () => <AntDesign name='arrowleft' size={theme?.size} color='#66324B' />,
          size: 47,
          iconAction: () => <AntDesign name='plus' size={theme?.size} color='#66324B' />
        })
        break;
      case ERoutes.Product:
        setTheme({
          color: '#66324B',
          IconBack: () => <AntDesign name='arrowleft' size={theme?.size} color='#66324B' />,
          size: 47,
          iconAction: () => <Feather name='more-vertical' size={theme?.size} color='#66324B' />
        })
        break;
      case ERoutes.Home:
        setTheme({
          color: '#66324B',
          sloganColor: '#66324B',
          IconBack: () => <MaterialIcons name='menu' size={33} color='#66324B' />,
          size: 47,
          slogan: route.name === ERoutes.Home ? 'KiSorvetes' : null,
          iconAction: () => <Image source={require('../../assets/img/business 1.png')} style={styles.iconAction} />
        })
        break;
      case ERoutes.Prepare:
        setTheme({
          color: '#66324B',
          IconBack: () => <AntDesign name='arrowleft' size={theme?.size} color='#66324B' />,
          size: 47,
          iconAction: () => (
            <View>
              {
                notification ? (
                  <View style={{}}>
                    <Ionicons name='refresh' size={47} color='#66324B' />
                    <View style={styles.notificationArea}>
                      <Text style={styles.notificationText}>{notification}</Text>
                    </View>
                  </View>
                ) : (
                  <View>
                    <Ionicons name='refresh' size={47} color='#66324B' />
                  </View>
                )
              }
            </View>
          )
        })
        break;
      case DrawerERoutes.Perfil:
        setTheme({
          color: '#66324B',
          IconBack: () => <MaterialIcons name='menu' size={33} color='#66324B' />,
          size: 47,
        })
        break;
    }
  }, [route.name]);

  const openDrawer = () => {
    navigation.openDrawer();
  }
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>

        {
          !route.params ? (
            <TouchableOpacity onPress={openDrawer}>
              {theme?.IconBack()}
            </TouchableOpacity>
          ) : <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name='arrow-back' size={theme?.size} color={theme?.color} />
          </TouchableOpacity>
        }

        <Text style={[styles.headerTitle, { color: theme?.color }]}>{title}</Text>
      </View>

      {theme?.iconAction && (
        <TouchableOpacity onPress={() => logout()}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            {theme?.slogan && <Text style={{ color: '#ff0000', fontSize: 18, fontWeight: 'bold' }}>{theme.slogan}</Text>}
            <theme.iconAction />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
