import React from 'react';
import './App.css';
import GameOfLifeCanvas from './GameOfLifeCanvas'
import GameOfLife from './GameOfLife'

function App() {
  const game = new GameOfLife(100)
    return (
        <div className="App">
          <GameOfLifeCanvas game={game} />
        </div>
    )
}

export default App;
