import { Image, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../../components/Header';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../../../components/Button';
import styles from './styles';
import { theme } from '../../../global/theme';
import { useAuth } from '../../../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


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
  const [favorite, setFavorite] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setData, user } = useAuth();

  console.log(item);

  function handleFavorite() {
    setFavorite(prevFavorite => !prevFavorite);
  }

  function handlePrepare() {
    navigation.navigate('Prepare', { item });
  }

  return (
    <View style={styles.container}>
      <Header title={name} />

      <View style={styles.containerImage}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>

      <View style={styles.containerTitle}>
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text>Criado por:{user.email}</Text>
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