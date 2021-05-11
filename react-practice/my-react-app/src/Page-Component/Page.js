import React, { PureComponent } from 'react';
import { WarningBanner } from './WarningBanner';

export default class Page extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowWarning: false,
    };
    this.handlerChangeStage = this.handlerChangeStage.bind(this);
  }

  handlerChangeStage() {
    this.setState((prevState) => ({
      isShowWarning: !prevState.isShowWarning,
    }));
  }

  componentDidUpdate() {
    console.log(123)
  }

  render() {
    const { isShowWarning } = this.state;
    return (
      <>
        <WarningBanner isWarn={isShowWarning} />
        <button onClick={this.handlerChangeStage}>
          {isShowWarning ? 'Hide' : 'Show'}
        </button>
      </>
    );
  }
}

