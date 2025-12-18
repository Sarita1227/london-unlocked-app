import { Place } from '../types';

export const temples: Place[] = [
  {
    id: 't1',
    name: 'BAPS Shri Swaminarayan Mandir (Neasden Temple)',
    description: 'Stunning Hindu temple built from hand-carved Italian marble and Bulgarian limestone. The first traditional Hindu stone temple in Europe.',
    area: 'Neasden',
    address: '105-119 Brentfield Rd, London NW10 8LD',
    tubeStation: 'Neasden or Stonebridge Park',
    denomination: 'Hindu (Swaminarayan)',
    reviews: [
      {
        id: 'tr1',
        author: 'Amit V.',
        rating: 5,
        comment: 'Absolutely magnificent temple. The architecture is breathtaking. Very peaceful atmosphere and welcoming to visitors of all backgrounds.',
      },
      {
        id: 'tr2',
        author: 'Sarah J.',
        rating: 5,
        comment: 'Visited as a tourist and was amazed by the beauty and intricacy of the carvings. The volunteers are very friendly and informative.',
      },
    ],
  },
  {
    id: 't2',
    name: 'Sri Guru Singh Sabha Gurdwara',
    description: 'One of the largest Sikh temples outside India, serving the local Sikh community with daily prayers and free meals (langar) for all visitors.',
    area: 'Southall',
    address: 'Park Ave, Southall UB1 3HT',
    tubeStation: 'Southall (Overground)',
    denomination: 'Sikh',
    reviews: [
      {
        id: 'tr3',
        author: 'Harpreet S.',
        rating: 5,
        comment: 'Beautiful Gurdwara with a very welcoming community. The langar (free meal) is delicious. Cover your head before entering.',
      },
    ],
  },
  {
    id: 't3',
    name: 'London Buddhist Centre',
    description: 'Buddhist meditation and study center in East London offering classes, retreats, and meditation sessions for all levels.',
    area: 'Bethnal Green',
    address: '51 Roman Rd, London E2 0HU',
    tubeStation: 'Bethnal Green',
    denomination: 'Buddhist (Triratna)',
    reviews: [
      {
        id: 'tr4',
        author: 'Helen M.',
        rating: 5,
        comment: 'Peaceful place for meditation and learning about Buddhism. The drop-in meditation sessions are great for beginners.',
      },
    ],
  },
  {
    id: 't4',
    name: 'London Central Mosque (Regent\'s Park)',
    description: 'Iconic mosque with a distinctive golden dome, serving London\'s Muslim community. Offers guided tours and welcomes visitors.',
    area: 'St John\'s Wood',
    address: '146 Park Rd, London NW8 7RG',
    tubeStation: 'St John\'s Wood or Baker Street',
    denomination: 'Islamic',
    reviews: [
      {
        id: 'tr5',
        author: 'Omar F.',
        rating: 5,
        comment: 'Beautiful mosque with peaceful gardens. Open to visitors of all faiths. Remember to dress modestly and remove shoes.',
      },
    ],
  },
];

