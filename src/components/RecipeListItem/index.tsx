import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../global/theme';

interface RecipeListItemProps {
  title: string;
  steps: number;
  quantity: string;
  editable: boolean;
  remove: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function RecipeListItem({ title, steps, quantity, onEdit, onDelete }: RecipeListItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>1</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>passos: {steps}</Text>
          <Text style={styles.info}>qtd: {quantity}</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
          <Feather name="edit-2" size={20} color={theme.colors.btnBackground} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
          <Feather name="trash-2" size={20} color={theme.colors.btnBackground} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F5F6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  numberContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.btnBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  number: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: theme.colors.cardTextColor,
    fontFamily: theme.fontsRoboto.medium,
    marginBottom: 4,
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  info: {
    fontSize: 14,
    color: '#7A7A80',
    fontFamily: theme.fontsRoboto.Regular,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
}); 