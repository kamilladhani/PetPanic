import { motion } from 'framer-motion';
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

  if (showBack) {
    return (
      <motion.div
        className={`${sizeClasses[size]} rounded-xl border-4 border-gray-800 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 flex items-center justify-center cursor-pointer shadow-2xl relative overflow-hidden`}
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
        {/* Card back pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
          <div className="absolute top-2 left-2 text-white/40 text-xs">🐾</div>
          <div className="absolute bottom-2 right-2 text-white/40 text-xs">🐾</div>
        </div>
        <div className="text-white text-4xl font-black drop-shadow-lg">🐾</div>
      </motion.div>
    );
  }

  // Get vibrant colors based on card type
  let bgGradient = 'bg-gradient-to-br from-gray-200 to-gray-300';
  let borderColor = 'border-gray-600';
  let textColor = 'text-gray-900';
  let accentBg = 'bg-gray-100';

  if (card.type === 'property') {
    if (card.color === 'poodle-park') {
      bgGradient = 'bg-gradient-to-br from-pink-400 to-pink-600';
      borderColor = 'border-pink-800';
      textColor = 'text-white';
      accentBg = 'bg-pink-200';
    } else if (card.color === 'cattown-tower') {
      bgGradient = 'bg-gradient-to-br from-orange-400 to-orange-600';
      borderColor = 'border-orange-800';
      textColor = 'text-white';
      accentBg = 'bg-orange-200';
    } else if (card.color === 'hamster-hotel') {
      bgGradient = 'bg-gradient-to-br from-amber-500 to-yellow-600';
      borderColor = 'border-amber-800';
      textColor = 'text-white';
      accentBg = 'bg-amber-200';
    } else if (card.color === 'bunny-burrow') {
      bgGradient = 'bg-gradient-to-br from-green-500 to-green-700';
      borderColor = 'border-green-900';
      textColor = 'text-white';
      accentBg = 'bg-green-200';
    } else if (card.color === 'fish-tank') {
      bgGradient = 'bg-gradient-to-br from-blue-500 to-blue-700';
      borderColor = 'border-blue-900';
      textColor = 'text-white';
      accentBg = 'bg-blue-200';
    }
  } else if (card.type === 'money') {
    bgGradient = 'bg-gradient-to-br from-emerald-500 to-green-600';
    borderColor = 'border-green-900';
    textColor = 'text-white';
    accentBg = 'bg-green-200';
  } else if (card.type === 'action') {
    bgGradient = 'bg-gradient-to-br from-indigo-500 to-purple-600';
    borderColor = 'border-indigo-900';
    textColor = 'text-white';
    accentBg = 'bg-indigo-200';
  } else if (card.type === 'rent') {
    bgGradient = 'bg-gradient-to-br from-yellow-500 to-amber-600';
    borderColor = 'border-yellow-900';
    textColor = 'text-white';
    accentBg = 'bg-yellow-200';
  } else if (card.type === 'wild') {
    bgGradient = 'bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500';
    borderColor = 'border-purple-900';
    textColor = 'text-white';
    accentBg = 'bg-purple-200';
  }

  return (
    <motion.div
      className={`
        ${sizeClasses[size]} 
        ${bgGradient} 
        ${borderColor} 
        ${textColor}
        rounded-xl border-4 flex flex-col relative overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl
        ${selected ? 'ring-4 ring-blue-400 scale-105 ring-offset-2' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
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
    >
      {/* Card Header - Name and Value */}
      <div className="bg-black/20 px-2 py-1 flex justify-between items-center">
        <div className="text-2xl">{card.emoji}</div>
        <div className={`text-xs font-black ${accentBg} text-gray-900 rounded-full px-2 py-1 shadow-sm border-2 border-white`}>
          {card.value}M
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-2 flex flex-col justify-center">
        {/* Card Name */}
        <div className="text-center mb-2">
          <h3 className="font-black leading-tight text-center text-xs drop-shadow-md">
            {card.name}
          </h3>
        </div>

        {/* Property Set Indicators */}
        {card.type === 'property' && (
          <div className="flex justify-center space-x-1 mb-2">
            {Array.from({ length: card.setSize }, (_, i) => (
              <div 
                key={i} 
                className="w-2 h-2 rounded-full bg-white/80 shadow-sm"
              />
            ))}
          </div>
        )}
        
        {/* Wild Card Color Indicators */}
        {card.type === 'wild' && (
          <div className="flex justify-center items-center mb-1">
            <div className="text-lg">⭐</div>
          </div>
        )}
      </div>

      {/* Card Footer - Type */}
      <div className="bg-black/20 px-2 py-1 flex justify-between items-center">
        <span className="text-xs font-black uppercase tracking-wide">
          {card.type === 'wild' ? 'Wild' : 
           card.type === 'property' ? 'Property' :
           card.type === 'action' ? 'Action' :
           card.type === 'rent' ? 'Rent' : 'Money'}
        </span>
        
        {/* Type-specific icons */}
        <div className="text-xs">
          {card.type === 'property' && '🏠'}
          {card.type === 'wild' && '🌟'}
          {card.type === 'action' && '⚡'}
          {card.type === 'rent' && '💰'}
          {card.type === 'money' && '💎'}
        </div>
      </div>

      {/* Hover overlay with description */}
      <motion.div
        className="absolute inset-0 bg-black/95 backdrop-blur-sm text-white p-2 flex items-center justify-center text-center text-xs rounded-xl opacity-0 z-20"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div>
          <p className="font-black mb-1 text-yellow-300">{card.name}</p>
          <p className="text-xs opacity-90 leading-relaxed">{card.description}</p>
          <div className="mt-2 text-xs text-blue-300 font-bold">
            Value: {card.value}M
          </div>
        </div>
      </motion.div>

      {/* Selection glow effect */}
      {selected && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-blue-400/30 pointer-events-none border-2 border-blue-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Card shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-xl"></div>
    </motion.div>
  );
}; 