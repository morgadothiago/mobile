export const recipes = [
  {
    id: 1,
    name: 'Sorvete de Chocolate',
    image: 'https://st3.depositphotos.com/1672917/18208/i/1600/depositphotos_182089108-stock-photo-condensed-milk-pudding-close-view.jpg',
    description: 'Sorvete de Chocolate com calda de chocolate',
    favorite: false,
    quantity: 1,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    type: 'app'
  },

  {
    id: 2,
    name: 'Carne de porco',
    image: 'https://st3.depositphotos.com/1672917/18208/i/1600/depositphotos_182089108-stock-photo-condensed-milk-pudding-close-view.jpg',
    description: 'Carne de porco com arroz e feijão',
    favorite: false,
    quantity: 1,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18',
    type: 'user'
  },

  {
    id: 3,
    name: 'Sorvete de Morango',
    image: 'https://st3.depositphotos.com/1672917/18208/i/1600/depositphotos_182089108-stock-photo-condensed-milk-pudding-close-view.jpg',
    description: 'Sorvete de Morango com calda de morango',
    favorite: false,
    quantity: 1,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-12',
    type: 'app'
  },


  {
    id: 4,
    name: 'Strogonoff de frango',
    image: 'https://st3.depositphotos.com/1672917/18208/i/1600/depositphotos_182089108-stock-photo-condensed-milk-pudding-close-view.jpg',
    description: 'Strogonoff de frango com arroz e feijão',
    favorite: false,
    quantity: 1,
  },

  {
    id: 5,
    name: 'Bebidas sem alcool',
    image: 'https://st3.depositphotos.com/1672917/18208/i/1600/depositphotos_182089108-stock-photo-condensed-milk-pudding-close-view.jpg',
    description: 'Bebidas geladas e quentes sem alcool',
    favorite: true,
    quantity: 1,
  },

  {
    id: 6,
    name: 'Sorvete de Chocolate',
    image: 'https://st3.depositphotos.com/1672917/18208/i/1600/depositphotos_182089108-stock-photo-condensed-milk-pudding-close-view.jpg',
    description: 'Sorvete de Chocolate com calda de chocolate',
    favorite: true,
    quantity: 1,

  },

  {
    id: 7,
    name: 'Sorvete de Chocolate',
    image: 'https://st3.depositphotos.com/1672917/18208/i/1600/depositphotos_182089108-stock-photo-condensed-milk-pudding-close-view.jpg',
    description: 'Sorvete de Chocolate com calda de chocolate',
  },

  {
    id: 8,
    name: 'Sorvete de Chocolate',
    image: 'https://st3.depositphotos.com/1672917/18208/i/1600/depositphotos_182089108-stock-photo-condensed-milk-pudding-close-view.jpg',
    description: 'Sorvete de Chocolate com calda de chocolate',
  }
].map(recipe => ({
  ...recipe,
  favorite: recipe.favorite ?? false,
  createdAt: recipe.createdAt ?? new Date().toISOString().split('T')[0],
  updatedAt: recipe.updatedAt ?? new Date().toISOString().split('T')[0],
  type: recipe.type ?? 'app'
}));