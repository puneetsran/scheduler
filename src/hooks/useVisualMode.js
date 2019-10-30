import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(next, replace = false) {
    if (!replace) setHistory([initial].concat(mode));
    setMode(next);
  }

  function back() {
    setMode(history[history.length - 1]);
    setHistory([initial]);
  }

  return { mode, transition, back };
}