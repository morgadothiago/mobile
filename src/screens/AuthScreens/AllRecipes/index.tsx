import { FlatList, Image, Text, View, Pressable, ScrollView } from 'react-native';
import { styles } from './styles';
import Header from '../../../components/Header';
import Input from '../../../components/Input';

import FilterButton from '../../../components/FilterButton';

import ListItem from '../../../components/LIstitem';
import { useState, useCallback } from 'react';
import { BottmSheetModal } from '../../../components/SheetPrepare';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../../global/theme';
import { recipes } from '../../../mocks/Recipes';
import ButtonRadio from '../../../components/CheckBox';
import SwitchComponent from '../../../components/Switch';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { useAuth } from '../../../context/AuthContext';


import RefressIcon from '../../../assets/img/icons/refresh.png'


type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AllRecipes() {
  const { user } = useAuth();
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    orderBy: {
      relevance: false,
      date: false,
      dataEdicao: false
    },
    properties: {
      Todos: true,
      MinhasReceitas: false,
      DoAplicativo: false
    },
    favoritesOnly: false,
    marker: false
  });

  const toggleModal = () => {
    setFilterVisible(!isFilterVisible);
  };

  const handleSelect = (category: 'orderBy' | 'properties', value: string) => {
    console.log('Selected category:', category);
    console.log('Selected value:', value);

    setFilters(prevFilters => ({
      ...prevFilters,
      [category]: Object.keys(prevFilters[category]).reduce((acc, key) => ({
        ...acc,
        [key]: key === value
      }), {}),
      marker: true
    }));
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(text.toLowerCase()) ||
      recipe.description.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };
  const applyFilters = useCallback(() => {
    let filtered = [...recipes];
    console.log('Iniciando filtragem...');

    // Filtrar por propriedades (Todos, MinhasReceitas, DoAplicativo)
    if (filters.properties.MinhasReceitas) {
      filtered = filtered.filter(recipe => recipe.type === 'user');
      console.log('Filtrado MinhasReceitas:', filtered.length);
    } else if (filters.properties.DoAplicativo) {
      filtered = filtered.filter(recipe => recipe.type === 'app');
      console.log('Filtrado DoAplicativo:', filtered.length);
    }
    // Se Todos estiver selecionado, mantém todas as receitas

    // Ordenação
    if (filters.orderBy.relevance) {
      // Ordenar por relevância (baseado em popularidade/favoritos)
      filtered.sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));
      console.log('Ordenado por relevância');
    } else if (filters.orderBy.date) {
      // Ordenar por data de criação (mais recente primeiro)
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      console.log('Ordenado por data de criação');
    } else if (filters.orderBy.dataEdicao) {
      // Ordenar por data de atualização (mais recente primeiro)
      filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      console.log('Ordenado por data de edição');
    }

    // Filtrar favoritos (se ativado)
    if (filters.favoritesOnly) {
      filtered = filtered.filter(recipe => recipe.favorite);
      console.log('Filtrado apenas favoritos:', filtered.length);
    }

    console.log('Resultado final:', {
      total: filtered.length,
      favoritos: filtered.filter(r => r.favorite).length,
      app: filtered.filter(r => r.type === 'app').length,
      user: filtered.filter(r => r.type === 'user').length
    });

    setFilteredRecipes(filtered);
    setFilterVisible(false);
    setFilters(prev => ({
      ...prev,
      marker: true
    }));
  }, [filters, recipes]);

  const handleSwitchChange = (value: boolean) => {
    setFilters(prev => ({
      ...prev,
      favoritesOnly: value,
      marker: true
    }));
  };

  const resetFilterCounter = () => {
    setFilters({
      orderBy: {
        relevance: false,
        date: false,
        dataEdicao: false
      },
      properties: {
        Todos: false,
        MinhasReceitas: false,
        DoAplicativo: false
      },
      favoritesOnly: false,
      marker: false
    });
  };


  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Header
        title='Receitas'
        icon='arrow-left'
        onPress={() => navigation.goBack()}
        plus={true}
        onPlusPress={() => navigation.navigate('NewAddRecipiesScreen')}
      />

      <View style={styles.content}>
        <Input placeholder='Pesquisar receita' onChangeText={handleSearch} />
        <FilterButton icon='filter' onPress={toggleModal} />
      </View>
      <View style={styles.totalRecipes}>
        <Text style={styles.totalRecipesText}>Foram encontradas
          <Text style={styles.totalRecipesTextNumber}> {filteredRecipes.length} </Text>
          receitas</Text>
      </View>
      <FlatList
        style={styles.list}
        data={filteredRecipes}
        renderItem={({ item }) => (
          <ListItem item={item} />
        )}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListEmptyComponent={() => (
          <View style={{
            height: 565,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Image source={require('../../../assets/img/empty.png')} />
            <View style={styles.emptyListTextContainer}>
              <Text style={styles.emptyListText}>Nenhuma Receita Encontrada</Text>
            </View>
          </View>
        )}
      />

      {
        isFilterVisible && (
          <View style={styles.overlay}>
            <BottmSheetModal onPress={toggleModal} snapPoints={['76%']}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Filtro e Ordenação</Text>
                  <Pressable onPress={() => { resetFilterCounter(); }}>
                    <View style={styles.modalCloseButton}>
                      <Image source={RefressIcon} style={styles.modalCloseButtonIcon} />

                      {filters.marker && (
                        <View style={styles.modalCloseButtonText}>
                          <Text style={styles.modalCloseButtonNumber}>
                            {Object.values(filters.orderBy).filter(Boolean).length +
                              Object.values(filters.properties).filter(Boolean).length +
                              (filters.favoritesOnly ? 1 : 0)}
                          </Text>
                        </View>
                      )}


                    </View>

                  </Pressable>
                </View>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{ width: '100%', paddingBottom: 80 }}
                >
                  <View style={{
                    flexDirection: 'column',
                    gap: 10,
                  }}>
                    <View>
                      <Text style={styles.filterTitle}>Ordenar por</Text>
                      <View style={{ paddingHorizontal: 10, gap: 10 }}>
                        <ButtonRadio
                          options={[
                            { label: 'Relevância', value: 'relevance' },
                            { label: 'Data', value: 'date' },
                            { label: 'Data de Edição', value: 'dataEdicao' }
                          ]}
                          selectedValue={Object.entries(filters.orderBy).find(([_, value]) => value)?.[0] || ''}
                          onValueChange={(value) => handleSelect('orderBy', value)}
                        />
                      </View>
                    </View>

                    <Text style={styles.filterTitle}>Propriedades</Text>
                    <View style={{ paddingHorizontal: 10, gap: 10 }}>
                      <ButtonRadio
                        options={[
                          { label: 'Todos', value: 'Todos' },
                          { label: 'Minhas Receitas', value: 'MinhasReceitas' },
                          { label: 'Do Aplicativo', value: 'DoAplicativo' }
                        ]}
                        selectedValue={Object.entries(filters.properties).find(([_, value]) => value)?.[0] || ''}
                        onValueChange={(value) => handleSelect('properties', value)}
                      />
                    </View>
                    <View style={styles.filterFavoriteAresContainer}>
                      <Text style={styles.filterTitle}>Somente Favoritas</Text>
                    </View>
                    <SwitchComponent
                      value={filters.favoritesOnly}
                      onChange={handleSwitchChange}
                    />
                  </View>
                  <View style={styles.filterButtonContainer}>
                    <Button
                      title='Aplicar'
                      onPress={applyFilters}
                    />
                  </View>
                </ScrollView>
              </View>
            </BottmSheetModal>
          </View>
        )
      }
    </View>
  );
}