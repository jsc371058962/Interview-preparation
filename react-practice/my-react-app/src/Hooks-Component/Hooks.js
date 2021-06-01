import React, { useState, useEffect, useReducer, useMemo, useCallback, useRef } from 'react';

function usePrevValue(value) {
  const preValue = useRef(0);
  useEffect(() => {
    preValue.current = value;
  });
  return preValue.current;
}
export default function Count() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevValue(count);

  useEffect(() => {
    const id = setTimeout(() => {
      console.log(count);
    }, 1000);
    return () => {
      clearInterval(id);
    }
  }, [count]);

  return (
    <>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
      <button onClick={() => setCount(count + 1)}>add+1</button>
      <button onClick={() => setCount(count - 1)}>minus-1</button>
    </>
  );
}
