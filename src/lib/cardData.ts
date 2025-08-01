import type {
    ActionCard,
    Card,
    MoneyCard,
    PropertyCard,
    PropertyColor,
    RentCard,
    WildCard
} from '../types/card';

// Property cards for each color theme
export const propertyCards: PropertyCard[] = [
  // Poodle Park (Pink/Purple) - 3 cards needed
  {
    id: 'poodle-park-1',
    type: 'property',
    name: 'Poodle Paradise',
    description: 'A fancy grooming salon for poodles',
    emoji: '🐩',
    color: 'poodle-park',
    value: 1,
    rent: [1, 2, 4],
    setSize: 3,
  },
  {
    id: 'poodle-park-2',
    type: 'property',
    name: 'Curly Café',
    description: 'Where poodles go for their morning treats',
    emoji: '☕',
    color: 'poodle-park',
    value: 1,
    rent: [1, 2, 4],
    setSize: 3,
  },
  {
    id: 'poodle-park-3',
    type: 'property',
    name: 'Poodle Playhouse',
    description: 'The ultimate poodle playground',
    emoji: '🏰',
    color: 'poodle-park',
    value: 2,
    rent: [1, 2, 4],
    setSize: 3,
  },

  // Cattown Tower (Orange/Yellow) - 3 cards needed
  {
    id: 'cattown-tower-1',
    type: 'property',
    name: 'Whiskers Tower',
    description: 'The tallest cat tree in town',
    emoji: '🐱',
    color: 'cattown-tower',
    value: 2,
    rent: [1, 2, 3],
    setSize: 3,
  },
  {
    id: 'cattown-tower-2',
    type: 'property',
    name: 'Purr Palace',
    description: 'Where cats reign supreme',
    emoji: '👑',
    color: 'cattown-tower',
    value: 2,
    rent: [1, 2, 3],
    setSize: 3,
  },
  {
    id: 'cattown-tower-3',
    type: 'property',
    name: 'Meow Manor',
    description: 'A cozy house for pampered cats',
    emoji: '🏠',
    color: 'cattown-tower',
    value: 2,
    rent: [1, 2, 3],
    setSize: 3,
  },

  // Hamster Hotel (Brown/Tan) - 3 cards needed
  {
    id: 'hamster-hotel-1',
    type: 'property',
    name: 'Hamster Hotel',
    description: 'Tiny rooms for tiny guests',
    emoji: '🐹',
    color: 'hamster-hotel',
    value: 2,
    rent: [1, 2, 3],
    setSize: 3,
  },
  {
    id: 'hamster-hotel-2',
    type: 'property',
    name: 'Wheel World',
    description: 'The best exercise wheels in town',
    emoji: '⚙️',
    color: 'hamster-hotel',
    value: 2,
    rent: [1, 2, 3],
    setSize: 3,
  },
  {
    id: 'hamster-hotel-3',
    type: 'property',
    name: 'Cheek Pouch Storage',
    description: 'Premium storage for hamster treasures',
    emoji: '🗄️',
    color: 'hamster-hotel',
    value: 2,
    rent: [1, 2, 3],
    setSize: 3,
  },

  // Bunny Burrow (Green) - 2 cards needed
  {
    id: 'bunny-burrow-1',
    type: 'property',
    name: 'Carrot Garden',
    description: 'Fresh carrots for hungry bunnies',
    emoji: '🥕',
    color: 'bunny-burrow',
    value: 3,
    rent: [2, 4],
    setSize: 2,
  },
  {
    id: 'bunny-burrow-2',
    type: 'property',
    name: 'Hop Hip Burrow',
    description: 'Underground luxury for rabbits',
    emoji: '🐰',
    color: 'bunny-burrow',
    value: 3,
    rent: [2, 4],
    setSize: 2,
  },

  // Fish Tank (Blue) - 2 cards needed
  {
    id: 'fish-tank-1',
    type: 'property',
    name: 'Bubble Boulevard',
    description: 'The finest aquarium in the city',
    emoji: '🐠',
    color: 'fish-tank',
    value: 3,
    rent: [2, 4],
    setSize: 2,
  },
  {
    id: 'fish-tank-2',
    type: 'property',
    name: 'Coral Castle',
    description: 'A majestic underwater palace',
    emoji: '🏰',
    color: 'fish-tank',
    value: 3,
    rent: [2, 4],
    setSize: 2,
  },
];

