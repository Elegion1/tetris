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
        gridTemplateColumns: `repeat(${gridWidth}, 30px)`,
        gridTemplateRows: `repeat(${grid.length}, 30px)`,
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
              width: '30px',
              height: '30px',
              border: '1px solid #ccc',
            }}
          ></div>
        ))
      )}
    </div>
  );
};

export default Grid;