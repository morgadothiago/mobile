export const EtapasBase = [
  {
    id: 1,
    title: 'Massa - bolo de cenoura',
    steps: Math.floor(Math.random() * 10) + 1, // Random steps between 1 and 10
    quantity: `${Math.floor(Math.random() * 1000) + 100}g`,
    editable: true,
    remove: true, // Random quantity between 100g and 1100g
  },
  {
    id: 2,
    title: 'Recheio de chocolate',
    steps: Math.floor(Math.random() * 10) + 1,
    quantity: `${Math.floor(Math.random() * 1000) + 100}g`,
    editable: true,
    remove: true, // Random quantity between 100g and 1100g
  },
  {
    id: 3,
    title: 'Cobertura de creme',
    steps: Math.floor(Math.random() * 10) + 1,
    quantity: `${Math.floor(Math.random() * 1000) + 100}g`,
    editable: true,
    remove: true, // Random quantity between 100g and 1100g

  },
  {
    id: 4,
    title: 'Massa de baunilha',
    steps: Math.floor(Math.random() * 10) + 1,
    quantity: `${Math.floor(Math.random() * 1000) + 100}g`,
    editable: true,
    remove: true, // Random quantity between 100g and 1100g
  },

];