// Action cards with pet themes
export const actionCards: ActionCard[] = [
  // Rent cards
  {
    id: 'fetch-rent-1',
    type: 'action',
    name: 'Fetch Rent',
    description: 'Good boy! Time to collect rent from a property set',
    emoji: '🦴',
    actionType: 'fetch-rent',
    value: 1,
  },
  {
    id: 'fetch-rent-2',
    type: 'action',
    name: 'Fetch Rent',
    description: 'Good boy! Time to collect rent from a property set',
    emoji: '🦴',
    actionType: 'fetch-rent',
    value: 1,
  },

  // Steal property
  {
    id: 'steal-treat-1',
    type: 'action',
    name: 'Steal Treat',
    description: 'Sneakily take a property from another player',
    emoji: '🍖',
    actionType: 'steal-treat',
    value: 3,
  },
  {
    id: 'steal-treat-2',
    type: 'action',
    name: 'Steal Treat',
    description: 'Sneakily take a property from another player',
    emoji: '🍖',
    actionType: 'steal-treat',
    value: 3,
  },

  // Block actions
  {
    id: 'vet-visit-1',
    type: 'action',
    name: 'Vet Visit',
    description: 'Block any action card played against you',
    emoji: '🩺',
    actionType: 'vet-visit',
    value: 2,
  },
  {
    id: 'vet-visit-2',
    type: 'action',
    name: 'Vet Visit',
    description: 'Block any action card played against you',
    emoji: '🩺',
    actionType: 'vet-visit',
    value: 2,
  },

  // Property swap
  {
    id: 'playdate-1',
    type: 'action',
    name: 'Playdate',
    description: 'Swap properties with another player',
    emoji: '🤝',
    actionType: 'playdate',
    value: 3,
  },

  // Ultimate steal
  {
    id: 'pet-panic-1',
    type: 'action',
    name: 'Pet Panic!',
    description: 'Take any property from any player!',
    emoji: '😱',
    actionType: 'pet-panic',
    value: 5,
  },

  // Draw cards
  {
    id: 'birthday-party-1',
    type: 'action',
    name: 'Birthday Party',
    description: 'Draw 2 extra cards',
    emoji: '🎂',
    actionType: 'birthday-party',
    value: 2,
  },
  {
    id: 'birthday-party-2',
    type: 'action',
    name: 'Birthday Party',
    description: 'Draw 2 extra cards',
    emoji: '🎂',
    actionType: 'birthday-party',
    value: 2,
  },
];

// Money cards (pet toys and treats)
export const moneyCards: MoneyCard[] = [
  // 1M cards
  {
    id: 'kibble-1',
    type: 'money',
    name: 'Money',
    description: '1 Million pet dollars',
    emoji: '💰',
    value: 1,
  },
  {
    id: 'kibble-2',
    type: 'money',
    name: 'Money',
    description: '1 Million pet dollars',
    emoji: '💰',
    value: 1,
  },
  {
    id: 'kibble-3',
    type: 'money',
    name: 'Money',
    description: '1 Million pet dollars',
    emoji: '💰',
    value: 1,
  },
  {
    id: 'kibble-4',
    type: 'money',
    name: 'Money',
    description: '1 Million pet dollars',
    emoji: '💰',
    value: 1,
  },
  {
    id: 'kibble-5',
    type: 'money',
    name: 'Money',
    description: '1 Million pet dollars',
    emoji: '💰',
    value: 1,
  },
  
  // 2M cards
  {
    id: 'toy-ball-1',
    type: 'money',
    name: 'Money',
    description: '2 Million pet dollars',
    emoji: '💰',
    value: 2,
  },
  {
    id: 'toy-ball-2',
    type: 'money',
    name: 'Money',
    description: '2 Million pet dollars',
    emoji: '💰',
    value: 2,
  },
  {
    id: 'toy-ball-3',
    type: 'money',
    name: 'Money',
    description: '2 Million pet dollars',
    emoji: '💰',
    value: 2,
  },

  // 3M cards
  {
    id: 'premium-treats-1',
    type: 'money',
    name: 'Money',
    description: '3 Million pet dollars',
    emoji: '💰',
    value: 3,
  },
  {
    id: 'premium-treats-2',
    type: 'money',
    name: 'Money',
    description: '3 Million pet dollars',
    emoji: '💰',
    value: 3,
  },

  // 4M cards
  {
    id: 'luxury-bed-1',
    type: 'money',
    name: 'Money',
    description: '4 Million pet dollars',
    emoji: '💰',
    value: 4,
  },

  // 5M cards
  {
    id: 'golden-collar-1',
    type: 'money',
    name: 'Money',
    description: '5 Million pet dollars',
    emoji: '💰',
    value: 5,
  },
];

