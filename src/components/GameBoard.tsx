import { motion } from 'framer-motion';
import { useState } from 'react';
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
  onPlaySingleCardToBank: (cardId: string) => void;
  onPlaySingleCardToProperty: (cardId: string) => void;
  onPlaySingleActionCard: (cardId: string, asAction: boolean) => void;
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
  onPlaySingleCardToBank,
  onPlaySingleCardToProperty,
  onPlaySingleActionCard,
}) => {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const otherPlayers = gameState.players.filter((p) => p.id !== currentPlayer.id);
  const [showActionChoice, setShowActionChoice] = useState<string | null>(null);
  const [playConfirmation, setPlayConfirmation] = useState<string | null>(null);
  
  const canDrawCards = gameState.phase === 'draw' && gameState.cardsDrawn < gameState.gameSettings.cardsPerTurnStart;
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

  // Handle automatic card playing when selected
  const handleCardPlay = (cardId: string) => {
    const card = currentPlayer.hand.find(c => c.id === cardId);
    if (!card) return;

    // Show confirmation
    setPlayConfirmation(`Played ${card.name}!`);
    setTimeout(() => setPlayConfirmation(null), 2000);

    // Use single-card functions to avoid selectedCards conflicts
    if (card.type === 'property') {
      // Property cards always go to property area
      onPlaySingleCardToProperty(cardId);
    } else if (card.type === 'money') {
      // Money cards always go to bank
      onPlaySingleCardToBank(cardId);
    } else if (card.type === 'action') {
      // Action cards - ask user
      setShowActionChoice(cardId);
    } else {
      // Wild cards, rent cards - default to property for now
      onPlaySingleCardToProperty(cardId);
    }
  };

  // Enhanced card select that includes automatic playing
  const handleEnhancedCardSelect = (cardId: string) => {
    console.log('🎯 Card selected:', cardId, 'Phase:', gameState.phase, 'Cards played:', gameState.cardsPlayed);
    
    if (gameState.phase !== 'play') {
      console.log('❌ Not in play phase');
      return;
    }
    if (gameState.cardsPlayed >= gameState.gameSettings.maxCardsPerTurn) {
      console.log('❌ Max cards played');
      return;
    }
    
    // Don't allow selecting already selected cards
    if (selectedCards.includes(cardId)) {
      console.log('❌ Card already selected');
      return;
    }
    
    console.log('✅ Playing card:', cardId);
    
    // DON'T add to selectedCards for immediate play - just play the card
    handleCardPlay(cardId);
  };

  const handleActionChoice = (cardId: string, asAction: boolean) => {
    setShowActionChoice(null);
    onPlaySingleActionCard(cardId, asAction);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl">🐾</div>
        <div className="absolute top-20 right-20 text-4xl">🎮</div>
        <div className="absolute bottom-20 left-20 text-5xl">🃏</div>
        <div className="absolute bottom-10 right-10 text-3xl">⭐</div>
        <div className="absolute top-1/2 left-1/4 text-7xl">🎲</div>
        <div className="absolute top-1/3 right-1/3 text-4xl">🏆</div>
      </div>
      
      {/* Around the Table Layout */}
      <div className="h-screen flex flex-col relative z-10">
        
        {/* Game Header - Fixed to not overlap */}
        <motion.div
          className="text-center py-2 relative z-30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.h1 
            className="text-2xl md:text-3xl font-black text-white mb-1 drop-shadow-2xl"
            animate={{ 
              textShadow: [
                '0 0 20px rgba(255,255,255,0.5)',
                '0 0 30px rgba(59,130,246,0.8)',
                '0 0 20px rgba(255,255,255,0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '400% 400%',
              animation: 'gradient 3s ease infinite'
            }}
          >
            🐾 PET PANIC! 🐾
          </motion.h1>
        </motion.div>

        {/* Top Player */}
        {otherPlayers[0] && (
          <motion.div
            className="absolute top-12 left-1/2 transform -translate-x-1/2 w-80 z-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <PlayerZone
              player={otherPlayers[0]}
              isCurrentPlayer={false}
              isActive={false}
              compact={true}
            />
          </motion.div>
        )}

        {/* Left Player */}
        {otherPlayers[1] && (
          <motion.div
            className="absolute left-4 top-1/4 w-64 z-20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <PlayerZone
              player={otherPlayers[1]}
              isCurrentPlayer={false}
              isActive={false}
              compact={true}
            />
          </motion.div>
        )}

        {/* Center Game Area - Simplified */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <motion.div
            className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-white/70 max-w-2xl w-full mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Game Status Bar */}
            <motion.div 
              className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl px-4 py-3 shadow-lg border-2 border-blue-200 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 text-sm text-gray-800">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-700">Current Player:</span>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full font-black shadow-lg text-xs">
                    {currentPlayer.avatar} {currentPlayer.name}
                  </span>
                </div>
                <div className="hidden md:block text-gray-400 text-xl">•</div>
                <div className="text-center font-semibold text-gray-700 text-xs">
                  {getPhaseDescription()}
                </div>
                <div className="hidden md:block text-gray-400 text-xl">•</div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-700">Deck:</span>
                  <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-2 py-1 rounded-full font-black shadow-lg text-xs">
                    {gameState.deck.length}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Deck and Discard */}
            <motion.div
              className="flex justify-center items-center gap-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              {/* Deck */}
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Card
                    card={{} as CardType}
                    showBack={true}
                    onClick={canDrawCards ? onDrawCards : undefined}
                    disabled={!canDrawCards}
                    size="medium"
                  />
                  {/* Deck depth effect */}
                  <div className="absolute -top-1 -left-1 w-24 h-36 bg-gray-600 rounded-xl -z-10 opacity-60"></div>
                  <div className="absolute -top-2 -left-2 w-24 h-36 bg-gray-700 rounded-xl -z-20 opacity-40"></div>
                </motion.div>
                <p className="text-xs mt-2 text-gray-800 font-black">
                  DRAW PILE ({gameState.deck.length})
                </p>
                {canDrawCards && (
                  <motion.p 
                    className="text-xs text-blue-600 font-black"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    👆 CLICK TO DRAW!
                  </motion.p>
                )}
              </div>

              {/* VS Divider */}
              <div className="text-4xl font-black text-gray-700">⚡</div>

              {/* Discard Pile */}
              <div className="text-center">
                {gameState.discardPile.length > 0 ? (
                  <div className="relative">
                    <Card
                      card={gameState.discardPile[gameState.discardPile.length - 1]}
                      disabled={true}
                      size="medium"
                    />
                    {/* Discard pile depth effect */}
                    <div className="absolute -top-1 -right-1 w-24 h-36 bg-gray-400 rounded-xl -z-10 opacity-50"></div>
                  </div>
                ) : (
                  <div className="w-24 h-36 border-4 border-dashed border-gray-400 rounded-xl flex items-center justify-center text-gray-600 bg-gray-100">
                    <div className="text-center">
                      <div className="text-2xl mb-1">🗑️</div>
                      <span className="text-xs font-bold">EMPTY</span>
                    </div>
                  </div>
                )}
                <p className="text-xs mt-2 text-gray-800 font-black">
                  DISCARD PILE ({gameState.discardPile.length})
                </p>
              </div>
            </motion.div>

            {/* Game Status */}
            {gameState.winnerId && (
              <motion.div
                className="bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-400 rounded-2xl p-4 text-center shadow-2xl mt-4"
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.h2 
                  className="text-2xl font-bold text-yellow-800 mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🎉 Game Over! 🎉
                </motion.h2>
                <p className="text-lg text-yellow-700 font-semibold">
                  {gameState.players.find(p => p.id === gameState.winnerId)?.name} wins with 3 complete sets!
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Current Player Area - IN FRONT OF PLAYER (Bottom) */}
        <motion.div
          className="bg-white/95 backdrop-blur-md border-t-4 border-white/70 px-4 py-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {/* Current Player Status and Actions - Above Hand */}
          <div className="flex justify-between items-center mb-4">
            {/* Current Player Info */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <PlayerZone
                player={currentPlayer}
                isCurrentPlayer={true}
                isActive={gameState.phase !== 'game-over'}
                showHand={false}
                compact={true}
              />
            </motion.div>

            {/* Current Player Action Buttons */}
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={onDrawCards}
                disabled={!canDrawCards}
                className={`
                  px-4 py-3 rounded-xl font-black transition-all shadow-lg text-sm border-3
                  ${canDrawCards 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-blue-900 hover:shadow-xl hover:scale-105' 
                    : 'bg-gray-400 text-gray-700 cursor-not-allowed border-gray-600'
                  }
                `}
                whileHover={canDrawCards ? { scale: 1.05 } : {}}
                whileTap={canDrawCards ? { scale: 0.95 } : {}}
              >
                🎴 DRAW CARDS
              </motion.button>

              <motion.button
                onClick={onEndTurn}
                disabled={!canEndTurn}
                className={`
                  px-4 py-3 rounded-xl font-black transition-all shadow-lg text-sm border-3
                  ${canEndTurn 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-red-900 hover:shadow-xl hover:scale-105' 
                    : 'bg-gray-400 text-gray-700 cursor-not-allowed border-gray-600'
                  }
                `}
                whileHover={canEndTurn ? { scale: 1.05 } : {}}
                whileTap={canEndTurn ? { scale: 0.95 } : {}}
              >
                🔄 END TURN
              </motion.button>
            </motion.div>
          </div>

          {/* Played Cards Display Area - CENTER IN FRONT OF PLAYER */}
          {selectedCards.length > 0 && (
            <motion.div
              className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border-2 border-blue-200 shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-lg font-black text-gray-800 mb-3 text-center">
                🎯 Cards Being Played This Turn
              </h3>
              <div className="flex justify-center gap-3 flex-wrap">
                {selectedCards.map((cardId) => {
                  const card = currentPlayer.hand.find(c => c.id === cardId);
                  if (!card) return null;
                  return (
                    <motion.div
                      key={cardId}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="relative"
                    >
                      <Card
                        card={card}
                        selected={false}
                        disabled={true}
                        size="medium"
                      />
                      {/* Played indicator */}
                      <motion.div
                        className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                      >
                        ✓
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Play status */}
              <motion.div
                className="mt-3 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-4 py-2 rounded-xl text-sm font-bold border-2 border-green-300 shadow-sm inline-block">
                  ✨ {selectedCards.length} card{selectedCards.length !== 1 ? 's' : ''} played • {gameState.gameSettings.maxCardsPerTurn - gameState.cardsPlayed} remaining this turn
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Current Player's Hand */}
          <Hand
            cards={currentPlayer.hand}
            selectedCards={selectedCards}
            onCardClick={handleEnhancedCardSelect}
            isActive={gameState.phase === 'play' && !gameState.winnerId}
            title={`${currentPlayer.name}'s Hand`}
            maxSelection={gameState.gameSettings.maxCardsPerTurn - gameState.cardsPlayed}
          />
        </motion.div>
      </div>

      {/* Action Choice Modal for Action Cards */}
      {showActionChoice && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl border-4 border-blue-500"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-2xl font-black text-gray-800 mb-4 text-center">
              How do you want to play this Action Card?
            </h3>
            <div className="flex gap-4">
              <motion.button
                onClick={() => handleActionChoice(showActionChoice, true)}
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-lg border-3 border-purple-900"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ⚡ AS ACTION
              </motion.button>
              <motion.button
                onClick={() => handleActionChoice(showActionChoice, false)}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-lg border-3 border-green-900"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                💰 AS MONEY
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Play Confirmation Toast */}
      {playConfirmation && (
        <motion.div
          className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl border-3 border-green-800 font-black z-50"
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          ✅ {playConfirmation}
        </motion.div>
      )}
    </div>
  );
}; 