import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { DrawerERoutes } from '../../router/drawerStack';
import Avatar from '../Avatar';


import EmprtAvatar from '../../assets/img/icons/user.png'


export function DrawerMenu(props: DrawerContentComponentProps) {
  const { logout, user } = useAuth();
  const navigation = useNavigation();

  console.log(props.state.routeNames)


  const menuItems = [
    {
      name: 'Home',
      icon: 'home',
      route: 'Home'
    },
    {
      name: DrawerERoutes.Perfil,
      icon: 'person',
      route: DrawerERoutes.Perfil
    },
    {
      name: 'Meus negocios',
      icon: 'inventory',
      route: 'Meusnegocios'
    },
    {
      name: 'Empreendimentos',
      icon: 'receipt-long',
      route: 'PrepareScreen'
    },
    {
      name: 'Receitas',
      icon: 'blender',
      route: 'ReceitasScreen'
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header menu  */}
      <View style={styles.header}>
        <View style={styles.headerWarpper}>
          <Text>Nome do usuario</Text>
          <View>
            {
              user.avatar ? <Avatar /> : <EvilIcons name='user' size={69} />
            }
          </View>

        </View>
      </View>

      <View style={styles.menuItems}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => props.navigation.navigate(item.route)}
          >
            <MaterialIcons name={item.icon as any} size={24} color="#66324B" />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <MaterialIcons name="logout" size={24} color="#FF0000" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
} 