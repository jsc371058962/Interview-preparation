import React, { PureComponent } from 'react';

// ----------------------start-------------------
// ----------------------end---------------------
function Welcome(props) {
  return <div>hello, {props.name}</div>
}

const element = <Welcome name="xiaoming" />


// ----------------------start-------------------
// 提取组件
function Comment(props) {
  return (
    <div className="Comment">
      <User user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

function User(props) {
  return (
    <div className='UserInfo'>
      <Avatar user={props.user} />
      <div className='UserInfo-name'>{props.user.name}</div>
    </div>
  );
}

function Avatar(props) {
  return (
    <img className='Avatar'
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
// ----------------------end---------------------

// ----------------------start-------------------
// 事件处理
class Toggle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    }
    this.handerClick = this.handerClick.bind(this);
  }

  handerClick() {
    // this.setState((prevState) => ({
    //   isToggleOn: !prevState.isToggleOn
    // }));
    this.setState({
      isToggleOn: !this.state.isToggleOn
    }, () => {
      console.log(this.state.isToggleOn);
    });
  }

  render() {
    return (
      <button onClick={this.handerClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
// ----------------------end---------------------

// ----------------------start-------------------
// 条件渲染
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
const element = <Greeting isLoggedIn={false} />
// ----------------------end---------------------

// ----------------------start-------------------

// ----------------------end---------------------

