# 🐾 Pet Panic - Animal-Themed Card Game

A fun, mobile-friendly web app that clones Monopoly Deal with a playful pet theme! Built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🎮 Game Overview

Pet Panic is a fast-paced card game where players collect **3 complete pet-themed property sets** to win. Navigate through adorable locations like Poodle Parks, Cattown Towers, and Hamster Hotels while using strategic action cards to outsmart your opponents!

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

## 🃏 Game Rules

### Objective
Be the first player to collect 3 complete property sets!

### Turn Structure
1. **Draw Phase**: Draw 2 cards from the deck
2. **Play Phase**: Play up to 3 cards (to bank, properties, or as actions)
3. **End Turn**: Pass to the next player

### Card Types

#### 🏠 Property Cards
- **Poodle Park** (Pink/Purple) - 3 cards needed
- **Cattown Tower** (Orange/Yellow) - 3 cards needed  
- **Hamster Hotel** (Brown/Tan) - 3 cards needed
- **Bunny Burrow** (Green) - 2 cards needed
- **Fish Tank** (Blue) - 2 cards needed

#### ⚡ Action Cards
- **Fetch Rent** 🦴 - Collect rent from property sets
- **Steal Treat** 🍖 - Take a property from another player
- **Vet Visit** 🩺 - Block any action played against you
- **Playdate** 🤝 - Swap properties with another player
- **Pet Panic!** 😱 - Ultimate steal - take any property!
- **Birthday Party** 🎂 - Draw 2 extra cards

#### 💰 Money Cards
- **Kibble Bag** 🥣 - 1M (basic pet food)
- **Toy Ball** ⚽ - 2M (fun pet toys)
- **Premium Treats** 🍖 - 3M (gourmet treats)
- **Luxury Pet Bed** 🛏️ - 4M (comfort for pets)
- **Golden Collar** 👑 - 5M (ultimate status symbol)

#### 🌟 Wild Cards
- **Bark 'n Meow** 🐕‍🦺 - Can be Poodle Park or Cattown Tower
- **Small Pets Combo** 🐹 - Can be Hamster Hotel or Bunny Burrow
- **Aquatic Friends** 🐠 - Can be Fish Tank property

## 🛠️ Tech Stack

- **React 18** + **TypeScript** - Modern UI framework with type safety
- **Tailwind CSS** - Utility-first styling with custom pet themes
- **Framer Motion** - Smooth animations for card interactions
- **Vite** - Fast development build tool

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Card.tsx        # Individual card component with animations
│   ├── Hand.tsx        # Player hand with card selection
│   ├── PlayerZone.tsx  # Player bank, properties, and status
│   └── GameBoard.tsx   # Main game layout and controls
├── lib/                # Core game logic
│   ├── cardData.ts     # All card definitions and deck creation
│   └── gameEngine.ts   # Game state management and rules
├── types/              # TypeScript definitions
│   ├── card.ts         # Card type definitions
│   └── game.ts         # Game state and player types
└── hooks/              # Custom React hooks (future use)
```

## 🎨 Features Implemented

### ✅ Stage 1 - Working Prototype
- [x] Complete card system with 40+ unique pet-themed cards
- [x] Responsive game board layout (mobile-friendly)
- [x] Card selection and basic gameplay (draw, play to bank/property, end turn)
- [x] Property set validation and completion detection
- [x] Win condition (3 complete sets)
- [x] Smooth Framer Motion animations
- [x] Beautiful pet-themed UI with Tailwind CSS

### 🚧 Stage 2 - Advanced Features (TODO)
- [ ] Action card effects (rent collection, stealing, blocking)
- [ ] AI players with basic strategy
- [ ] Multiplayer support (local or online)
- [ ] Sound effects and enhanced animations
- [ ] Turn history and game statistics
- [ ] Save/load game state
- [ ] Custom player avatars and names

## 🎯 How to Play (Current Prototype)

1. **Start Game** - Click "Start Game" on the welcome screen
2. **Draw Cards** - Click "Draw Cards" to draw 2 cards each turn
3. **Select Cards** - Tap cards in your hand to select them (up to 3 per turn)
4. **Play Cards**:
   - **Play to Bank** - Use cards as money
   - **Play as Property** - Build property sets (only property/wild cards)
5. **End Turn** - Click "End Turn" when finished
6. **Win** - First to complete 3 property sets wins!

## 🐛 Known Issues

- Action cards currently only work as money (full effects coming in Stage 2)
- AI players don't take actions automatically
- No rent collection or property stealing yet
- Limited error handling and validation

## 🤝 Contributing

This is a fun learning project! Feel free to contribute by:
- Adding action card effects
- Implementing AI players
- Improving animations and UI
- Adding sound effects
- Creating more card types

## 📝 License

MIT License - Feel free to use this project for learning and fun!

---

**Enjoy playing Pet Panic! 🐾🎮**
