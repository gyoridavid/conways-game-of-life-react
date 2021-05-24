import React from 'react';
import './App.css';
import GameOfLifeCanvasRenderer from './GameOfLifeCanvasRenderer'
import GameOfLife from './GameOfLife'

function App() {
  const game = new GameOfLife(100)
    return (
        <div className="App">
          <GameOfLifeCanvasRenderer game={game} />
        </div>
    )
}

export default App;
