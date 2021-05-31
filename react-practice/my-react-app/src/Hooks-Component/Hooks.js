import React, { useEffect, useReducer } from 'react';

function init(state) {
  return { count: state.count };
}
function reducer(state, action) {
  switch (action.type) {
    case 'increase':
      return { count: state.count + 1 };
    case 'decrease':
      return { count: state.count - 1 };
    default:
      break;
  }
}
export default function Count() {
  const [state, dispatch] = useReducer(reducer, { count: 1 }, init);

  useEffect(() => {
    // 请求数据,订阅,设置定时器,log上报
    document.title = `You clicked ${state.count} times.`
  });

  return (
    <div>
      <p>You clicked {state.count} times.</p>
      <button onClick={() => dispatch({type: 'increase'})} value='button'>
        count+1
      </button>
      <button onClick={() => dispatch({type: 'decrease'})} value='button2'>
        count-1
      </button>
    </div>
  );
}
