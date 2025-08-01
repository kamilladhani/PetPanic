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
        return `Draw ${gameState.gameSettings.cardsPerTurnStart - gameState.cardsDrawn} more cards to continue`;
      case 'play':
        return `You can play ${gameState.gameSettings.maxCardsPerTurn - gameState.cardsPlayed} more cards this turn`;
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-sky-50 to-violet-100 p-2 md:p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Game Header */}
        <motion.div
          className="text-center mb-4 md:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.h1 
            className="text-3xl md:text-5xl font-bold text-gray-800 mb-2"
            animate={{ 
              textShadow: [
                '0 0 10px rgba(0,0,0,0.1)',
                '0 0 20px rgba(59,130,246,0.3)',
                '0 0 10px rgba(0,0,0,0.1)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🐾 Pet Panic! 🐾
          </motion.h1>
          
          {/* Game Status Bar */}
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-white/50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Current Player:</span>
                <span className="bg-blue-100 px-3 py-1 rounded-full font-bold text-blue-800">
                  {currentPlayer.avatar} {currentPlayer.name}
                </span>
              </div>
              <div className="hidden md:block text-gray-400">•</div>
              <div className="text-center">
                <span className="font-medium">{getPhaseDescription()}</span>
              </div>
              <div className="hidden md:block text-gray-400">•</div>
              <div className="flex items-center gap-2">
                <span>Cards in deck:</span>
                <span className="bg-purple-100 px-2 py-1 rounded-full font-bold text-purple-800">
                  {gameState.deck.length}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 md:gap-6">
          
          {/* Left Sidebar - Other Players */}
          <div className="xl:col-span-1 order-2 xl:order-1">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-lg font-bold text-gray-800 text-center xl:text-left">Other Players</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4">
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
            </motion.div>
          </div>

          {/* Center - Main Game Area */}
          <div className="xl:col-span-2 order-1 xl:order-2">
            
            {/* Deck and Discard */}
            <motion.div
              className="flex justify-center items-center gap-6 md:gap-12 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              {/* Deck */}
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card
                    card={{} as CardType}
                    showBack={true}
                    onClick={canDrawCards ? onDrawCards : undefined}
                    disabled={!canDrawCards}
                    size="large"
                  />
                </motion.div>
                <p className="text-sm mt-2 text-gray-700 font-medium">
                  Draw Pile ({gameState.deck.length})
                </p>
                {canDrawCards && (
                  <motion.p 
                    className="text-xs text-blue-600 font-semibold"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    Click to draw!
                  </motion.p>
                )}
              </div>

              {/* VS Divider */}
              <div className="text-3xl font-bold text-gray-400">⚡</div>

              {/* Discard Pile */}
              <div className="text-center">
                {gameState.discardPile.length > 0 ? (
                  <Card
                    card={gameState.discardPile[gameState.discardPile.length - 1]}
                    disabled={true}
                    size="large"
                  />
                ) : (
                  <div className="w-28 h-40 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 bg-gray-50/50">
                    <div className="text-center">
                      <div className="text-2xl mb-1">🗑️</div>
                      <span className="text-xs">Empty</span>
                    </div>
                  </div>
                )}
                <p className="text-sm mt-2 text-gray-700 font-medium">
                  Discard Pile ({gameState.discardPile.length})
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={onDrawCards}
                disabled={!canDrawCards}
                className={`
                  px-4 py-3 rounded-xl font-bold transition-all shadow-lg text-sm md:text-base
                  ${canDrawCards 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-200 hover:shadow-xl hover:scale-105' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }
                `}
                whileHover={canDrawCards ? { scale: 1.05 } : {}}
                whileTap={canDrawCards ? { scale: 0.95 } : {}}
              >
                🎴 Draw Cards
              </motion.button>

              <motion.button
                onClick={onPlayToBank}
                disabled={!canPlayCards}
                className={`
                  px-4 py-3 rounded-xl font-bold transition-all shadow-lg text-sm md:text-base
                  ${canPlayCards 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-green-200 hover:shadow-xl hover:scale-105' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }
                `}
                whileHover={canPlayCards ? { scale: 1.05 } : {}}
                whileTap={canPlayCards ? { scale: 0.95 } : {}}
              >
                💰 Play to Bank
              </motion.button>

              <motion.button
                onClick={onPlayToProperty}
                disabled={!canPlayCards}
                className={`
                  px-4 py-3 rounded-xl font-bold transition-all shadow-lg text-sm md:text-base
                  ${canPlayCards 
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-purple-200 hover:shadow-xl hover:scale-105' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }
                `}
                whileHover={canPlayCards ? { scale: 1.05 } : {}}
                whileTap={canPlayCards ? { scale: 0.95 } : {}}
              >
                🏠 Play Property
              </motion.button>

              <motion.button
                onClick={onPlayAction}
                disabled={!canPlayCards}
                className={`
                  px-4 py-3 rounded-xl font-bold transition-all shadow-lg text-sm md:text-base
                  ${canPlayCards 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-orange-200 hover:shadow-xl hover:scale-105' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }
                `}
                whileHover={canPlayCards ? { scale: 1.05 } : {}}
                whileTap={canPlayCards ? { scale: 0.95 } : {}}
              >
                ⚡ Play Action
              </motion.button>

              <motion.button
                onClick={onEndTurn}
                disabled={!canEndTurn}
                className={`
                  col-span-2 md:col-span-1 px-6 py-3 rounded-xl font-bold transition-all shadow-lg text-sm md:text-base
                  ${canEndTurn 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-200 hover:shadow-xl hover:scale-105' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }
                `}
                whileHover={canEndTurn ? { scale: 1.05 } : {}}
                whileTap={canEndTurn ? { scale: 0.95 } : {}}
              >
                🔄 End Turn
              </motion.button>
            </motion.div>

            {/* Game Status */}
            {gameState.winnerId && (
              <motion.div
                className="bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-400 rounded-2xl p-6 text-center mb-6 shadow-2xl"
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.h2 
                  className="text-3xl font-bold text-yellow-800 mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🎉 Game Over! 🎉
                </motion.h2>
                <p className="text-xl text-yellow-700 font-semibold">
                  {gameState.players.find(p => p.id === gameState.winnerId)?.name} wins with 3 complete sets!
                </p>
              </motion.div>
            )}
          </div>

          {/* Right Sidebar - Current Player Zone */}
          <div className="xl:col-span-1 order-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <PlayerZone
                player={currentPlayer}
                isCurrentPlayer={true}
                isActive={gameState.phase !== 'game-over'}
                showHand={false}
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom - Current Player's Hand */}
        <motion.div
          className="mt-6 bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
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