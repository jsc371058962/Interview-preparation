import React, { PureComponent } from 'react';
import InputText from './InputText';

function getNumber(number) {
  number = Number.parseFloat(number);
  if (Number.isNaN(number)) {
    return '';
  }
  return number + 5;
}
export default class Calculator extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      flag: 'n1',
      number: '',
    };
    this.onInput1Change = this.onInput1Change.bind(this);
    this.onInput2Change = this.onInput2Change.bind(this);
  }

  onInput1Change(value) {
    this.setState({
      flag: 'n1',
      number: value,
    });
  }

  onInput2Change(value) {
    this.setState({
      flag: 'n2',
      number: value,
    });
  }

  render() {
    const { flag, number } = this.state;
    const number1 = 'n1' === flag ? number : getNumber(number);
    const number2 = 'n2' === flag ? number : getNumber(number);
    return (
      <>
        <InputText number={number1} onNumberChange={this.onInput1Change} />
        <InputText number={number2} onNumberChange={this.onInput2Change} />
      </>
    );
  }
}


