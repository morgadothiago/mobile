import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface Portion {
  id: number;
  label: string;
  measure: string;
}

interface PortionsProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export function Portions({ formData, updateFormData }: PortionsProps) {
  const [portions, setPortions] = useState<Portion[]>(formData.portions || [
    { id: 1, label: 'Pequeno', measure: '350' },
    { id: 2, label: 'Médio', measure: '700' },
    { id: 3, label: 'Grande', measure: '1000' },
  ]);

  const addPortion = () => {
    const newPortion = {
      id: portions.length + 1,
      label: '',
      measure: ''
    };
    const updatedPortions = [...portions, newPortion];
    setPortions(updatedPortions);
    updateFormData({ portions: updatedPortions });
  };

  const removePortion = (id: number) => {
    const updatedPortions = portions.filter(portion => portion.id !== id);
    setPortions(updatedPortions);
    updateFormData({ portions: updatedPortions });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Defina as porções e suas respectivas medidas em gramas (g)
      </Text>

      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Rótulo</Text>
        <Text style={styles.headerText}>Medida (g)</Text>
        <View style={{ width: 40 }} />
      </View>

      {portions.map((portion) => (
        <View key={portion.id} style={styles.portionRow}>
          <Text style={styles.portionLabel}>{portion.label}</Text>
          <Text style={styles.portionMeasure}>{portion.measure}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => removePortion(portion.id)}
          >
            <Feather name="trash-2" size={20} color="#DC1637" />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        style={styles.addButton}
        onPress={addPortion}
      >
        <Text style={styles.addButtonText}>INCLUIR PORÇÃO</Text>
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
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 14,
    color: '#7A7A80',
    flex: 1,
  },
  portionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F5F6',
    borderRadius: 4,
    padding: 16,
    marginBottom: 8,
  },
  portionLabel: {
    flex: 1,
    fontSize: 16,
    color: '#47474D',
  },
  portionMeasure: {
    flex: 1,
    fontSize: 16,
    color: '#47474D',
  },
  deleteButton: {
    width: 40,
    alignItems: 'center',
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