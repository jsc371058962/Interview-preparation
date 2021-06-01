import { forwardRef } from 'react'

export const TextInput = forwardRef((props, ref) => {
  return (
    <button onClick={props.handler} ref={ref}>
      {props.children}
    </button>
  );
});
