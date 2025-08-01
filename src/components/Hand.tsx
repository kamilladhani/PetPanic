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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-gray-800 drop-shadow-sm">
          {title}
        </h2>
        <div className="text-sm text-gray-700 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl px-4 py-2 border-2 border-blue-200 shadow-lg">
          <span className="font-black">{cards.length}</span>
          <span className="text-gray-600 font-semibold"> cards</span>
          {selectedCards.length > 0 && (
            <span className="ml-2 text-blue-700 font-black">
              • {selectedCards.length} selected
            </span>
          )}
        </div>
      </div>

      {/* Cards Container */}
      <div className="relative">
        <motion.div 
          className="flex gap-3 overflow-x-auto pb-4 px-1 scrollbar-hide items-start"
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
              style={{ 
                scrollSnapAlign: 'start',
                width: '128px',
                minWidth: '128px',
                maxWidth: '128px'
              }}
              className="relative"
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
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {selectedCards.length === 0 ? (
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-6 py-3 rounded-2xl text-sm font-bold border-2 border-blue-300 shadow-lg">
              💡 <span className="font-black">Tap cards to play them instantly!</span>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-6 py-3 rounded-2xl text-sm font-bold border-2 border-green-300 shadow-lg">
              ✨ <span className="font-black">You can play {maxSelection - selectedCards.length} more cards this turn</span>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}; 