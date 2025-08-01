import type { Card, PropertyCard, PropertyColor, PropertySet, WildCard } from '../types/card';
import type { GameAction, GameState, Player } from '../types/game';
import { createDeck, shuffleDeck } from './cardData';

// Initialize a new game state
export const createInitialGameState = (playerNames: string[]): GameState => {
  const deck = shuffleDeck(createDeck());
  const players: Player[] = playerNames.map((name, index) => ({
    id: `player-${index}`,
    name,
    hand: [],
    bank: [],
    properties: [],
    completedSets: 0,
    isActive: index === 0,
    avatar: ['🐶', '🐱', '🐹', '🐰', '🐠'][index] || '🐾',
  }));

  // Deal initial hands (5 cards each, then draw 2 at start of each turn)
  players.forEach((player) => {
    for (let i = 0; i < 5; i++) {
      const card = deck.pop();
      if (card) {
        player.hand.push(card);
      }
    }
  });

  return {
    id: `game-${Date.now()}`,
    players,
    currentPlayerIndex: 0,
    phase: 'draw',
    deck,
    discardPile: [],
    actionStack: {
      actions: [],
      canBlock: false,
    },
    cardsPlayed: 0,
    cardsDrawn: 0,
    gameStarted: true,
    gameSettings: {
      maxPlayers: 4,
      setsToWin: 3,
      maxCardsPerTurn: 3,
      cardsPerTurnStart: 2,
    },
  };
};

// Helper function to find a card in player's hand
export const findCardInHand = (player: Player, cardId: string): Card | undefined => {
  return player.hand.find(card => card.id === cardId);
};

// Helper function to remove card from hand
export const removeCardFromHand = (player: Player, cardId: string): Card | undefined => {
  const cardIndex = player.hand.findIndex(card => card.id === cardId);
  if (cardIndex >= 0) {
    return player.hand.splice(cardIndex, 1)[0];
  }
  return undefined;
};

// Helper function to organize properties into sets
export const organizePropertiesByColor = (properties: (PropertyCard | WildCard)[]): PropertySet[] => {
  const colorGroups: Record<PropertyColor, (PropertyCard | WildCard)[]> = {} as Record<PropertyColor, (PropertyCard | WildCard)[]>;
  
  properties.forEach(card => {
    if (card.type === 'property') {
      if (!colorGroups[card.color]) {
        colorGroups[card.color] = [];
      }
      colorGroups[card.color].push(card);
    } else if (card.type === 'wild') {
      // For wild cards, we need to assign them to the best color group
      // For now, assign to the first available color
      const availableColor = card.colors[0];
      if (!colorGroups[availableColor]) {
        colorGroups[availableColor] = [];
      }
      colorGroups[availableColor].push(card);
    }
  });

  return Object.entries(colorGroups).map(([color, cards]) => {
    const propertyColor = color as PropertyColor;
    const propertyCards = cards.filter(c => c.type === 'property') as PropertyCard[];
    const setSize = propertyCards.length > 0 ? propertyCards[0].setSize : 3;
    const isComplete = cards.length >= setSize;
    
    // Calculate rent based on number of properties
    let totalRent = 0;
    if (propertyCards.length > 0) {
      const rentArray = propertyCards[0].rent;
      const rentIndex = Math.min(cards.length - 1, rentArray.length - 1);
      totalRent = rentArray[rentIndex] || 0;
    }

    return {
      color: propertyColor,
      cards,
      isComplete,
      totalRent,
    };
  });
};

// Update player's property sets
export const updatePlayerProperties = (player: Player): void => {
  const allPropertyCards = player.properties.flatMap(set => set.cards);
  player.properties = organizePropertiesByColor(allPropertyCards);
  player.completedSets = player.properties.filter(set => set.isComplete).length;
};

