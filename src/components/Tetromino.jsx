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
                    left: `${((position.x + x) * 31) + 0}px`,
                    top: `${((position.y + y) * 31) + 0}px`,
                    width: '30px',
                    height: '30px',
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