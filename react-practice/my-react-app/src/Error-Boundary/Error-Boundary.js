import { PureComponent } from "react";

export default class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <p style={{color: '#ff0000'}}>something went wrong!</p>
    }
    return this.props.children;
  }
}
