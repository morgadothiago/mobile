import { Text, View } from 'react-native';
import { styles } from './styles';
import Header from '../../../components/Header';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Header title='Perfil' />
    </View>
  );
}