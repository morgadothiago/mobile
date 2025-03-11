import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../../components/Header';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../../../components/Button';
import styles from './styles';
import { theme } from '../../../global/theme';
import { useAuth } from '../../../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ERoutes } from '../../../router/mainStacks';

// Update the type definition
type ProductRouteParams = {
  Product: {
    item: {
      name: string;
      description: string;
      image: string;
      favorite: boolean;
    };
  };
};

type ProductScreenProps = {
  route: RouteProp<ProductRouteParams, 'Product'>;
};

type RootStackParamList = {
  Prepare: {
    item: {
      name: string;
      description: string;
      image: string;
      favorite: boolean;
    };
  };
};

export default function ProductScreen({ route }: ProductScreenProps) {
  const item = route.params?.item;

  // Add null check
  if (!item) {
    return null; // or some loading/error state
  }

  const { name, description, image } = item;
  const [favorite, setFavorite] = useState(item.favorite); // Initialize favorite state with item's favorite status
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();

  function handleFavorite() {
    setFavorite(prevFavorite => !prevFavorite);
  }

  function handlePrepare() {
    navigation.navigate('PrepareScreen', { item }); // Use ERoutes for navigation
  }

  return (
    <View style={styles.container}>
      <Header
        icon='arrow-left'
        title="Receita"
        onPress={() => navigation.navigate('Home' as never)}
        more={true}
        onMorePress={() => Alert.alert('more')}

      />

      <View style={styles.containerImage}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>

      <View style={styles.containerTitle}>
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text>Criado por: {user.email}</Text>
        </View>
        <TouchableOpacity onPress={handleFavorite}>
          <MaterialIcons
            name={favorite ? 'favorite' : 'favorite-outline'}
            size={40}
            color={theme.colors.btnBackground}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.containerDescription}>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.containerButton}>
        <Button title='Preparar' onPress={handlePrepare} />
      </View>
    </View>
  );
}