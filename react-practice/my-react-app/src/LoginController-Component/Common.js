function UserGreeting(props) {
  return <h1>Welcome back!</h1>
}
function GuestGreeting(props) {
  return <h1>Please sign up!</h1>
}
export function Greeting(props) {
  const { isLoggedIn } = props;
  return isLoggedIn ? <UserGreeting /> : <GuestGreeting />;
}

export function LoginButton(props) {
  return <button onClick={props.buttonClick}>Log In</button>;
}

export function LogoutButton(props) {
  return <button onClick={props.buttonClick}>Log Out</button>;
}
