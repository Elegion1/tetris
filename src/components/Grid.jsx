import React from 'react';

// Funzione per creare una griglia vuota
function createEmptyGrid(gridHeight, gridWidth) {
  return Array.from({ length: gridHeight }, () => Array(gridWidth).fill(null));
}

// Componente Grid
const Grid = ({ grid, gridWidth }) => {
  return (
    <div
      id="grid-container"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridWidth}, 20px)`,
        gridTemplateRows: `repeat(${grid.length}, 20px)`,
        gap: '1px',
      }}
    >
      {grid.map((row, y) =>
        row.map((block, x) => (
          <div
            key={`${x}-${y}`}
            className="grid-cell"
            style={{
              backgroundColor: block || 'white',
              width: '20px',
              height: '20px',
              border: '1px solid #ccc',
            }}
          ></div>
        ))
      )}
    </div>
  );
};

export default Grid;