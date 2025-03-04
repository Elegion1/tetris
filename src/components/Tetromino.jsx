// src/components/Tetromino.js
import React from 'react';

const Tetromino = ({ shape, color, position }) => {
  return (
    <>
      <div className="tetromino">
        {shape.map((row, y) =>
          row.map(
            (block, x) =>
              block === 1 && (
                <div
                  key={`${x}-${y}`}
                  style={{
                    position: 'absolute',
                    left: `${((position.x + x) * 21) + 0}px`,
                    top: `${((position.y + y) * 21) + 0}px`,
                    width: '20px',
                    height: '20px',
                    backgroundColor: color,
                    border: '1px solid #ccc',
                  }}
                ></div>
              )
          )
        )}
      </div>
    </>
  );
};

export default Tetromino;