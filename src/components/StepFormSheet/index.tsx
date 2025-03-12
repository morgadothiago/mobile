import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { theme } from '../../global/theme';
import { BottmSheetModal } from '../SheetPrepare';
import { RadioButton } from 'react-native-paper';
import Button from '../Button';

interface StepFormSheetProps {
  visible: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}

export function StepFormSheet({ visible, onClose, onComplete }: StepFormSheetProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    type: 'define', // 'define' ou 'compose'
  });

  const steps = [
    {
      id: 1,
      title: 'Detalhes',
      component: (
        <View>
          <Text style={styles.title}>Preencha as informações da etapa:</Text>
          <TextInput
            style={styles.input}
            placeholder="Cobertura"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <Text style={styles.subtitle}>Como a etapa será definida?</Text>
          <RadioButton.Group
            onValueChange={value => setFormData({ ...formData, type: value })}
            value={formData.type}
          >
            <View style={styles.radioOption}>
              <RadioButton value="compose" color={theme.colors.btnBackground} />
              <Text style={styles.radioText}>Compor a partir de outra receita</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value="define" color={theme.colors.btnBackground} />
              <Text style={styles.radioText}>Definir os passos</Text>
            </View>
          </RadioButton.Group>
        </View>
      )
    },
    {
      id: 2,
      title: 'Recipiente',
      component: (
        <View>
          <Text style={styles.title}>Selecione o recipiente:</Text>
          {/* Recipiente selection component */}
        </View>
      )
    },
    {
      id: 3,
      title: 'Passos',
      component: (
        <View>
          <Text style={styles.title}>Defina os passos:</Text>
          {/* Steps component */}
        </View>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData);
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <BottmSheetModal onPress={onClose} snapPoints={['85%']}>
        <View style={styles.container}>
          <View style={styles.progressContainer}>
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <View style={styles.progressStep}>
                  <View style={[styles.stepCircle, currentStep >= index && styles.activeStep]}>
                    <Text style={styles.stepNumber}>{index + 1}</Text>
                  </View>
                  <Text style={[styles.stepText, currentStep >= index && styles.activeText]}>
                    {step.title}
                  </Text>
                </View>
                {index < steps.length - 1 && (
                  <View style={[styles.progressLine, currentStep > index && styles.activeLine]} />
                )}
              </React.Fragment>
            ))}
          </View>

          <View style={styles.content}>
            {steps[currentStep].component}
          </View>

          <View style={styles.footer}>
            <Button
              title={currentStep === steps.length - 1 ? "Concluir" : "Próximo"}
              onPress={handleNext}
            />
          </View>
        </View>
      </BottmSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  progressStep: {
    alignItems: 'center',
  },
  progressLine: {
    width: 40,
    height: 1,
    backgroundColor: '#DEDEE3',
    marginHorizontal: 8,
  },
  activeLine: {
    backgroundColor: theme.colors.btnBackground,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DEDEE3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  activeStep: {
    backgroundColor: theme.colors.btnBackground,
  },
  stepNumber: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 12,
    color: '#7A7A80',
  },
  activeText: {
    color: theme.colors.btnBackground,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#7A7A80',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#47474D',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F4F5F6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioText: {
    fontSize: 16,
    color: '#47474D',
    marginLeft: 8,
  },
  footer: {
    marginTop: 16,
  }
});