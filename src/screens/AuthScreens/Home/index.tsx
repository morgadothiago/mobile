import { DrawerLayoutAndroid, DrawerLayoutAndroidBase, FlatList, ScrollView, View } from 'react-native';
import { styles } from './styles';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import LIstitem from '../../../components/LIstitem';
import HeaderLIst from '../../../components/HeaderLIst';
import CategoriesItem from '../../../components/CategoriesItem';
import { recipes } from '../../../mocks/Recipes';

import icons from '../../../assets/icon';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../../types/navigation';
import { theme } from '../../../global/theme';

export default function Home() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const item = [{
    id: 1,
    name: 'Hamburguer',
    image: icons.hamburguer,
    description: 'Hamburguer de carne bovina e suína',
    favorite: false
  },
  {
    id: 2,
    name: 'Carne',
    image: icons.carne,
    description: 'Carne bovina e suína',
    favorite: false
  },
  {
    id: 3,
    name: 'Sorvetes',
    image: icons.sorvete,
    description: 'Sorvetes e milkshakes',
    favorite: false
  },
  {
    id: 4,
    name: 'Milkshake',
    image: icons.milkshake,
    description: 'Sorvetes e milkshakes',
    favorite: false
  },
  {
    id: 5,
    name: 'bolos',
    image: icons.bolo,
    description: 'Bolos doces e salgados',
    favorite: false
  },
  {
    id: 6,
    name: 'Bebidas',
    image: icons.bebidas,
    description: 'Bebidas geladas e quentes',
    favorite: false
  }
  ]

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.searchArea}>
        <View style={styles.searchAreaInput}>
          <Input placeholder='Pesquisar receita...' secureTextEntry={false} style={{ flex: 1, color: theme.colors.cardTextColor }} search />

        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionContainer}>
          <HeaderLIst
            title='Em alta'
            link='Ver todas'
            onPress={() => navigation.navigate('AllRecipes')}
          />

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={recipes}
            renderItem={({ item }) => <LIstitem item={item} />}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        <View style={styles.sectionContainer}>
          <HeaderLIst title='Favoritos' link='Ver todas' />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={recipes}
            renderItem={({ item }) => <LIstitem item={item} />}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        <View style={styles.sectionContainer}>
          <HeaderLIst title='Ultimos acessados' link='Ver todas' />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={recipes}
            renderItem={({ item }) => <LIstitem item={item} />}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        <View style={styles.sectionContainer}>
          <HeaderLIst title='Categorias' />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={item}
            renderItem={({ item }) => <CategoriesItem item={item} />}
            contentContainerStyle={styles.categoriesContainer}
          />
        </View>
      </ScrollView>
    </View>
  );
}