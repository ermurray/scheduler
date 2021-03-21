import { useState } from 'react';


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (next, replace = false) => {
    if (replace) {
       history.pop();
      }
    setHistory((history) => [...history, next]);
    setMode(next);
    }

  const back = () => {
    
    if (history.length > 1) {
      history.pop(); 
    }
    if (history.length > 0) {
      setMode(history.slice(-1)[0])
    }
  }
  return { mode, transition, back };
}