import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

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
    <View style={styles.container}>
      <Text style={styles.subtitle}>Defina as etapas da receita.</Text>

      {ingredients.map((ingredient, index) => (
        <View key={ingredient.id} style={styles.ingredientItem}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>{index + 1}</Text>
          </View>
          <Text style={styles.ingredientText}>
            Massa - bolo de cenoura
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="edit-2" size={20} color="#DC1637" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="trash-2" size={20} color="#DC1637" />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={styles.addButton}
        onPress={addIngredient}
      >
        <Text style={styles.addButtonText}>INCLUIR ETAPA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#7A7A80',
    marginBottom: 16,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F5F6',
    borderRadius: 4,
    padding: 16,
    marginBottom: 8,
  },
  numberContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#DC1637',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  number: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  ingredientText: {
    flex: 1,
    fontSize: 14,
    color: '#47474D',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  addButton: {
    height: 56,
    backgroundColor: '#DC1637',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
}); 