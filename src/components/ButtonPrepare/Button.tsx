import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../global/theme';

type ButtonPrepareProps = {
  quantity: number;
}

export default function ButtonPrepare({ quantity }: ButtonPrepareProps) {
  return (
    <View>
      <TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.quantityText}>
            {quantity} Unidade Grandes
          </Text>
          <MaterialCommunityIcons
            name="lead-pencil"
            size={14}
            color={theme.colors.btnBackground}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  quantityText: {
    fontSize: 14,
    color: theme.colors.btnTextColor
  }
});