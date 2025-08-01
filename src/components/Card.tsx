import { motion } from 'framer-motion';
import { colorThemes } from '../lib/cardData';
import type { Card as CardType } from '../types/card';

interface CardProps {
  card: CardType;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  showBack?: boolean;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  card,
  selected = false,
  onClick,
  disabled = false,
  size = 'medium',
  showBack = false,
  style,
}) => {
  const sizeClasses = {
    small: 'w-16 h-24 text-xs',
    medium: 'w-20 h-32 text-sm',
    large: 'w-24 h-36 text-base',
  };

  const getCardColors = () => {
    if (card.type === 'property') {
      return colorThemes[card.color];
    }
    
    if (card.type === 'wild') {
      // Use the first color for wild cards
      return colorThemes[card.colors[0]];
    }
    
    if (card.type === 'rent') {
      // Use a gold theme for rent cards
      return {
        bg: 'bg-yellow-100',
        border: 'border-yellow-400',
        text: 'text-yellow-800',
      };
    }
    
    if (card.type === 'action') {
      return {
        bg: 'bg-purple-100',
        border: 'border-purple-400',
        text: 'text-purple-800',
      };
    }
    
    // Money cards
    return {
      bg: 'bg-green-100',
      border: 'border-green-400',
      text: 'text-green-800',
    };
  };

  const colors = getCardColors();

  if (showBack) {
    return (
      <motion.div
        className={`${sizeClasses[size]} game-card bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center cursor-pointer`}
        style={style}
        onClick={onClick}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        animate={{
          rotate: selected ? 5 : 0,
          y: selected ? -8 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <div className="text-white text-2xl">🐾</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`
        ${sizeClasses[size]} 
        game-card 
        ${colors.bg} 
        ${colors.border} 
        ${colors.text}
        ${selected ? 'ring-4 ring-blue-400 shadow-xl' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        flex flex-col justify-between p-2 relative overflow-hidden
      `}
      style={style}
      onClick={disabled ? undefined : onClick}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      animate={{
        rotate: selected ? 5 : 0,
        y: selected ? -8 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      layout
    >
      {/* Card Header */}
      <div className="flex justify-between items-start">
        <div className="text-lg">{card.emoji}</div>
        <div className="text-xs font-bold bg-white/50 rounded px-1">
          {card.value}M
        </div>
      </div>

      {/* Card Name */}
      <div className="text-center flex-1 flex items-center justify-center">
        <h3 className="font-bold leading-tight text-center">
          {card.name}
        </h3>
      </div>

      {/* Card Type Indicator */}
      <div className="flex justify-between items-end text-xs">
        <span className="capitalize font-medium">
          {card.type === 'wild' ? 'Wild' : 
           card.type === 'property' ? 'Property' :
           card.type === 'action' ? 'Action' :
           card.type === 'rent' ? 'Rent' : 'Money'}
        </span>
        
        {/* Special indicators */}
        {card.type === 'property' && (
          <div className="flex space-x-1">
            {Array.from({ length: card.setSize }, (_, i) => (
              <div 
                key={i} 
                className="w-1.5 h-1.5 rounded-full bg-current opacity-60"
              />
            ))}
          </div>
        )}
        
        {card.type === 'wild' && (
          <div className="text-xs">
            ★
          </div>
        )}
      </div>

      {/* Hover overlay with description */}
      <motion.div
        className="absolute inset-0 bg-black/80 text-white p-2 flex items-center justify-center text-center text-xs rounded-lg opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <p>{card.description}</p>
      </motion.div>
    </motion.div>
  );
}; 