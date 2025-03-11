import React from 'react';
import { View } from 'react-native';
import Header from '../../../components/Header';
import { MultiStepForm } from '../../../components/MultiStepForm';
import { BasicInfo } from './steps/BasicInfo';
import { Ingredients } from './steps/Ingredients';

import { Portions } from './steps/Portions';
import { useNavigation } from '@react-navigation/native';

export default function NewAddRecipiesScreen() {
  const navigation = useNavigation();

  const steps = [
    {
      id: 1,
      title: 'Detalhes',
      component: <BasicInfo formData={{}} updateFormData={() => { }} />
    },
    {
      id: 2,
      title: 'Etapas',
      component: <Ingredients formData={{}} updateFormData={() => { }} />
    },
    {
      id: 3,
      title: 'Porções',
      component: <Portions formData={{}} updateFormData={() => { }} />
    },
    // {
    //   id: 4,
    //   title: 'Revisão',
    //   component: <Preview />
    // }
  ];

  const handleComplete = (formData: any) => {
    console.log('Form completed:', formData);
    // Enviar dados para API ou fazer outra ação
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Nova Receita"
        icon="arrow-left"
        onPress={() => navigation.goBack()}
      />
      <MultiStepForm steps={steps} onComplete={handleComplete} />
    </View>
  );
}