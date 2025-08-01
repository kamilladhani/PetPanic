export type CardType = 'property' | 'action' | 'money' | 'wild' | 'rent';

export type PropertyColor = 
  | 'poodle-park'     // Light pink/purple theme
  | 'cattown-tower'   // Orange/yellow theme  
  | 'hamster-hotel'   // Brown/tan theme
  | 'bunny-burrow'    // Green theme
  | 'fish-tank'       // Blue theme
  | 'bird-cage'       // Yellow theme
  | 'reptile-rock'    // Gray theme
  | 'farm-friends';   // Red theme

export type ActionType = 
  | 'fetch-rent'      // Rent card
  | 'steal-treat'     // Steal property
  | 'vet-visit'       // Block action
  | 'playdate'        // Swap properties
  | 'pet-panic'       // Ultimate steal (like sly deal)
  | 'birthday-party'  // Draw cards
  | 'grooming-day'    // Discard cards
  | 'adoption-fee';   // Pay money

export interface BaseCard {
  id: string;
  name: string;
  description: string;
  image?: string;
  emoji: string;
}

export interface PropertyCard extends BaseCard {
  type: 'property';
  color: PropertyColor;
  value: number;
  rent: number[];  // Rent for 1, 2, 3+ properties
  setSize: number; // Number needed for complete set
}

export interface ActionCard extends BaseCard {
  type: 'action';
  actionType: ActionType;
  value: number; // Money value if used as money
}

export interface MoneyCard extends BaseCard {
  type: 'money';
  value: number;
}

export interface WildCard extends BaseCard {
  type: 'wild';
  colors: PropertyColor[]; // Can be used as these colors
  value: number;
}

export interface RentCard extends BaseCard {
  type: 'rent';
  colors: PropertyColor[]; // Which property colors this applies to
  value: number; // Money value if used as money
}

export type Card = PropertyCard | ActionCard | MoneyCard | WildCard | RentCard;

export interface CardInHand {
  card: Card;
  selected?: boolean;
}

export interface PropertySet {
  color: PropertyColor;
  cards: (PropertyCard | WildCard)[];
  isComplete: boolean;
  totalRent: number;
} 