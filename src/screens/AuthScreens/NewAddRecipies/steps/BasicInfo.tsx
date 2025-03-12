import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Modal, FlatList, Pressable, type TextInput } from 'react-native';
import Input from '../../../../components/Input';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../../../global/theme';
import { TextArea } from '../../../../components/TextArea';
import * as ImagePicker from 'expo-image-picker';
import { categoriesBase } from '../../../../mocks/CategoriesBase';
import { unidadeMedida } from '../../../../mocks/UnidadeMedida';
import RefressIcon from '../../../../assets/img/icons/repeat.png'


interface BasicInfoProps {
  formData: any;
  updateFormData: (data: any) => void;
}
export function BasicInfo({ formData, updateFormData }: BasicInfoProps) {
  const [image, setImage] = useState<string | null>(formData.image || null);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showUnitPicker, setShowUnitPicker] = useState(false);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const selectedImage = result.assets[0].uri;
      setImage(selectedImage);
      updateFormData({ image: selectedImage });
    }
  };

  const handleSelectCategory = (category: string) => {
    updateFormData({ category });
    setShowCategoryPicker(false);
  };

  const handleSelectUnit = (unit: string) => {
    updateFormData({ unit });
    setShowUnitPicker(false);
  };
  const RefInput = useRef<TextInput>(null);
  const RefTextArea = useRef<TextInput>(null);


  return (
    <View style={styles.container}>
      <Text>Defina as informações da receita</Text>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity style={styles.imageSelector} onPress={handleImagePicker} >
          <View style={styles.imageSelectorContent}>
            <View style={styles.imageSelectorIcon}>
              {formData.image ? (
                <Image source={{ uri: formData.image }} style={styles.image} />
              ) : (
                <Feather name="image" size={66} color="#fff" />
              )}
            </View>
            <Text style={styles.imageSelectorText}>Escolher imagem</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Input
            ref={RefInput}
            placeholder="Nome da receita"
            value={formData.name}
            onChangeText={(text) => updateFormData({ name: text })}
            style={styles.input}
            onSubmitEditing={() => setShowCategoryPicker(true)}
            keyboardType='default'
          />
        </View>
        <TouchableOpacity style={styles.unitContainer} onPress={() => setShowCategoryPicker(true)}>
          <Input
            placeholder='Categoria'
            value={formData.category}
            editable={false}
            style={styles.input}
          />
          <TouchableOpacity style={styles.iconButton} onPress={() => setShowCategoryPicker(true)}>
            <Image source={RefressIcon} style={styles.iconImage} />
          </TouchableOpacity>
        </TouchableOpacity>

        <Modal visible={showCategoryPicker} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Selecione uma categoria</Text>
                <TouchableOpacity onPress={() => setShowCategoryPicker(false)}>
                  <Feather name="x" size={24} color={theme.colors.cardTextColor} />
                </TouchableOpacity>
              </View>
              <Text style={styles.modalDescription}>Escolha uma categoria da lista abaixo:</Text>

              <FlatList
                data={categoriesBase}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.categoryItem}
                    onPress={() => handleSelectCategory(item.name)}
                  >
                    <View style={styles.categoryItemContent}>
                      <Text style={styles.categoryText}>{item.name}</Text>
                    </View>
                  </Pressable>
                )}
              />
            </View>
          </View>
        </Modal>

        <View style={styles.inputContainer}>
          <TextArea
            ref={RefTextArea}
            placeholder="Descrição da receita"
            value={formData.description}
            onChangeText={(text) => updateFormData({ description: text })}
            style={styles.textArea}
            onSubmitEditing={() => setShowUnitPicker(true)}
            returnKeyType='next'
          />
        </View>

        <TouchableOpacity style={styles.unitContainer} onPress={() => setShowUnitPicker(true)}>
          <Input
            placeholder='Unidade de medida'
            value={formData.unit}
            editable={false}
            style={styles.input}
            onSubmitEditing={() => setShowUnitPicker(true)}
            returnKeyType='done'
          />
          <TouchableOpacity style={styles.iconButton} onPress={() => setShowUnitPicker(true)}>
            <Image source={RefressIcon} style={styles.iconImage} />
          </TouchableOpacity>
        </TouchableOpacity>

        <Modal visible={showUnitPicker} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Selecione uma unidade de medida</Text>
                <TouchableOpacity onPress={() => setShowUnitPicker(false)}>
                  <Feather name="x" size={24} color={theme.colors.cardTextColor} />
                </TouchableOpacity>
              </View>
              <Text style={styles.modalDescription}>Escolha uma unidade de medida da lista abaixo:</Text>

              <FlatList
                data={unidadeMedida}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.categoryItem}
                    onPress={() => handleSelectUnit(item.name)}
                  >
                    <View style={styles.categoryItemContent}>
                      <Text style={styles.categoryText}>{item.name}</Text>
                      <Text style={styles.categoryText}>({item.symbol})</Text>
                    </View>
                  </Pressable>
                )}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.cardTextColor,
    marginBottom: 16,
  },
  scrollView: {
    gap: 16,
  },
  imageSelector: {
    width: '100%',
    height: 140,
    backgroundColor: '#f3f5f7',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  imageSelectorText: {
    fontSize: 16,
    color: theme.colors.cardTextColor,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 10,
    width: '100%',
    gap: 16,
  },
  input: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: theme.colors.cardTextColor,
    fontWeight: '400',
    paddingHorizontal: 24,
    backgroundColor: '#f4f4f4',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  unitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.cardTextColor,
  },
  modalDescription: {
    fontSize: 16,
    color: theme.colors.cardTextColor,
    marginBottom: 16,
  },
  categoryItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f5f7',
  },
  categoryText: {
    fontSize: 18,
    color: theme.colors.cardTextColor,
  },
  textArea: {
    marginTop: 16,
    height: 100,
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#f4f4f4',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});