import React, { PureComponent } from 'react';

export default class NameForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.handlerSumbit = this.handlerSumbit.bind(this);
    this.handlerChange = this.handlerChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      name: 'jin',
    });
  }

  handlerSumbit(e) {
    alert('sumbit');
    e.preventDeafult();
  }

  handlerChange(e) {
    console.log(e.target.value);
    this.setState(
      {
        name: e.target.value,
      },
      () => {
        console.log(this.state.name);
      }
    );
  }

  render() {
    return (
      <form onSubmit={this.handlerSumbit}>
        <label htmlFor='input'>
          name:
          <input
            autoComplete="off"
            id="input"
            value={this.state.name}
            onChange={this.handlerChange}
          />
        </label>
        <input type='submit' value='Submit' />
      </form>
    );
  }
}
