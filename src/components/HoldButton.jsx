import { useState, useEffect } from 'react';

const HoldButton = ({ onHold, label }) => {
  const [isHolding, setIsHolding] = useState(false);

  useEffect(() => {
    let interval;

    if (isHolding) {
      // Esegue l'azione in loop mentre il bottone è premuto
      interval = setInterval(() => {
        onHold();
      }, 100); // Cambia la velocità qui (100 ms)
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isHolding, onHold]);

  return (
    <button
      onTouchStart={() => setIsHolding(true)}  // Inizia l'azione
      onTouchEnd={() => setIsHolding(false)}   // Ferma l'azione
      onMouseDown={() => setIsHolding(true)}   // Supporto desktop
      onMouseUp={() => setIsHolding(false)}    // Ferma su click desktop
      onMouseLeave={() => setIsHolding(false)} // Ferma se esci col mouse
    >
      {label}
    </button>
  );
};

export default HoldButton

