import { Pressable, Text, View } from 'react-native';
import { styles } from './styles';

interface HeaderLIstProps {
  title: string;
  link?: string;
  onPress?: () => void; // Ensure this matches your navigation logic. For example, navigation.navigate('Product', { item })
}

export default function HeaderLIst({ title, link, onPress }: HeaderLIstProps) {

  return (
    <View>
      <View style={styles.titleArea}>
        <Text style={styles.title}>{title}</Text>
        <Pressable onPress={onPress}>
          <Text style={styles.link}>{link}</Text>
        </Pressable>
      </View>
    </View>
  );
}