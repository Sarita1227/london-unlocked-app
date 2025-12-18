import { Place } from '../types';

export const freePlaces: Place[] = [
  {
    id: 'fp1',
    name: 'Sky Garden (Free Viewpoint)',
    description: 'London\'s highest public garden offering 360-degree views of the city. Book in advance for free entry to this stunning indoor garden at the top of the Walkie Talkie building.',
    area: 'City of London',
    address: '1 Sky Garden Walk, London EC3M 8AF',
    tubeStation: 'Monument or Bank',
    images: ['sky-garden-1', 'sky-garden-2'],
    reviews: [
      {
        id: 'r1',
        author: 'Sarah M.',
        rating: 5,
        comment: 'Absolutely stunning views! Book in advance as slots fill up quickly. The garden itself is beautiful and there\'s a nice bar/restaurant.',
      },
      {
        id: 'r2',
        author: 'James T.',
        rating: 4,
        comment: 'Great free attraction with panoramic views. Can get busy during peak times but worth the visit.',
      },
    ],
  },
  {
    id: 'fp2',
    name: 'British Museum',
    description: 'World-famous museum housing a vast collection of world art and artifacts. Entry is free to the permanent collection, featuring the Rosetta Stone, Egyptian mummies, and more.',
    area: 'Bloomsbury',
    address: 'Great Russell St, London WC1B 3DG',
    tubeStation: 'Tottenham Court Road or Russell Square',
    images: ['british-museum-1', 'british-museum-2'],
    reviews: [
      {
        id: 'r3',
        author: 'Emma L.',
        rating: 5,
        comment: 'One of the best museums in the world and it\'s free! You could spend days here. Don\'t miss the Egyptian galleries.',
      },
      {
        id: 'r4',
        author: 'Mohammed K.',
        rating: 5,
        comment: 'Incredible collection. The Great Court is architecturally stunning. Highly recommended for history enthusiasts.',
      },
    ],
  },
  {
    id: 'fp3',
    name: 'Trafalgar Square',
    description: 'Iconic central London square featuring Nelson\'s Column, fountains, and the National Gallery. A hub for events, protests, and celebrations throughout the year.',
    area: 'Westminster',
    address: 'Trafalgar Square, London WC2N 5DN',
    tubeStation: 'Charing Cross',
    images: ['trafalgar-1', 'trafalgar-2'],
    reviews: [
      {
        id: 'r5',
        author: 'David P.',
        rating: 4,
        comment: 'Always lively with street performers and tourists. Great starting point for exploring central London.',
      },
    ],
  },
  {
    id: 'fp4',
    name: 'Greenwich Park',
    description: 'Beautiful Royal Park offering stunning views across London, home to the Royal Observatory and Prime Meridian. Perfect for picnics and walks.',
    area: 'Greenwich',
    address: 'Greenwich, London SE10 8QY',
    tubeStation: 'North Greenwich (then bus) or DLR to Cutty Sark',
    images: ['greenwich-1', 'greenwich-2'],
    reviews: [
      {
        id: 'r6',
        author: 'Lisa W.',
        rating: 5,
        comment: 'Gorgeous park with the best views of London. Don\'t miss standing on the Prime Meridian line!',
      },
    ],
  },
  {
    id: 'fp5',
    name: 'National Gallery',
    description: 'World-renowned art museum in Trafalgar Square, housing over 2,300 paintings dating from the mid-13th century to 1900. Free entry to permanent collections.',
    area: 'Westminster',
    address: 'Trafalgar Square, London WC2N 5DN',
    tubeStation: 'Charing Cross or Leicester Square',
    images: ['national-gallery-1', 'national-gallery-2'],
    reviews: [
      {
        id: 'r7',
        author: 'Robert H.',
        rating: 5,
        comment: 'Masterpieces by Van Gogh, Da Vinci, Monet and more. Free admission makes it even better!',
      },
      {
        id: 'r8',
        author: 'Priya S.',
        rating: 5,
        comment: 'Beautiful gallery with an incredible collection. Allow at least 2-3 hours to explore properly.',
      },
    ],
  },
];

