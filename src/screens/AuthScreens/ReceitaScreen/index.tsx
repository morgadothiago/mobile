import { View, SafeAreaView, Text, StatusBar } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { styles } from '../../Intro/styles';
import Header from '../../../components/Header';
import { theme } from '../../../global/theme';

type ReceitaParams = {
  recipes: {
    recipes: {
      id: number;
      name: string;
      image: string;
      description: string;
      favorite: boolean;
    }[];
  };
};

export default function ReceitaScreen({ route }: { route: RouteProp<ReceitaParams, 'recipes'> }) {
  const { recipes } = route.params;
  return (
    <View style={{
      backgroundColor: theme.colors.primary,
      flex: 1,


    }}>
      <View>
        <Header title='Receitas' />
      </View>
      <StatusBar barStyle='dark-content' />
      {recipes.map((recipe) => (
        <Text key={recipe.id}>{recipe.name}</Text>
      ))}
    </View>
  );
}