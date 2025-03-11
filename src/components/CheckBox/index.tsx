import * as React from 'react';
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { theme } from '../../global/theme';

interface ButtonRadioProps {
  options: { label: string; value: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const ButtonRadio: React.FC<ButtonRadioProps> = ({ options, selectedValue, onValueChange }) => {


  const handlePress = (value: string) => {
    onValueChange(value);
  }

  return (
    <View>
      {options.map(option => (
        <View key={option.value} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton
            color={theme.colors.btnBackground}
            value={option.value}
            status={selectedValue === option.value ? 'checked' : 'unchecked'}
            onPress={() => handlePress(option.value)}
          />
          <Text style={{ marginLeft: 8 }}>{option.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default ButtonRadio;