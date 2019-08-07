import React, {useState} from 'react';

export function useVisualMode(base) {

  const [mode, setMode] = useState(base);

  const transition = (change) => {
    setMode(change);
  }
  
  return {
    mode,
    transition
  }

};