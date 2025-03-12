import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../../../global/theme';
import { RecipeListItem } from '../../../../components/RecipeListItem';
import { EtapasBase } from '../../../../mocks/EtapasBase';
import { StepFormSheet } from '../../../../components/StepFormSheet';
import { BottmSheetModal } from '../../../../components/SheetPrepare';
import BottomSheet from '@gorhom/bottom-sheet';

interface Ingredient {
  id: number;
  name: string;
  quantity: string;
}

interface IngredientsProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export function Ingredients({ formData, updateFormData }: IngredientsProps) {
  const [ingredients, setIngredients] = useState<Ingredient[]>(formData.ingredients || []);
  const [etapaModal, setEtapaModal] = useState(false);

  const addIngredient = () => {
    const newIngredient = {
      id: ingredients.length + 1,
      name: '',
      quantity: ''
    };
    const updatedIngredients = [...ingredients, newIngredient];
    setIngredients(updatedIngredients);
    updateFormData({ ingredients: updatedIngredients });
  };

  return (
    <>
      <View style={[styles.container, etapaModal && styles.headerActive]}>
        <Text style={styles.subtitle}>Defina as etapas da receita.</Text>

        {EtapasBase.map((step) => (
          <RecipeListItem
            key={step.id}
            title={step.title}
            steps={step.steps}
            quantity={step.quantity}
            editable={step.editable}
            remove={step.remove}
          />
        ))}

        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setEtapaModal(true)}
          >
            <Text style={styles.addButtonText}>INCLUIR ETAPA</Text>
          </TouchableOpacity>
        </View>
      </View>

      {etapaModal && (
        <StepFormSheet
          visible={etapaModal}
          onClose={() => setEtapaModal(false)}
          onComplete={(data) => {
            console.log('Form data:', data);
            setEtapaModal(false);
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  headerActive: {
    backgroundColor: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#7A7A80',
    marginBottom: 16,
  },
  addButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 230,
    height: 49,
    borderWidth: 1,
    borderColor: '#DC1637',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: theme.colors.cardTextColor,
    fontSize: 18,
    fontFamily: theme.fontsRaleway.Bold,
    fontWeight: 'bold',
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
  closeButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}); 