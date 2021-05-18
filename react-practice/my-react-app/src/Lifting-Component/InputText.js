import React, { PureComponent } from 'react';

export default class InputText extends PureComponent {

  handlerInput = (e) => {
    this.props.onNumberChange(e.target.value);
  }

  render() {
    const { number } = this.props;
    return (
      <form>
        <label>number:
          <input value={number} onChange={this.handlerInput} />
        </label>
      </form>
    );
  }
}
