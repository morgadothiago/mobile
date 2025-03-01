import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from './styles';
import { theme } from '../../global/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  createAccount?: boolean;
  isLoading?: boolean;

}

const Button: React.FC<ButtonProps> = ({ title, onPress, createAccount = false, isLoading, ...rest }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={createAccount ? styles.btnCreateAccount : styles.btn}
      {...rest}
    >
      <Text 
      style={createAccount ? styles.btnTextCreateAccount : styles.btnText}>{isLoading ? 
      <ActivityIndicator size='small' color={theme.colors.btnTextColor} style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }} /> : title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
