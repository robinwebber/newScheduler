import React, {useState} from 'react';

export function useVisualMode(base) {

  const [mode, setMode] = useState(base);
  const [history, setHistory] = useState([base]);

  const transition = (change, replace) => {
    if (replace) {
      setMode(change);
    } else {
      setHistory([...history, change])
      setMode(change);
    }
  }
  
  const back = () => {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length-1]);
    }
  }

  return {
    mode,
    transition,
    back
  }

};