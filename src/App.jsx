import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from './components/Grid';
import Tetromino from './components/Tetromino';

const tetrominos = {
  I: { shape: [[1, 1, 1, 1]], color: 'cyan' },
  O: { shape: [[1, 1], [1, 1]], color: 'yellow' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: 'purple' },
  L: { shape: [[1, 0, 0], [1, 1, 1]], color: 'orange' },
  J: { shape: [[0, 0, 1], [1, 1, 1]], color: 'blue' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: 'green' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: 'red' },
};

const gridWidth = 10;
const gridHeight = 20;

function App() {
  const [tetromino, setTetromino] = useState(getRandomTetromino());
  const [position, setPosition] = useState({ x: 3, y: 0 });
  const [grid, setGrid] = useState(createEmptyGrid());
  const [isPaused, setIsPaused] = useState(false);
  const [nextTetromino, setNextTetromino] = useState(getRandomTetromino());
  const [score, setScore] = useState(0);

  function createEmptyGrid() {
    return Array.from({ length: gridHeight }, () => Array(gridWidth).fill(null));
  }

  function checkCollision(pos, shape = tetromino.shape) {
    return shape.some((row, y) =>
      row.some((cell, x) => {
        if (cell === 1) {
          const newX = pos.x + x;
          const newY = pos.y + y;
          return newX < 0 || newX >= gridWidth || newY >= gridHeight || grid[newY]?.[newX];
        }
        return false;
      })
    );
  }

  function moveTetromino(direction) {
    setPosition((prevPosition) => {
      const newPosition = { ...prevPosition };

      switch (direction) {
        case 'down':
          newPosition.y += 1;
          break;
        case 'left':
          newPosition.x -= 1;
          break;
        case 'right':
          newPosition.x += 1;
          break;
      }

      // Controlla solo collisioni, non resetta in caso di errore
      if (!checkCollision(newPosition)) {
        return newPosition;
      }

      return prevPosition;
    });
  }

  function rotateTetromino() {
    const rotatedShape = tetromino.shape[0].map((_, index) =>
      tetromino.shape.map(row => row[index]).reverse()
    );

    // Controlla collisioni solo dopo aver ruotato
    if (!checkCollision(position, rotatedShape)) {
      setTetromino({ ...tetromino, shape: rotatedShape });
    }
  }

  function placeTetromino() {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map(row => [...row]);
      tetromino.shape.forEach((row, y) =>
        row.forEach((cell, x) => {
          if (cell === 1) newGrid[position.y + y][position.x + x] = tetromino.color;
        })
      );

      // Check for full lines
      const clearedLines = newGrid.reduce((acc, row, y) => {
        if (row.every(cell => cell !== null)) {
          newGrid.splice(y, 1);
          newGrid.unshift(Array(gridWidth).fill(null));
          return acc + 1;
        }
        return acc;
      }, 0);

      if (clearedLines > 0) {
        setScore(prevScore => prevScore + clearedLines * 100);
      }

      return newGrid;
    });
  }

  function moveTetrominoDown() {
    const newPos = { x: position.x, y: position.y + 1 };
    if (!checkCollision(newPos)) {
      setPosition(newPos);
    } else {
      placeTetromino();
      setTetromino(nextTetromino);
      setNextTetromino(getRandomTetromino());
      setPosition({ x: Math.floor(gridWidth / 2) - 1, y: 0 });
      if (checkCollision({ x: Math.floor(gridWidth / 2) - 1, y: 0 })) {
        alert('Game Over!');
        setGrid(createEmptyGrid());
      }
    }
  }

  function getRandomTetromino() {
    const keys = Object.keys(tetrominos);
    return tetrominos[keys[Math.floor(Math.random() * keys.length)]];
  }

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(moveTetrominoDown, 1000 - (score / 100));
    return () => clearInterval(interval);
  }, [tetromino, position, moveTetrominoDown, isPaused]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const actions = {
        ArrowDown: () => moveTetromino('down'),
        ArrowLeft: () => moveTetromino('left'),
        ArrowRight: () => moveTetromino('right'),
        ArrowUp: rotateTetromino,
      };
      actions[event.key]?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveTetromino, rotateTetromino, checkCollision]);

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  return (
    <>
      <div className="App">
        
        <div id="game-container">
          <Grid grid={grid} gridWidth={gridWidth} />
          <Tetromino shape={tetromino.shape} color={tetromino.color} position={position} />
        </div>
        <div id='controls'>
          <div id='nextPiece'>
          <p>NEXT</p>
          <div id='piece'>
            <Tetromino shape={nextTetromino.shape} color={nextTetromino.color} position={{ x: -1.5, y: 2 }} />
          </div>
        </div>
          <div id='score'>
            <p>SCORE</p>
            <p>{score}</p>
          </div>
          <div>
          <button id='pauseBtn' onClick={handlePause}>Pause</button> <br />
          <button id='resumeBtn' onClick={handleResume}>Resume</button>
          </div>
        </div>
      </div>
      <div id='mobile-controls'>
        <div>
          <button onClick={() => moveTetromino('left')}>Left</button>
          <button onClick={() => moveTetromino('right')}>Right</button>
        </div>
        <div>
          <button onClick={() => moveTetromino('down')}>Down</button>
          <button onClick={rotateTetromino}>Rotate</button>
        </div>
      </div>

    </>
  );
}

export default App;