// Wild cards that can be multiple colors
export const wildCards: WildCard[] = [
  {
    id: 'bark-n-meow-1',
    type: 'wild',
    name: 'Bark \'n Meow',
    description: 'Can be used as Poodle Park or Cattown Tower',
    emoji: '🐕‍🦺',
    colors: ['poodle-park', 'cattown-tower'],
    value: 2,
  },
  {
    id: 'bark-n-meow-2',
    type: 'wild',
    name: 'Bark \'n Meow',
    description: 'Can be used as Poodle Park or Cattown Tower',
    emoji: '🐕‍🦺',
    colors: ['poodle-park', 'cattown-tower'],
    value: 2,
  },
  {
    id: 'small-pets-1',
    type: 'wild',
    name: 'Small Pets Combo',
    description: 'Can be used as Hamster Hotel or Bunny Burrow',
    emoji: '🐹',
    colors: ['hamster-hotel', 'bunny-burrow'],
    value: 2,
  },
  {
    id: 'aquatic-friends-1',
    type: 'wild',
    name: 'Aquatic Friends',
    description: 'Can be used as Fish Tank property',
    emoji: '🐠',
    colors: ['fish-tank'],
    value: 3,
  },
];

// Rent cards for specific property colors
export const rentCards: RentCard[] = [
  {
    id: 'poodle-cattown-rent-1',
    type: 'rent',
    name: 'Poodle & Cat Rent',
    description: 'Collect rent from Poodle Park or Cattown Tower',
    emoji: '💰',
    colors: ['poodle-park', 'cattown-tower'],
    value: 1,
  },
  {
    id: 'poodle-cattown-rent-2',
    type: 'rent',
    name: 'Poodle & Cat Rent',
    description: 'Collect rent from Poodle Park or Cattown Tower',
    emoji: '💰',
    colors: ['poodle-park', 'cattown-tower'],
    value: 1,
  },
  {
    id: 'small-pets-rent-1',
    type: 'rent',
    name: 'Small Pets Rent',
    description: 'Collect rent from Hamster Hotel or Bunny Burrow',
    emoji: '🪙',
    colors: ['hamster-hotel', 'bunny-burrow'],
    value: 1,
  },
  {
    id: 'aquatic-rent-1',
    type: 'rent',
    name: 'Aquatic Rent',
    description: 'Collect rent from Fish Tank',
    emoji: '💎',
    colors: ['fish-tank'],
    value: 1,
  },
];

// Color theme mapping for UI
export const colorThemes: Record<PropertyColor, { bg: string; border: string; text: string; accent: string; shadow: string }> = {
  'poodle-park': {
    bg: 'bg-gradient-to-br from-pink-400 to-pink-600',
    border: 'border-pink-800',
    text: 'text-white',
    accent: 'bg-pink-200',
    shadow: 'shadow-pink-500/30',
  },
  'cattown-tower': {
    bg: 'bg-gradient-to-br from-orange-400 to-orange-600',
    border: 'border-orange-800',
    text: 'text-white',
    accent: 'bg-orange-200',
    shadow: 'shadow-orange-500/30',
  },
  'hamster-hotel': {
    bg: 'bg-gradient-to-br from-amber-500 to-yellow-600',
    border: 'border-amber-800',
    text: 'text-white',
    accent: 'bg-amber-200',
    shadow: 'shadow-amber-500/30',
  },
  'bunny-burrow': {
    bg: 'bg-gradient-to-br from-green-500 to-green-700',
    border: 'border-green-900',
    text: 'text-white',
    accent: 'bg-green-200',
    shadow: 'shadow-green-500/30',
  },
  'fish-tank': {
    bg: 'bg-gradient-to-br from-blue-500 to-blue-700',
    border: 'border-blue-900',
    text: 'text-white',
    accent: 'bg-blue-200',
    shadow: 'shadow-blue-500/30',
  },
  'bird-cage': {
    bg: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    border: 'border-yellow-800',
    text: 'text-white',
    accent: 'bg-yellow-200',
    shadow: 'shadow-yellow-500/30',
  },
  'reptile-rock': {
    bg: 'bg-gradient-to-br from-gray-600 to-gray-800',
    border: 'border-gray-900',
    text: 'text-white',
    accent: 'bg-gray-200',
    shadow: 'shadow-gray-500/30',
  },
  'farm-friends': {
    bg: 'bg-gradient-to-br from-red-500 to-red-700',
    border: 'border-red-900',
    text: 'text-white',
    accent: 'bg-red-200',
    shadow: 'shadow-red-500/30',
  },
};

// Full deck creation
export const createDeck = (): Card[] => {
  return [
    ...propertyCards,
    ...actionCards,
    ...moneyCards,
    ...wildCards,
    ...rentCards,
  ];
};

// Shuffle function
export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}; 