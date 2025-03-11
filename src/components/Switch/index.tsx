import * as React from 'react';
import { View, Text } from 'react-native';
import { Switch } from 'react-native-paper';
import styles from './styles';
import { theme } from '../../global/theme';

interface SwitchComponentProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const SwitchComponent: React.FC<SwitchComponentProps> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Switch
        value={value}
        onValueChange={onChange}
        style={styles.switch}
        color={theme.colors.btnBackground}
      />
      <Text style={styles.label}>{value ? 'Sim' : 'Não'}</Text>
    </View>
  );
};

export default SwitchComponent;