import React, { forwardRef, Component } from 'react';

// export const TextInput = forwardRef((props, ref) => {
//   return (
//     <button onClick={props.handler} ref={ref}>
//       {props.children}
//     </button>
//   );
// });
// export const TextInput = forwardRef((props, ref) => {});
export class TextInput extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  focusButton() {
    this.ref.current.focus();
  }
  render() {
    return (
      <button ref={this.ref} onClick={this.props.handler}>
        {this.props.children}
      </button>
    );
  }
}
