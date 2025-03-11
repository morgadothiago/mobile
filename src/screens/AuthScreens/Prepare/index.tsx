import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View, } from 'react-native';

import { styles } from './styles';
import Header from '../../../components/Header';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { theme } from '../../../global/theme';
import { BottmSheetModal } from '../../../components/SheetPrepare';
import Button from '../../../components/Button';
import RecipeStep from '../../../components/RecipeStep';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../../types/navigation';

interface ListItemProps {
  item: {
    id: number;
    name: string;
    image: string;
    quantity: number;
  };
}

interface PrepareScreenProps {
  route: {
    params: ListItemProps;
  };
}

export default function PrepareScreen({ route }: PrepareScreenProps) {
  const [isSheetVisible, setSheetVisible] = useState(false);
  const [isSheetEtapas, setSheetEtapas] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>('Por ingrediente');
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const item = route.params?.item;
  const { name, image, quantity } = item || {};
  const options = ['Por ingrediente', 'Porção', 'Total'];
  const Etapas = [{
    etapa1: {
      title: 'Etape 1 - Misturar os ingredientes',
      inputs: [
        { placeholder: 'Farinha de trigo' },
        { placeholder: 'Leite' },
        { placeholder: 'Ovo' },
      ]
    },
    etapa2: {
      title: 'Colocar no forno',
      inputs: [
        { placeholder: 'Farinha de trigo' },
      ]
    }

  }]

  function handleOpenSheet() {
    setSheetVisible(prevState => !prevState);
  }



  function handleSelectOption(option: string) {
    setSelectedOption(option);
  }

  function handleRefresh() {
    Alert.alert('Atualizando a lista de ingredientes');
  }

  return (
    <View style={styles.container}>
      <Header
        title='Preparar receita'
        icon='arrow-left'
        onPress={() => navigation.navigate('Home' as never)}
        refresh={true}
        onRefreshPress={handleRefresh}
      />
      <View style={styles.headerContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantity}>Quantidade:</Text>
            <TouchableOpacity onPress={handleOpenSheet}>
              <Text style={styles.quantityText}>
                {quantity} Unidade Grandes
                <MaterialCommunityIcons
                  name="lead-pencil"
                  size={14}
                  color={theme.colors.btnBackground}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.ingredientsContainer}>
        <View style={styles.ingredientsTitleContainer}>
          <TouchableOpacity onPress={() => setSheetEtapas(true)}>
            <Text style={styles.ingredientsTitleText}>Lista de ingredientes</Text>
          </TouchableOpacity>
        </View>
      </View>


      {isSheetVisible && (
        <BottmSheetModal onPress={() => { }} snapPoints={['50%']}>
          <View style={styles.sheetInputsArea}>
            <Text style={styles.sheetInputsAreaText}>Informe a quantidade que deseja preparar da receita.</Text>
            <View style={styles.sheetInputContainer}>
              {options.map((option) => (
                <TouchableOpacity key={option} style={styles.sheetInputOption} onPress={() => handleSelectOption(option)}>
                  <Text style={styles.sheetInputOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                marginBottom: 20,
                width: '100%',
              }}>
              {selectedOption === 'Por ingrediente' && (
                <>
                  <RecipeStep
                    title="Etapas"
                    inputs={[
                      { placeholder: 'Misturar os ingredientes' },
                      { placeholder: 'Colocar no forno' },
                      { placeholder: 'Retirar do forno' },
                    ]}
                  />
                  <RecipeStep
                    title="Etapa 2"
                    inputs={[
                      { placeholder: 'Farinha de trigo' },
                      { placeholder: 'Leite' },
                      { placeholder: 'Ovo' },
                    ]}
                  />
                </>
              )}
              {selectedOption === 'Porção' && (
                <RecipeStep
                  title="Porção"
                  inputs={[
                    { placeholder: 'Quantidade de porções' },
                  ]}
                />
              )}
              {selectedOption === 'Total' && (
                <RecipeStep
                  title="Total"
                  inputs={[
                    { placeholder: 'Quantidade total' },
                  ]}
                />
              )}
            </ScrollView>

            <View style={styles.buttonContainer}>
              <Button title='Continuar' onPress={() => { }} />
            </View>
          </View>

        </BottmSheetModal>
      )}
    </View>
  );
}
