import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
interface Step {
  id: number;
  title: string; // Made title required for better structure
  component: React.ReactNode;
}

interface MultiStepFormProps {
  steps: Step[];
  onComplete: (formData: Record<string, any>) => void; // Specified type for formData
}

export function MultiStepForm({ steps, onComplete }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.progressBar}>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <View style={styles.progressStep}>
              <View style={[
                styles.progressDot,
                index <= currentStep && styles.activeDot
              ]}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>
              <Text style={[
                styles.stepTitle,
                index === currentStep && styles.activeTitle
              ]}>
                {step.title}
              </Text>
            </View>
            {index < steps.length - 1 && (
              <View style={[
                styles.progressLine,
                index < currentStep && styles.activeLine
              ]} />
            )}
          </React.Fragment>
        ))}
      </View>

      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        {React.cloneElement(steps[currentStep].component as React.ReactElement, {
          formData,
          updateFormData: (data: Record<string, any>) => {
            setFormData(prev => ({ ...prev, ...data }));
          }
        })}

        <View style={styles.buttonContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              {currentStep > 0 && (
                <TouchableOpacity
                  style={{
                    width: currentStep === 1 || currentStep === 2 ? '50%' : '100%',
                    backgroundColor: '#C8102E', // Red background
                    borderRadius: 25, // Rounded corners
                    paddingVertical: 12, // Vertical padding
                    paddingHorizontal: 20, // Horizontal padding
                    flexDirection: 'row', // Align icon and text
                    alignItems: 'center', // Center vertically
                    justifyContent: 'center', // Center horizontally
                    marginRight: 10

                  }}
                  onPress={() => {
                    setCurrentStep(prev => prev - 1);
                  }}
                >
                  <Feather name="arrow-left" size={16} color="#FFFFFF" /> {/* Back arrow icon */}
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={{
                  width: currentStep === 1 || currentStep === 2 ? '50%' : '100%',
                  backgroundColor: '#C8102E', // Red background
                  borderRadius: 25, // Rounded corners
                  paddingVertical: 12, // Vertical padding
                  paddingHorizontal: 20, // Horizontal padding
                  flexDirection: 'row', // Align icon and text
                  alignItems: 'center', // Center vertically
                  justifyContent: 'center', // Center horizontally
                  marginRight: 10
                }}
                onPress={() => {
                  if (currentStep < steps.length - 1) {
                    setCurrentStep(prev => prev + 1);
                  } else {
                    onComplete(formData);
                  }
                }}
              >
                <Text style={{
                  color: '#FFFFFF', // White text color
                  fontSize: 16, // Font size
                  fontWeight: 'bold', // Bold text
                  marginRight: 8, // Space between text and icon
                }}>

                  {currentStep === steps.length - 1 ?
                    <Feather name="check" size={16} color="#FFFFFF" /> :
                    <Feather name="arrow-right" size={16} color="#FFFFFF" />}
                </Text>

              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView >
  );
} 