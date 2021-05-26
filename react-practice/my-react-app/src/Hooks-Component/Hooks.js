import React, { useState, useEffect } from 'react';

export default function Count() {
  console.log(123)
  const [count, setCount] = useState(0);
  const [fruit, setFruit] = useState('apple');

  useEffect(() => {
    document.title = `You clicked ${count} times.`
  });

  useEffect(() => {
    console.log(fruit);
  })

  function setAllStates() {
    setCount(count + 1);
    setFruit('banana');
  }

  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={setAllStates} value='button'>
        count+1
      </button>
    </div>
  );
}
