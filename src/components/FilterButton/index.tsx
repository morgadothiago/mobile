import { Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { theme } from '../../global/theme';
import { useState } from 'react';

type Props = {
  icon: keyof typeof Feather.glyphMap;
  onPress?: () => void;
}

export default function FilterButton({ icon, onPress }: Props) {
  const [filterItemSelected, setFilterItemSelected] = useState(true);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {
        filterItemSelected ? (
          <Feather name={icon} size={29} color={theme.colors.cardTextColor} />
        ) : (
          <View >
            <Feather name={icon} size={29} color={theme.colors.cardTextColor} />
            <Text style={styles.containerFilter}>3</Text>
          </View>
        )
      }
    </TouchableOpacity>
  );
}