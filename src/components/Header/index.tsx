import React, { useState, useEffect, type ReactNode } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons, AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import { ERoutes } from '../../router/mainStacks';
import { DrawerERoutes } from '../../router/drawerStack';
import { useAuth } from '../../context/AuthContext';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerParamList, RootStackParamList } from '../../types/navigation';
import { ParamListBase } from '@react-navigation/native';

type HeaderProps = {
  title?: string;
  slogan?: string;
  navigation?: string;
  onPress?: () => void;
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

type NavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function Header({ title, onPress }: HeaderProps) {
  const { logout } = useAuth();
  const [notification, setNotification] = useState(0);
  const route = useRoute();
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const [theme, setTheme] = useState<Theme>({
    color: 'white',
    IconBack: () => <MaterialIcons name="menu" size={24} color="black" />,
    size: 27,
  });

  const openDrawer = () => {
    navigation.toggleDrawer();
  };

  const handleLogout = async () => {
    await logout();

  };

  useEffect(() => {
    switch (route.name) {
      case ERoutes.SignIn:
      case ERoutes.CreateAccounts:
      case ERoutes.ForgotPassword:
      case ERoutes.CodeOtp:
        setTheme({
          color: 'white',
          IconBack: () => <MaterialIcons name='arrow-back' size={theme?.size} color={theme?.color} />,
          size: theme.size
        })
        break;
      case ERoutes.ReceitaScreen:
        setTheme({
          color: '#66324B',
          IconBack: () => <AntDesign name='arrowleft' size={theme?.size} color='#66324B' />,
          size: theme.size,
          iconAction: () => <AntDesign name='plus' size={theme?.size} color='#66324B' />
        })
        break;
      case ERoutes.Product:
        setTheme({
          color: '#66324B',
          IconBack: () => <AntDesign name='arrowleft' size={theme?.size} color='#66324B' />,
          size: theme.size,
          iconAction: () => <Feather name='more-vertical' size={theme?.size} color='#66324B' />
        })
        break;
      case ERoutes.Home:
        setTheme({
          color: '#66324B',
          sloganColor: '#66324B',
          IconBack: () => <MaterialIcons name='menu' size={theme.size} color='#66324B' />,
          size: theme.size,
          slogan: route.name === ERoutes.Home ? 'KiSorvetes' : null,
          iconAction: () => <Image source={require('../../assets/img/business 1.png')} style={styles.iconAction} />
        })
        break;
      case ERoutes.Prepare:
        setTheme({
          color: '#66324B',
          IconBack: () => <AntDesign name='arrowleft' size={theme?.size} color='#66324B' />,
          size: theme.size,
          iconAction: () => (
            <View>
              {
                notification ? (
                  <View style={{}}>
                    <Ionicons name='refresh' size={theme.size} color='#66324B' />
                    <View style={styles.notificationArea}>
                      <Text style={styles.notificationText}>{notification}</Text>
                    </View>
                  </View>
                ) : (
                  <View>
                    <Ionicons name='refresh' size={theme.size} color='#66324B' />
                  </View>
                )
              }
            </View>
          )
        })
        break;
      case ERoutes.AllRecipes:
        setTheme({
          color: '#66324B',
          IconBack: () => <MaterialIcons name='arrow-back' size={theme?.size} color='#66324B' />,
          size: theme.size,
          iconAction: () => <AntDesign name='plus' color='#66324B' size={theme.size} />

        })
      case DrawerERoutes.Perfil:
        setTheme({
          color: '#66324B',
          IconBack: () => <MaterialIcons name='menu' size={theme.size} color='#66324B' />,
          size: theme.size,
          iconAction: () => <AntDesign name='plus' color='#66324B' size={theme.size} />
        })
        break;
    }
  }, [route.name]);


  return (
    <View style={styles.header}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>

        {
          route.params ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name='arrow-back' size={theme?.size} color={theme?.color} />
            </TouchableOpacity>
          ) : <TouchableOpacity onPress={() => openDrawer()}>
            <MaterialIcons name='menu' size={theme?.size} color={theme?.color} />
          </TouchableOpacity>
        }

        <Text style={[styles.headerTitle, { color: theme?.color }]}>{title}</Text>
      </View>

      {theme?.iconAction && (
        <TouchableOpacity onPress={handleLogout}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            {theme?.slogan &&
              <Text style={{ color: '#ff0000', fontSize: 18, fontWeight: 'bold' }}>
                {theme.slogan}
              </Text>}
            <theme.iconAction />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
