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

  const handleCardSelect = (cardId: string) => {
    setSelectedCards(prev => {
      if (prev.includes(cardId)) {
        return prev.filter(id => id !== cardId);
      } else {
        // Limit selection based on remaining cards that can be played
        const maxSelection = gameState.gameSettings.maxCardsPerTurn - gameState.cardsPlayed;
        if (prev.length >= maxSelection) {
          return prev;
        }
        return [...prev, cardId];
      }
    });
  };

  const handlePlayToBank = () => {
    if (selectedCards.length === 0) return;
    
    selectedCards.forEach(cardId => {
      const action: GameAction = {
        type: 'PLAY_CARD_TO_BANK',
        playerId: gameState.players[gameState.currentPlayerIndex].id,
        cardId,
      };
      dispatch(action);
    });
    
    setSelectedCards([]);
  };

  const handlePlayToProperty = () => {
    if (selectedCards.length === 0) return;
    
    selectedCards.forEach(cardId => {
      const action: GameAction = {
        type: 'PLAY_CARD_TO_PROPERTY',
        playerId: gameState.players[gameState.currentPlayerIndex].id,
        cardId,
      };
      dispatch(action);
    });
    
    setSelectedCards([]);
  };

  const handlePlayAction = () => {
    // For now, just treat action cards as money (play to bank)
    // TODO: Implement specific action logic
    handlePlayToBank();
  };

  const handleDrawCards = () => {
    const action: GameAction = {
      type: 'DRAW_CARDS',
      playerId: gameState.players[gameState.currentPlayerIndex].id,
    };
    dispatch(action);
  };

  const handleEndTurn = () => {
    const action: GameAction = {
      type: 'END_TURN',
      playerId: gameState.players[gameState.currentPlayerIndex].id,
    };
    dispatch(action);
    setSelectedCards([]); // Clear selections for next player
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleNewGame = () => {
    // Reset state by reloading page for prototype
    window.location.reload(); // Simple reset for prototype
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 flex items-center justify-center p-4">
        <motion.div
          className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            className="text-6xl mb-4"
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
          
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Pet Panic!
          </h1>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            A fun animal-themed card game! Collect 3 complete property sets to win. 
            Play with your favorite pets at Poodle Parks, Cattown Towers, Hamster Hotels, and more!
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-700">
            <h3 className="font-semibold mb-2">Quick Rules:</h3>
            <ul className="text-left space-y-1">
              <li>• Draw 2 cards each turn</li>
              <li>• Play up to 3 cards per turn</li>
              <li>• Build property sets by color</li>
              <li>• First to 3 complete sets wins!</li>
            </ul>
          </div>
          
          <motion.button
            onClick={handleStartGame}
            className="w-full btn-primary text-lg py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Game 🎮
          </motion.button>
          
          <p className="text-xs text-gray-500 mt-4">
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
        onCardSelect={handleCardSelect}
        onPlayToBank={handlePlayToBank}
        onPlayToProperty={handlePlayToProperty}
        onPlayAction={handlePlayAction}
        onDrawCards={handleDrawCards}
        onEndTurn={handleEndTurn}
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
            className="btn-primary"
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
