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
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-gray-800">
          {title}
        </h2>
        <div className="text-sm text-gray-600">
          {cards.length} cards
          {selectedCards.length > 0 && (
            <span className="ml-2 text-blue-600">
              ({selectedCards.length} selected)
            </span>
          )}
        </div>
      </div>

      {/* Cards Container */}
      <div className="relative">
        <motion.div 
          className="flex gap-2 overflow-x-auto pb-4 px-1"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.05,
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              style={{ scrollSnapAlign: 'start' }}
              className="flex-shrink-0"
            >
              <Card
                card={card}
                selected={selectedCards.includes(card.id)}
                onClick={() => handleCardClick(card.id)}
                disabled={!isActive}
                size="medium"
              />
            </motion.div>
          ))}
          
          {/* Empty state */}
          {cards.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-32 flex items-center justify-center text-gray-500 text-center"
            >
              <div>
                <div className="text-4xl mb-2">🐾</div>
                <p>No cards in hand</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Scroll indicators */}
        {cards.length > 0 && (
          <div className="absolute top-0 right-0 bg-gradient-to-l from-white via-white to-transparent w-8 h-full pointer-events-none" />
        )}
      </div>

      {/* Action hints */}
      {isActive && cards.length > 0 && (
        <div className="mt-2 text-xs text-gray-500 text-center">
          {selectedCards.length === 0 ? (
            "Tap cards to select them for playing"
          ) : selectedCards.length < maxSelection ? (
            `Select up to ${maxSelection - selectedCards.length} more cards`
          ) : (
            "Maximum cards selected"
          )}
        </div>
      )}
    </div>
  );
}; 