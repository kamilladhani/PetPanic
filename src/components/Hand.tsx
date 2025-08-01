import { motion } from 'framer-motion';
import type { Card as CardType } from '../types/card';
import { Card } from './Card';

interface HandProps {
  cards: CardType[];
  selectedCards?: string[];
  onCardClick?: (cardId: string) => void;
  isActive?: boolean;
  title?: string;
  maxSelection?: number;
}

export const Hand: React.FC<HandProps> = ({
  cards,
  selectedCards = [],
  onCardClick,
  isActive = true,
  title = "Your Hand",
  maxSelection = 3,
}) => {
  const handleCardClick = (cardId: string) => {
    if (!isActive || !onCardClick) return;
    
    // Don't allow more selections than max
    if (!selectedCards.includes(cardId) && selectedCards.length >= maxSelection) {
      return;
    }
    
    onCardClick(cardId);
  };

  return (
    <div className="w-full">
      {/* Hand Title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {title}
        </h2>
        <div className="text-sm text-gray-600 bg-white/60 rounded-full px-3 py-1">
          <span className="font-semibold">{cards.length}</span>
          <span className="text-gray-500"> cards</span>
          {selectedCards.length > 0 && (
            <span className="ml-2 text-blue-600 font-bold">
              • {selectedCards.length} selected
            </span>
          )}
        </div>
      </div>

      {/* Cards Container */}
      <div className="relative">
        <motion.div 
          className="flex gap-3 overflow-x-auto pb-4 px-1 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.05,
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              style={{ scrollSnapAlign: 'start' }}
              className="flex-shrink-0 relative"
            >
              <Card
                card={card}
                selected={selectedCards.includes(card.id)}
                onClick={() => handleCardClick(card.id)}
                disabled={!isActive}
                size="medium"
              />
              
              {/* Selection indicator */}
              {selectedCards.includes(card.id) && (
                <motion.div
                  className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {selectedCards.indexOf(card.id) + 1}
                </motion.div>
              )}
            </motion.div>
          ))}
          
          {/* Empty state */}
          {cards.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-40 flex items-center justify-center text-gray-500 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300"
            >
              <div>
                <div className="text-5xl mb-3">🐾</div>
                <p className="text-lg font-medium">No cards in hand</p>
                <p className="text-sm text-gray-400">Draw some cards to get started!</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Scroll indicators */}
        {cards.length > 0 && (
          <>
            <div className="absolute top-0 right-0 bg-gradient-to-l from-white/80 via-white/60 to-transparent w-12 h-full pointer-events-none rounded-r-2xl" />
            <div className="absolute top-0 left-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent w-12 h-full pointer-events-none rounded-l-2xl" />
          </>
        )}
      </div>

      {/* Action hints */}
      {isActive && cards.length > 0 && (
        <motion.div 
          className="mt-3 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {selectedCards.length === 0 ? (
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm">
              💡 <span className="font-medium">Tap cards to select them for playing</span>
            </div>
          ) : selectedCards.length < maxSelection ? (
            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl text-sm">
              ✨ <span className="font-medium">Select {maxSelection - selectedCards.length} more cards</span> or play your current selection
            </div>
          ) : (
            <div className="bg-orange-50 text-orange-700 px-4 py-2 rounded-xl text-sm font-medium">
              🎯 <span className="font-medium">Maximum cards selected!</span> Ready to play
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}; 