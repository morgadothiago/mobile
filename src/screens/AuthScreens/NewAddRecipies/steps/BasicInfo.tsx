import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Input from '../../../../components/Input';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../../../global/theme';
import { TextArea } from '../../../../components/TextArea';

import RefressIcon from '../../../../assets/img/icons/repeat.png'

interface BasicInfoProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export function BasicInfo({ formData, updateFormData }: BasicInfoProps) {
  return (
    <View style={styles.container}>
      <Text >
        Defina as informações da receita
      </Text>
      <ScrollView style={{ gap: 16 }}>
        <TouchableOpacity style={styles.imageSelector}>
          <View style={styles.imageSelectorContent}>
            <View style={styles.imageSelectorIcon}>
              <Feather name="image" size={66} color="#fff" />
            </View>
            <Text style={styles.imageSelectorText}>Escolher imagem</Text>
          </View>

        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Input
            placeholder="Nome da receita"
            value={formData.name}
            onChangeText={(text) => updateFormData({ name: text })}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Input
            placeholder="Categoria"
            value={formData.category}
            onChangeText={(text) => updateFormData({ category: text })}
            style={styles.input}

          />

          <TouchableOpacity style={styles.iconButton}>
            <Image source={RefressIcon} width={24} height={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextArea
            placeholder="Descrição da receita"
            value={formData.description}
            onChangeText={(text) => updateFormData({ description: text })}
          />
        </View>

        <View>
          <Input placeholder='Unidade de medida' value={formData.unit} onChangeText={(text) => updateFormData({ unit: text })} />
          <TouchableOpacity style={styles.iconButton}>
            <Image source={RefressIcon} width={24} height={24} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
    gap: 4,
  },
  imageSelector: {

    width: '100%',
    height: 120,

    backgroundColor: '#f3f5f7',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSelectorContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  imageSelectorIcon: {
    backgroundColor: '#999',
    width: 100,
    height: 100,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSelectorText: {
    fontSize: 14,
    color: theme.colors.cardTextColor,
    fontWeight: '400',
  },
  inputContainer: {
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f3f5f7',
    borderRadius: 16,
    padding: 16,
    fontSize: 14,
    color: theme.colors.cardTextColor,
    fontWeight: '400',
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  }
}); 