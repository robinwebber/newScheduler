import { useState } from "react";

export function useVisualMode(base) {
  const [mode, setMode] = useState(base);
  const [history, setHistory] = useState([base]);

  console.log("--------------History-------------");
  console.log(history);
  console.log("-----------------------------------");
  const transition = (change, replace) => {
    console.log("change", change);
    console.log("replace", replace);
    setMode(change);
    if (replace) {
      setHistory(prev => [...prev.slice(0, prev.length - 1), change]);
    } else {
      setHistory(prev => [...prev, change]);
      // setMode(change);
    }
    console.log("history inside transition---->", history);
  };

  const back = () => {
    // console.log("history", history);
    if (history.length > 1) {
      // history.pop();
      setMode(history[history.length - 2]);
      setHistory(prev => [...prev.slice(0, prev.length - 1)]);
    }
    console.log("history inside back-------->", history);
  };

  return {
    mode,
    transition,
    back
  };
}
