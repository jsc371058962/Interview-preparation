import React, { PureComponent, createContext } from 'react';

const MyContext = createContext({
  themeColor: 'light',
  colorChange: () => {}
});

export default class Context extends PureComponent {
  constructor(props) {
    super(props);
    this.colorChange = this.colorChange.bind(this);
    this.state = {
      themeColor: 'dark',
      colorChange: this.colorChange
    };
  }

  colorChange() {
    console.log(11111);
  }

  render() {
    return (
      <MyContext.Provider value={this.state}>
        <Son />
      </MyContext.Provider>
    );
  }
}

class Son extends PureComponent {
  render() {
    return (
      <MyContext.Consumer>
        {({ themeColor, colorChange }) => {
          return <button onClick={colorChange}>change theme</button>;
        }}
      </MyContext.Consumer>
    );
  }
}
