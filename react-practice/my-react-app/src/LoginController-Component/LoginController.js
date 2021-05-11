import React, { PureComponent } from 'react';
import { LoginButton, LogoutButton, Greeting } from './Common';

export default class LoginController extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
    };
    this.handlerLogIn = this.handlerLogIn.bind(this);
    this.handlerLogOut = this.handlerLogOut.bind(this);
  }

  handlerLogIn() {
    this.setState(() => ({
      isLoggedIn: true
    }));
  }

  handlerLogOut() {
    this.setState({
      isLoggedIn: false,
    });
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <>
        <Greeting isLoggedIn={isLoggedIn} />
        {isLoggedIn ? (
          <LogoutButton buttonClick={this.handlerLogOut} />
        ) : (
          <LoginButton buttonClick={this.handlerLogIn} />
        )}
      </>
    );
  }
}
