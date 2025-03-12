import React, { forwardRef } from 'react';
import { TextInput, View, TextInputProps, StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

interface TextAreaProps extends TextInputProps {
  error?: boolean;
}

export const TextArea = forwardRef<TextInput, TextAreaProps>(({ error, ...rest }, ref) => {
  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        style={[
          styles.input,
          error && styles.inputError,
          rest.style
        ]}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        placeholderTextColor="#AEAEB3"
        {...rest}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    backgroundColor: '#f3f5f7',
    borderRadius: 16,
    padding: 16,
    height: 150,
    fontSize: 14,
    color: theme.colors.cardTextColor,
    fontWeight: '400',
  },
  inputError: {
    borderWidth: 1,
    borderColor: theme.colors.btnBackground,
  }
}); 