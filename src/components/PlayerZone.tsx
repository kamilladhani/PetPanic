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
  isCurrentPlayer,
  isActive,
  showHand = false,
  compact = false,
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
              size="small"
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

  return (
    <motion.div
      className={`
        bg-white/80 backdrop-blur-sm rounded-xl border-2 p-4
        ${isCurrentPlayer ? 'border-blue-500 shadow-lg ring-2 ring-blue-200' : 'border-gray-200'}
        ${compact ? 'max-w-sm' : 'w-full'}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {/* Player Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="text-2xl">{player.avatar || '🐾'}</div>
          <div>
            <h3 className="font-bold text-gray-800">{player.name}</h3>
            <div className="text-xs text-gray-600">
              {isCurrentPlayer && isActive ? '🟢 Your Turn' : 
               isCurrentPlayer ? '🔵 You' : 
               '⚪ Waiting'}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm font-medium text-gray-600">
            Sets: {player.completedSets}/3
          </div>
          <div className="text-xs text-gray-500">
            {player.hand.length} cards
          </div>
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
                size="small"
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
              size="small"
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