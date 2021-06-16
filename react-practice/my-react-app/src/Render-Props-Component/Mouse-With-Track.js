import React, { Component, PureComponent } from 'react';

export default class MouseTracker extends Component {
  render() {
    return (
      <p>
        <h1>移动鼠标!</h1>
        <MouseWithPng render={(mouse) => <Png mouse={mouse} />} />
      </p>
    );
  }
}

class MouseWithPng extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0
    };
    this.setMouseState = this.setMouseState.bind(this);
  }

  componentDidMount() {
    console.log(1);
  }

  setMouseState(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <>
        <div style={{ height: '100vh' }} onMouseMove={this.setMouseState}>
          {this.props.render(this.state)}
        </div>
        <p>
          x: {this.state.x}, y:{this.state.y}
        </p>
      </>
    );
  }
}

class Png extends Component {
  render() {
    return (
      <img
        src="./logo192.png"
        alt="a pic"
        width="100"
        height="100"
        style={{
          position: 'absolute',
          left: this.props.mouse.x,
          top: this.props.mouse.y
        }}
      />
    );
  }
}
