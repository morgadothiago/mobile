import React from 'react';
import { View, Text } from 'react-native';
import Header from '../../../components/Header';

export default function ReceitaScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Receitas" />
      <Text>Receita Screen</Text>
    </View>
  );
} 