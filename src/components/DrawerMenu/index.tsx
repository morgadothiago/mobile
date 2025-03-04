import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import styles from './styles';

export function DrawerMenu(props: DrawerContentComponentProps) {
  const { logout, user } = useAuth();

  const menuItems = [
    {
      name: 'Home',
      icon: 'home',
      route: 'Home'
    },
    {
      name: 'Produtos',
      icon: 'inventory',
      route: 'Product'
    },
    {
      name: 'Receitas',
      icon: 'receipt-long',
      route: 'Receita'
    },
    {
      name: 'Preparar',
      icon: 'blender',
      route: 'Prepare'
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header menu  */}
      <View style={styles.header}>
        <Text style={styles.title}>KiSorvetes</Text>
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