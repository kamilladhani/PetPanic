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
    medium: 'w-24 h-36 text-sm',
    large: 'w-28 h-40 text-base',
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
        bg: 'bg-gradient-to-br from-yellow-100 to-yellow-200',
        border: 'border-yellow-500',
        text: 'text-yellow-900',
      };
    }
    
    if (card.type === 'action') {
      return {
        bg: 'bg-gradient-to-br from-purple-100 to-purple-200',
        border: 'border-purple-500',
        text: 'text-purple-900',
      };
    }
    
    // Money cards
    return {
      bg: 'bg-gradient-to-br from-green-100 to-green-200',
      border: 'border-green-500',
      text: 'text-green-900',
    };
  };

  const colors = getCardColors();

  if (showBack) {
    return (
      <motion.div
        className={`${sizeClasses[size]} rounded-xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center cursor-pointer shadow-lg`}
        style={style}
        onClick={onClick}
        whileHover={{ scale: disabled ? 1 : 1.05, rotateY: 5 }}
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
        <div className="text-white text-3xl">🐾</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`
        ${sizeClasses[size]} 
        ${colors.bg} 
        ${colors.border} 
        ${colors.text}
        ${selected ? 'ring-4 ring-blue-400 shadow-2xl scale-105' : 'shadow-lg'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-xl'}
        rounded-xl border-3 flex flex-col justify-between p-3 relative overflow-hidden
        transform transition-all duration-200
      `}
      style={style}
      onClick={disabled ? undefined : onClick}
      whileHover={{ 
        scale: disabled ? 1 : 1.05, 
        rotateY: disabled ? 0 : 5,
        zIndex: 10
      }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      animate={{
        rotate: selected ? 5 : 0,
        y: selected ? -12 : 0,
        zIndex: selected ? 20 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      layout
    >
      {/* Card Header */}
      <div className="flex justify-between items-start mb-1">
        <div className="text-2xl">{card.emoji}</div>
        <div className="text-xs font-bold bg-white/80 backdrop-blur rounded-full px-2 py-1 shadow-sm">
          {card.value}M
        </div>
      </div>

      {/* Card Name */}
      <div className="text-center flex-1 flex items-center justify-center px-1">
        <h3 className="font-bold leading-tight text-center text-xs">
          {card.name}
        </h3>
      </div>

      {/* Card Type Indicator */}
      <div className="flex justify-between items-end text-xs mt-1">
        <span className="capitalize font-medium opacity-80">
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
          <div className="text-xs text-yellow-600">
            ⭐
          </div>
        )}
      </div>

      {/* Hover overlay with description */}
      <motion.div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm text-white p-2 flex items-center justify-center text-center text-xs rounded-xl opacity-0 z-10"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div>
          <p className="font-semibold mb-1">{card.name}</p>
          <p className="text-xs opacity-90">{card.description}</p>
        </div>
      </motion.div>

      {/* Selection glow effect */}
      {selected && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-blue-400/20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
}; 