// Game action handlers
export const gameReducer = (state: GameState, action: GameAction): GameState => {
  console.log('🔄 gameReducer called with action:', action.type, 'Current state cardsDrawn:', state.cardsDrawn);
  const newState = { ...state };
  const currentPlayer = newState.players[newState.currentPlayerIndex];

  switch (action.type) {
    case 'DRAW_CARDS': {
      console.log('🎴 DRAW_CARDS - Phase:', newState.phase, 'Already drawn:', newState.cardsDrawn, 'Hand:', currentPlayer.hand.length);
      
      // Must be in draw phase - this should be the ONLY check needed
      if (newState.phase !== 'draw') {
        console.log('❌ Not in draw phase');
        return state;
      }

      // Draw exactly the number of cards needed to complete the draw phase
      const cardsStillNeeded = newState.gameSettings.cardsPerTurnStart - newState.cardsDrawn;
      const cardsToDraw = Math.min(cardsStillNeeded, newState.deck.length);
      
      if (cardsToDraw <= 0) {
        console.log('⚠️ No cards available to draw');
        return state;
      }
      
      // Draw cards
      for (let i = 0; i < cardsToDraw; i++) {
        const card = newState.deck.pop();
        if (card) {
          currentPlayer.hand.push(card);
          newState.cardsDrawn++;
        }
      }

      console.log('✅ Drew', cardsToDraw, 'cards - New hand size:', currentPlayer.hand.length, 'Total drawn:', newState.cardsDrawn);

      // CRITICAL: Change phase IMMEDIATELY after drawing to block further draws
      newState.phase = 'play';
      console.log('🎯 Phase → play (drawing complete)');

      return newState;
    }

    case 'PLAY_CARD_TO_BANK': {
      if (newState.phase !== 'play' || newState.cardsPlayed >= newState.gameSettings.maxCardsPerTurn) {
        return state;
      }

      const cardId = action.cardId;
      if (!cardId) return state;

      const card = removeCardFromHand(currentPlayer, cardId);
      if (card) {
        currentPlayer.bank.push(card);
        newState.cardsPlayed++;
      }

      return newState;
    }

    case 'PLAY_CARD_TO_PROPERTY': {
      if (newState.phase !== 'play' || newState.cardsPlayed >= newState.gameSettings.maxCardsPerTurn) {
        return state;
      }

      const cardId = action.cardId;
      if (!cardId) return state;

      const card = removeCardFromHand(currentPlayer, cardId);
      if (card && (card.type === 'property' || card.type === 'wild')) {
        // Add to properties - the organizing will happen in updatePlayerProperties
        const existingSet = currentPlayer.properties.find(set => 
          card.type === 'property' ? set.color === card.color : 
          card.type === 'wild' ? card.colors.includes(set.color) : false
        );

        if (existingSet) {
          existingSet.cards.push(card as PropertyCard | WildCard);
        } else if (card.type === 'property') {
          currentPlayer.properties.push({
            color: card.color,
            cards: [card],
            isComplete: false,
            totalRent: 0,
          });
        } else if (card.type === 'wild') {
          // Create new set with wild card using first available color
          currentPlayer.properties.push({
            color: card.colors[0],
            cards: [card],
            isComplete: false,
            totalRent: 0,
          });
        }

        updatePlayerProperties(currentPlayer);
        newState.cardsPlayed++;
      }

      return newState;
    }

    case 'END_TURN': {
      if (newState.phase !== 'play' || newState.cardsDrawn < newState.gameSettings.cardsPerTurnStart) {
        return state;
      }

      // Check for win condition
      if (currentPlayer.completedSets >= newState.gameSettings.setsToWin) {
        newState.winnerId = currentPlayer.id;
        newState.phase = 'game-over';
        return newState;
      }

      // Move to next player
      newState.currentPlayerIndex = (newState.currentPlayerIndex + 1) % newState.players.length;
      newState.players.forEach((player, index) => {
        player.isActive = index === newState.currentPlayerIndex;
      });

      // Reset turn counters
      newState.cardsPlayed = 0;
      newState.cardsDrawn = 0;
      newState.phase = 'draw';

      return newState;
    }

    case 'SELECT_CARD':
    case 'DESELECT_CARD':
      // These are handled by the component state, not game state
      return state;

    default:
      return state;
  }
};

// Helper functions for game logic
export const canPlayCard = (state: GameState, cardId: string): boolean => {
  if (state.phase !== 'play' || state.cardsPlayed >= state.gameSettings.maxCardsPerTurn) {
    return false;
  }

  const currentPlayer = state.players[state.currentPlayerIndex];
  const card = findCardInHand(currentPlayer, cardId);
  return !!card;
};

export const canEndTurn = (state: GameState): boolean => {
  return state.phase === 'play' && state.cardsDrawn >= state.gameSettings.cardsPerTurnStart;
};

export const getTotalBankValue = (player: Player): number => {
  return player.bank.reduce((total, card) => total + card.value, 0);
}; 