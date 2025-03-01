import React from 'react';
import { Text, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomToastProps {
  message: string;
  visible: boolean;
  duration?: number; // Duração em milissegundos
  type?: 'success' | 'warning' | 'error'; // Tipo do toast
  onDismiss: () => void; // Função chamada quando o toast é fechado
  icon?: boolean;
}

const CustomToast: React.FC<CustomToastProps> = ({ message, visible, duration = 3000, type = 'success', onDismiss, icon }) => {
  const opacity = new Animated.Value(0);

  React.useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
          }).start(onDismiss);
        }, duration);
      });
    }
  }, [visible, duration, onDismiss]);

  if (!visible) return null;

  const backgroundColor = type === 'success' ? '#4caf50' : type === 'warning' ? '#ff9800' : '#f44336'; // Verde para sucesso, laranja para aviso, vermelho para erro
  const textColor = '#fff';

  return (
    <Animated.View style={[styles.toastContainer, { opacity, backgroundColor }]}>
      <Ionicons name={type === 'success' ? 'checkmark-circle' : 'close-circle'} size={20} color={textColor} />
      <Text style={[styles.toastText, { color: textColor }]}>{message}</Text>

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',

    top: 70,
    left: '50%',
    transform: [{ translateX: -150 }], // Ajuste conforme necessário
    padding: 10,
    borderRadius: 5,
    width: 300,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  toastText: {
    textAlign: 'center',
  },
});

export default CustomToast; 