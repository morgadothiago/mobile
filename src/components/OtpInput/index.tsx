import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, StyleProp, ViewStyle, KeyboardAvoidingView, TouchableNativeFeedback, Keyboard, TouchableWithoutFeedback } from 'react-native';

type OtpInputProps = {
  onChangeText: (text: string) => void;
  onBlur: () => void;
  value: string;
  style?: StyleProp<ViewStyle>;
  isValid?: boolean;
}

const OtpInput = ({ onChangeText, onBlur, value, style, isValid }: OtpInputProps) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onChangeText(newOtp.join(''));

    // Move to next input if value entered
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

  };

  const handleKeyPress = (event: any, index: number) => {
    // Move to previous input on backspace
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View>

      <View style={styles.container}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => {
              if (ref) {
                inputRefs.current[index] = ref;
              }
            }}
            value={otp[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onBlur={onBlur}

            maxLength={1}

            style={[styles.input, {
              borderColor: isValid ? '#f3f5f7' : '#FF0000',
              borderWidth: 1
            }]}
          />
        ))}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  input: {
    width: 50,
    height: 50,
    backgroundColor: '#f3f5f7',
    textAlign: 'center',
    fontSize: 18,
    color: '#66324b',
    fontWeight: 'bold',
    borderRadius: 10,
    marginBottom: 10
  },
});

export default OtpInput;