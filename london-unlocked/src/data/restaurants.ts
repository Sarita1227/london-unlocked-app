import { Place } from '../types';

export const restaurants: Place[] = [
  {
    id: 'r1',
    name: 'Dishoom',
    description: 'Bombay-style café serving authentic Indian cuisine in a nostalgic Irani café setting. Famous for their breakfast naan rolls and black daal.',
    area: 'Multiple locations (Covent Garden, King\'s Cross, Shoreditch)',
    address: '12 Upper St Martin\'s Lane, London WC2H 9FB',
    tubeStation: 'Leicester Square',
    priceLevel: '££',
    cuisineType: 'Bombay Café, North Indian',
    reviews: [
      {
        id: 'rr1',
        author: 'Anjali P.',
        rating: 5,
        comment: 'Absolutely love Dishoom! The chicken ruby curry is to die for. Always busy so book ahead or be prepared to queue.',
      },
      {
        id: 'rr2',
        author: 'Tom B.',
        rating: 4,
        comment: 'Great atmosphere and delicious food. The black daal is incredible. Slightly pricey but worth it for the experience.',
      },
    ],
  },
  {
    id: 'r2',
    name: 'Gymkhana',
    description: 'Michelin-starred fine dining restaurant serving contemporary Indian cuisine inspired by colonial Indian gymkhana clubs. Sophisticated and elegant.',
    area: 'Mayfair',
    address: '42 Albemarle St, London W1S 4JH',
    tubeStation: 'Green Park',
    priceLevel: '£££',
    cuisineType: 'Fine Dining, Contemporary Indian',
    reviews: [
      {
        id: 'rr3',
        author: 'Rahul M.',
        rating: 5,
        comment: 'One of the best Indian restaurants in London. Every dish was perfection. Book well in advance!',
      },
    ],
  },
  {
    id: 'r3',
    name: 'Tayyabs',
    description: 'Legendary Punjabi restaurant in East London known for its seekh kebabs and grilled meats. No-frills authentic experience with incredible flavors.',
    area: 'Whitechapel',
    address: '83-89 Fieldgate St, London E1 1JU',
    tubeStation: 'Whitechapel or Aldgate East',
    priceLevel: '£',
    cuisineType: 'Punjabi, Pakistani',
    reviews: [
      {
        id: 'rr4',
        author: 'Khalid A.',
        rating: 5,
        comment: 'Best kebabs in London! Always packed but service is quick. Cash only, come hungry!',
      },
    ],
  },
  {
    id: 'r4',
    name: 'Hoppers',
    description: 'Sri Lankan and South Indian restaurant famous for their hoppers (bowl-shaped pancakes) and kothu roti. Vibrant flavors and casual dining.',
    area: 'Soho',
    address: '49 Frith St, London W1D 4SG',
    tubeStation: 'Leicester Square or Tottenham Court Road',
    priceLevel: '££',
    cuisineType: 'Sri Lankan, South Indian',
    reviews: [
      {
        id: 'rr5',
        author: 'Meera K.',
        rating: 5,
        comment: 'Hoppers are amazing! Try the egg hopper and bone marrow varuval. Small place so expect to queue.',
      },
    ],
  },
];

