import { useState } from "react";

export function useVisualMode(base) {
  const [mode, setMode] = useState(base);
  const [history, setHistory] = useState([base]);

  const transition = (change, replace) => {
    setMode(change);
    if (replace) {
      setHistory(prev => [...prev.slice(0, prev.length - 1), change]);
    } else {
      setHistory(prev => [...prev, change]);
      // setMode(change);
    }
  };

  const back = () => {
    // console.log("history", history);
    if (history.length > 1) {
      // history.pop();
      setMode(history[history.length - 2]);
      setHistory(prev => [...prev.slice(0, prev.length - 1)]);
    }
  };

  return {
    mode,
    transition,
    back
  };
}
