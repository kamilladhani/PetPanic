import { motion } from 'framer-motion';
import type { Card as CardType } from '../types/card';
import type { GameState } from '../types/game';
import { Card } from './Card';
import { Hand } from './Hand';
import { PlayerZone } from './PlayerZone';

interface GameBoardProps {
  gameState: GameState;
  selectedCards: string[];
  onCardSelect: (cardId: string) => void;
  onPlayToBank: () => void;
  onPlayToProperty: () => void;
  onPlayAction: () => void;
  onDrawCards: () => void;
  onEndTurn: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  selectedCards,
  onCardSelect,
  onPlayToBank,
  onPlayToProperty,
  onPlayAction,
  onDrawCards,
  onEndTurn,
}) => {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const otherPlayers = gameState.players.filter((p) => p.id !== currentPlayer.id);
  
  const canDrawCards = gameState.phase === 'draw' && gameState.cardsDrawn < gameState.gameSettings.cardsPerTurnStart;
  const canPlayCards = gameState.phase === 'play' && selectedCards.length > 0 && gameState.cardsPlayed < gameState.gameSettings.maxCardsPerTurn;
  const canEndTurn = gameState.phase === 'play' && gameState.cardsDrawn >= gameState.gameSettings.cardsPerTurnStart;

  const getPhaseDescription = () => {
    switch (gameState.phase) {
      case 'draw':
        return `Draw ${gameState.gameSettings.cardsPerTurnStart - gameState.cardsDrawn} more cards`;
      case 'play':
        return `Play up to ${gameState.gameSettings.maxCardsPerTurn - gameState.cardsPlayed} more cards`;
      case 'end-turn':
        return 'Turn ending...';
      case 'action-resolution':
        return 'Resolving action...';
      case 'game-over':
        return 'Game Over!';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Game Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🐾 Pet Panic! 🐾
          </h1>
          <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
            <span>Turn: {currentPlayer.name}</span>
            <span>•</span>
            <span>{getPhaseDescription()}</span>
            <span>•</span>
            <span>Cards in deck: {gameState.deck.length}</span>
          </div>
        </motion.div>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Sidebar - Other Players (Desktop) */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800">Other Players</h2>
              {otherPlayers.map((player) => (
                <PlayerZone
                  key={player.id}
                  player={player}
                  isCurrentPlayer={false}
                  isActive={false}
                  compact={true}
                />
              ))}
            </div>
          </div>

          {/* Center - Main Game Area */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            
            {/* Deck and Discard */}
            <motion.div
              className="flex justify-center items-center gap-8 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {/* Deck */}
              <div className="text-center">
                <Card
                  card={{} as CardType}
                  showBack={true}
                  onClick={canDrawCards ? onDrawCards : undefined}
                  disabled={!canDrawCards}
                  size="large"
                />
                <p className="text-sm mt-2 text-gray-600">
                  Deck ({gameState.deck.length})
                </p>
              </div>

              {/* Discard Pile */}
              <div className="text-center">
                {gameState.discardPile.length > 0 ? (
                  <Card
                    card={gameState.discardPile[gameState.discardPile.length - 1]}
                    disabled={true}
                    size="large"
                  />
                ) : (
                  <div className="w-24 h-36 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                    <span className="text-xs">Empty</span>
                  </div>
                )}
                <p className="text-sm mt-2 text-gray-600">
                  Discard ({gameState.discardPile.length})
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={onDrawCards}
                disabled={!canDrawCards}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-all
                  ${canDrawCards 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                Draw Cards
              </button>

              <button
                onClick={onPlayToBank}
                disabled={!canPlayCards}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-all
                  ${canPlayCards 
                    ? 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                Play to Bank
              </button>

              <button
                onClick={onPlayToProperty}
                disabled={!canPlayCards}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-all
                  ${canPlayCards 
                    ? 'bg-purple-500 hover:bg-purple-600 text-white shadow-md hover:shadow-lg' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                Play as Property
              </button>

              <button
                onClick={onPlayAction}
                disabled={!canPlayCards}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-all
                  ${canPlayCards 
                    ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                Play Action
              </button>

              <button
                onClick={onEndTurn}
                disabled={!canEndTurn}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-all
                  ${canEndTurn 
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                End Turn
              </button>
            </motion.div>

            {/* Game Status */}
            {gameState.winnerId && (
              <motion.div
                className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 text-center mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h2 className="text-2xl font-bold text-yellow-800 mb-2">
                  🎉 Game Over! 🎉
                </h2>
                <p className="text-yellow-700">
                  {gameState.players.find(p => p.id === gameState.winnerId)?.name} wins!
                </p>
              </motion.div>
            )}
          </div>

          {/* Right Sidebar - Current Player Zone */}
          <div className="lg:col-span-1 order-3">
            <PlayerZone
              player={currentPlayer}
              isCurrentPlayer={true}
              isActive={gameState.phase !== 'game-over'}
              showHand={false}
            />
          </div>
        </div>

        {/* Bottom - Current Player's Hand */}
        <motion.div
          className="mt-8 bg-white/50 backdrop-blur-sm rounded-xl p-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Hand
            cards={currentPlayer.hand}
            selectedCards={selectedCards}
            onCardClick={onCardSelect}
            isActive={gameState.phase === 'play' && !gameState.winnerId}
            title={`${currentPlayer.name}'s Hand`}
            maxSelection={gameState.gameSettings.maxCardsPerTurn - gameState.cardsPlayed}
          />
        </motion.div>
      </div>
    </div>
  );
}; 