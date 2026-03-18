# Battleship

A classic Battleship game built with modern JavaScript. This project is part of The Odin Project's JavaScript curriculum and emphasizes Test-Driven Development (TDD), modular architecture, and object-oriented design principles.

## Features

- **Ship Operations**: Ship creation with hit tracking and automated sunk logic detection.
- **Gameboard Management**: Intelligent gameboards that handle ship placement, receive attacks, and track missed shots.
- **Player Interface**: Engaging Player vs Computer gameplay.
- **Turn-based Combat**: Structured turn-based attack system ensuring fair play.
- **Interactive UI**: A fully responsive, DOM-based user interface.
- **Ship Placement**: Interactive or randomized ship placement for quick game starts.

## Concepts Learned

- Test Driven Development (TDD)
- Unit Testing with Jest
- Factory Functions and Object-Oriented Design
- ES6 Modules architecture
- Strict separation of application logic and DOM manipulation
- Event-driven programming

## Tech Stack

- JavaScript (ES6+)
- HTML5
- CSS3
- Jest (Testing Framework)
- Webpack (Module Bundler)
- Babel (Compiler)

## Project Structure

```text
├── src/
│   ├── dom.js            # DOM manipulation and UI rendering
│   ├── game.js           # Main game loop and turn logic
│   ├── game.test.js      # Game logic tests
│   ├── gameboard.js      # Gameboard factory function
│   ├── gameboard.test.js # Gameboard logic tests
│   ├── index.js          # Application entry point
│   ├── player.js         # Player and Computer logic
│   ├── player.test.js    # Player logic tests
│   ├── ship.js           # Ship factory function
│   ├── ship.test.js      # Ship logic tests
│   ├── styles.css        # Application styles
│   └── template.html     # HTML template for Webpack
├── .gitignore
├── package.json
├── package-lock.json
└── webpack.config.js
```

## Installation & Setup

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```

2. Navigate into the project folder:
   ```bash
   cd battleship
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the test suite:
   ```bash
   npm test
   ```

5. Start the development server (if configured in package.json):
   ```bash
   npm start
   ```

6. Build the project for production:
   ```bash
   npm run build
   ```

## Usage

1. **Setup Phase**: Start by placing your fleet of ships on your gameboard.
2. **Combat Phase**: Click on a valid coordinate on the enemy's (Computer's) board to launch an attack.
3. **Turn Progression**: After your attack, the computer will automatically retaliate.
4. **Victory Condition**: Continue exchanging fire until all ships of either the player or the computer are successfully sunk.
