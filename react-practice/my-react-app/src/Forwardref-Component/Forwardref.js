import React, { PureComponent } from 'react';
import { TextInput } from './Text-Input';
//控制一下某个input

export default class Forwardref extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      text: 'Click me!'
    };
    this.ref = React.createRef();
    this.handler = this.handler.bind(this);
  }

  handler() {
    console.log(111111)
    this.setState(() => ({ text: 'Click you!' }));
  }

  componentDidMount() {
    console.log(123)
    console.log(this.ref);
    this.ref.current.focus();
  }
  render() {
    return <TextInput handler={this.handler} ref={this.ref}>{this.state.text}</TextInput>;
  }
}
