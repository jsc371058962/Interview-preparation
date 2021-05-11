import React, { PureComponent } from 'react';

export default class Clock extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.t = setInterval(this.timer, 1000);
  }

  componentWillMount() {
    clearInterval(this.t);
  }

  timer() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <>
        <h1>{this.props.name}</h1>
        <h1>It's {this.state.date.toLocaleTimeString()} </h1>
      </>
    );
  }
}
