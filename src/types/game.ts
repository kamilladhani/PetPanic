import type { Card, PropertySet } from './card';

export type GamePhase = 'draw' | 'play' | 'end-turn' | 'action-resolution' | 'game-over';

export interface Player {
  id: string;
  name: string;
  hand: Card[];
  bank: Card[]; // Money cards and action cards used as money
  properties: PropertySet[];
  completedSets: number;
  isActive: boolean;
  avatar?: string;
}

export interface GameAction {
  type: string;
  playerId: string;
  targetPlayerId?: string;
  cardId?: string;
  propertyColor?: string;
  data?: Record<string, unknown>;
}

export interface ActionStack {
  actions: GameAction[];
  currentAction?: GameAction;
  canBlock: boolean;
  blockingPlayerId?: string;
}

export interface GameState {
  id: string;
  players: Player[];
  currentPlayerIndex: number;
  phase: GamePhase;
  deck: Card[];
  discardPile: Card[];
  actionStack: ActionStack;
  cardsPlayed: number; // Max 3 per turn
  cardsDrawn: number;  // 2 per turn start
  winnerId?: string;
  gameStarted: boolean;
  gameSettings: {
    maxPlayers: number;
    setsToWin: number;
    maxCardsPerTurn: number;
    cardsPerTurnStart: number;
  };
}

export interface GameContextType {
  gameState: GameState;
  dispatch: (action: GameAction) => void;
  // Helper functions
  currentPlayer: Player;
  isCurrentPlayer: (playerId: string) => boolean;
  canPlayCard: (cardId: string) => boolean;
  canEndTurn: () => boolean;
  getPlayerPropertySets: (playerId: string) => PropertySet[];
  getTotalBankValue: (playerId: string) => number;
}

// Action types for game state management
export type GameActionType = 
  | 'START_GAME'
  | 'DRAW_CARDS'
  | 'PLAY_CARD_TO_BANK'
  | 'PLAY_CARD_TO_PROPERTY'
  | 'PLAY_ACTION_CARD'
  | 'END_TURN'
  | 'NEXT_PLAYER'
  | 'RESOLVE_ACTION'
  | 'BLOCK_ACTION'
  | 'SELECT_CARD'
  | 'DESELECT_CARD'
  | 'GAME_OVER';

export interface GameEvent {
  type: GameActionType;
  payload?: Record<string, unknown>;
} 