import { motion } from 'framer-motion';
import { colorThemes } from '../lib/cardData';
import type { Card as CardType, PropertySet } from '../types/card';
import type { Player } from '../types/game';
import { Card } from './Card';

interface PlayerZoneProps {
  player: Player;
  isCurrentPlayer: boolean;
  isActive: boolean;
  showHand?: boolean;
  compact?: boolean;
}

export const PlayerZone: React.FC<PlayerZoneProps> = ({
  player,
  isCurrentPlayer = false,
  isActive = true,
  compact = false,
  showHand = true,
}) => {
  const getBankValue = () => {
    return player.bank.reduce((total, card) => total + card.value, 0);
  };

  const PropertySetDisplay: React.FC<{ propertySet: PropertySet }> = ({ propertySet }) => {
    const theme = colorThemes[propertySet.color];
    
    return (
      <motion.div
        className={`
          ${theme.bg} ${theme.border} ${theme.text}
          border-2 rounded-lg p-2 min-w-fit
          ${propertySet.isComplete ? 'ring-2 ring-yellow-400 shadow-lg' : ''}
        `}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center gap-1 mb-1">
          <span className="text-xs font-bold">
            {propertySet.color.replace('-', ' ').toUpperCase()}
          </span>
          {propertySet.isComplete && (
            <span className="text-yellow-600">✨</span>
          )}
        </div>
        
        <div className="flex gap-1">
          {propertySet.cards.map((card: PropertySet['cards'][0]) => (
            <Card
              key={card.id}
              card={card}
              size="medium"
              disabled={true}
            />
          ))}
        </div>
        
        <div className="text-xs mt-1 font-medium">
          Rent: {propertySet.totalRent}M
        </div>
      </motion.div>
    );
  };

  const getCompleteSets = (properties: PropertySet[]) => {
    return properties.filter(set => set.isComplete);
  };

  const completeSets = getCompleteSets(player.properties);
  
  return (
    <motion.div
      className={`
        ${compact ? 'p-4' : 'p-6'} 
        ${isCurrentPlayer 
          ? 'bg-gradient-to-br from-blue-200 via-white to-purple-200 border-4 border-blue-500 shadow-2xl shadow-blue-500/30' 
          : 'bg-gradient-to-br from-gray-100 to-white border-3 border-gray-400 shadow-xl'
        }
        ${isActive ? 'ring-2 ring-green-400 ring-offset-2' : ''}
        rounded-2xl backdrop-blur-sm relative overflow-hidden
      `}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Player Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div 
            className={`
              text-3xl p-2 rounded-full 
              ${isCurrentPlayer 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' 
                : 'bg-gradient-to-r from-gray-400 to-gray-500'
              }
            `}
            animate={{ rotate: isActive ? [0, 5, -5, 0] : 0 }}
            transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
          >
            {player.avatar}
          </motion.div>
          <div>
            <h3 className={`
              font-black text-lg
              ${isCurrentPlayer ? 'text-blue-800' : 'text-gray-800'}
            `}>
              {player.name}
            </h3>
            <p className="text-sm text-gray-600 font-semibold">
              {completeSets.length}/3 complete sets
            </p>
          </div>
        </div>
        
        {/* Hand count */}
        <div className={`
          px-3 py-2 rounded-full font-black text-sm shadow-lg border-2
          ${isCurrentPlayer 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-300' 
            : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-300'
          }
        `}>
          {player.hand.length} cards
        </div>
      </div>

      {/* Bank Section */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-semibold text-gray-700">Bank</h4>
          <span className="text-sm font-bold text-green-600">
            {getBankValue()}M
          </span>
        </div>
        
        <div className="flex gap-1 overflow-x-auto pb-1">
          {player.bank.length > 0 ? (
            player.bank.map((card) => (
              <Card
                key={card.id}
                card={card}
                size="medium"
                disabled={true}
              />
            ))
          ) : (
            <div className="text-xs text-gray-400 py-2">
              No money in bank
            </div>
          )}
        </div>
      </div>

      {/* Properties Section */}
      <div className="mb-3">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Properties</h4>
        
        <div className="flex gap-2 overflow-x-auto pb-1">
          {player.properties.length > 0 ? (
            player.properties.map((propertySet) => (
              <PropertySetDisplay
                key={propertySet.color}
                propertySet={propertySet}
              />
            ))
          ) : (
            <div className="text-xs text-gray-400 py-2">
              No properties owned
            </div>
          )}
        </div>
      </div>

      {/* Hand Preview (for other players) */}
      {!showHand && !isCurrentPlayer && (
        <div className="flex gap-1">
          {Array.from({ length: Math.min(player.hand.length, 7) }, (_, i) => (
            <Card
              key={i}
              card={{} as CardType}
              size="medium"
              showBack={true}
              disabled={true}
            />
          ))}
          {player.hand.length > 7 && (
            <div className="flex items-center text-xs text-gray-500 ml-1">
              +{player.hand.length - 7}
            </div>
          )}
        </div>
      )}

      {/* Win Condition Progress */}
      <div className="mt-3 pt-2 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Progress to Win:</span>
          <div className="flex gap-1">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className={`
                  w-3 h-3 rounded-full border-2
                  ${i < player.completedSets 
                    ? 'bg-yellow-400 border-yellow-400' 
                    : 'bg-transparent border-gray-300'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 