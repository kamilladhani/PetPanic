import { motion } from 'framer-motion';
import { useReducer, useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { createInitialGameState, gameReducer } from './lib/gameEngine';
import type { GameAction } from './types/game';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  
  // Initialize game state with default players for prototype
  const [gameState, dispatch] = useReducer(
    gameReducer,
    createInitialGameState(['You', 'AI Player 1', 'AI Player 2'])
  );

  // Debug logging
  console.log('🎮 Game State:', {
    phase: gameState.phase,
    currentPlayer: gameState.players[gameState.currentPlayerIndex].name,
    handSize: gameState.players[gameState.currentPlayerIndex].hand.length,
    cardsDrawn: gameState.cardsDrawn,
    cardsPlayed: gameState.cardsPlayed
  });





  // New single-card play functions for immediate play
  const handlePlaySingleCardToBank = (cardId: string) => {
    console.log('💰 Playing single card to bank:', cardId);
    const action: GameAction = {
      type: 'PLAY_CARD_TO_BANK',
      playerId: gameState.players[gameState.currentPlayerIndex].id,
      cardId,
    };
    dispatch(action);
  };

  const handlePlaySingleCardToProperty = (cardId: string) => {
    console.log('🏠 Playing single card to property:', cardId);
    const action: GameAction = {
      type: 'PLAY_CARD_TO_PROPERTY',
      playerId: gameState.players[gameState.currentPlayerIndex].id,
      cardId,
    };
    dispatch(action);
  };

  const handlePlaySingleActionCard = (cardId: string, asAction: boolean) => {
    console.log('⚡ Playing single action card:', cardId, 'as action:', asAction);
    if (asAction) {
      // TODO: Implement specific action logic
      handlePlaySingleCardToBank(cardId); // For now, treat as money
    } else {
      handlePlaySingleCardToBank(cardId);
    }
  };

  const handleDrawCards = () => {
    console.log('🎴 Draw button clicked - Phase:', gameState.phase, 'Cards drawn:', gameState.cardsDrawn);
    
    // Let the reducer handle all validation - no duplicate logic here
    const action: GameAction = {
      type: 'DRAW_CARDS',
      playerId: gameState.players[gameState.currentPlayerIndex].id,
    };
    
    dispatch(action);
  };

  const handleEndTurn = () => {
    console.log('🔄 Ending turn...');
    const action: GameAction = {
      type: 'END_TURN',
      playerId: gameState.players[gameState.currentPlayerIndex].id,
    };
    dispatch(action);
    setSelectedCards([]); // Clear selections for next player
  };

  const handleStartGame = () => {
    console.log('🚀 Starting game...');
    setGameStarted(true);
  };

  const handleNewGame = () => {
    console.log('🔄 Starting new game...');
    // Reset state by reloading page for prototype
    window.location.reload(); // Simple reset for prototype
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl">🐾</div>
          <div className="absolute top-20 right-20 text-4xl">🎮</div>
          <div className="absolute bottom-20 left-20 text-5xl">🃏</div>
          <div className="absolute bottom-10 right-10 text-3xl">⭐</div>
          <div className="absolute top-1/2 left-1/4 text-7xl">🎲</div>
          <div className="absolute top-1/3 right-1/3 text-4xl">🏆</div>
        </div>
        
        <motion.div
          className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center border-4 border-white/50 relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            className="text-8xl mb-6"
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            🐾
          </motion.div>
          
          <h1 className="text-5xl font-black text-gray-800 mb-4 drop-shadow-lg">
            PET PANIC!
          </h1>
          
          <p className="text-gray-700 mb-6 leading-relaxed font-semibold">
            A fun animal-themed card game! Collect 3 complete property sets to win. 
            Play with your favorite pets at Poodle Parks, Cattown Towers, Hamster Hotels, and more!
          </p>
          
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-8 text-sm text-gray-800 border-2 border-blue-200 shadow-lg">
            <h3 className="font-black mb-3 text-base">Quick Rules:</h3>
            <ul className="text-left space-y-2 font-semibold">
              <li>• Start with 5 cards</li>
              <li>• Draw 2 cards each turn (7 total)</li>
              <li>• Play up to 3 cards per turn</li>
              <li>• Build property sets by color</li>
              <li>• First to 3 complete sets wins!</li>
            </ul>
          </div>
          
          <motion.button
            onClick={handleStartGame}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black py-5 px-8 rounded-2xl transition-all duration-200 shadow-2xl hover:shadow-2xl hover:scale-110 border-4 border-blue-900 text-xl mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            START GAME 🎮
          </motion.button>
          
          <p className="text-xs text-gray-600 font-semibold">
            This is a working prototype with basic gameplay
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <GameBoard
        gameState={gameState}
        selectedCards={selectedCards}
        onDrawCards={handleDrawCards}
        onEndTurn={handleEndTurn}
        onPlaySingleCardToBank={handlePlaySingleCardToBank}
        onPlaySingleCardToProperty={handlePlaySingleCardToProperty}
        onPlaySingleActionCard={handlePlaySingleActionCard}
      />
      
      {/* New Game Button */}
      {gameState.winnerId && (
        <motion.div
          className="fixed bottom-4 right-4"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={handleNewGame}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black py-4 px-8 rounded-2xl transition-all duration-200 shadow-2xl hover:shadow-2xl hover:scale-110 border-4 border-blue-900"
            title="Start New Game"
          >
            🔄 New Game
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default App;
