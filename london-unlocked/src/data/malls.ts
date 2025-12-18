import { Place } from '../types';

export const malls: Place[] = [
  {
    id: 'm1',
    name: 'Westfield London (Shepherd\'s Bush)',
    description: 'One of Europe\'s largest shopping centers with over 300 stores, including luxury brands, high street fashion, restaurants, and a cinema.',
    area: 'Shepherd\'s Bush',
    address: 'Ariel Way, London W12 7GF',
    tubeStation: 'Shepherd\'s Bush (Central line) or Wood Lane',
    storeTypes: 'Luxury brands, High street fashion, Electronics, Dining, Cinema',
    reviews: [
      {
        id: 'mr1',
        author: 'Sophie L.',
        rating: 5,
        comment: 'Huge mall with everything you need. Great mix of affordable and luxury shops. Can easily spend a whole day here!',
      },
    ],
  },
  {
    id: 'm2',
    name: 'Westfield Stratford City',
    description: 'Massive shopping destination in East London with over 250 shops, restaurants, and entertainment options including a large cinema and bowling.',
    area: 'Stratford',
    address: 'Montfichet Rd, London E20 1EJ',
    tubeStation: 'Stratford (multiple lines)',
    storeTypes: 'Fashion, Electronics, Sports, Homeware, Dining, Entertainment',
    reviews: [
      {
        id: 'mr2',
        author: 'James R.',
        rating: 4,
        comment: 'Very convenient location near Olympic Park. Great range of shops and restaurants. Can get very busy on weekends.',
      },
    ],
  },
  {
    id: 'm3',
    name: 'Covent Garden',
    description: 'Historic shopping and entertainment district featuring boutique shops, market stalls, street performers, and renowned restaurants.',
    area: 'Covent Garden',
    address: 'Covent Garden, London WC2E 8RF',
    tubeStation: 'Covent Garden',
    storeTypes: 'Boutiques, Market stalls, Beauty, Arts & Crafts, Dining',
    reviews: [
      {
        id: 'mr3',
        author: 'Emma T.',
        rating: 5,
        comment: 'Love the atmosphere here! Great mix of unique shops and street entertainment. Perfect for a day out.',
      },
    ],
  },
  {
    id: 'm4',
    name: 'Oxford Street',
    description: 'Europe\'s busiest shopping street with over 300 shops including major department stores like Selfridges and John Lewis.',
    area: 'West End',
    address: 'Oxford Street, London',
    tubeStation: 'Oxford Circus, Bond Street, or Tottenham Court Road',
    storeTypes: 'Department stores, Fashion chains, Electronics, Beauty, Accessories',
    reviews: [
      {
        id: 'mr4',
        author: 'Michael K.',
        rating: 4,
        comment: 'Iconic shopping destination. Can be very crowded but has all the major stores. Best visited on weekday mornings.',
      },
    ],
  },
];

