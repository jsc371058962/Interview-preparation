// import React, { PureComponent } from 'react';
import { useState } from 'react';
import { LoginButton, LogoutButton, Greeting } from './Common';

// 搞一下hooks
export default function LoginController(props) {
  const [isLoggedIn, setLogState] = useState(props.isLoggedIn);
  return (
    <>
      <Greeting isLoggedIn={isLoggedIn} />
      {isLoggedIn ? (
        <LogoutButton buttonClick={() => setLogState(false)} />
      ) : (
        <LoginButton buttonClick={() => setLogState(true)} />
      )}
    </>
  );
}
