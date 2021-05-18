import { PureComponent } from 'react';
import SearchBar from './Search-Bar';
import ProductTable from './Product-Table';

export default class FilterableProductTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      isStocked: false,
    };
    this.handlerInput = this.handlerInput.bind(this);
    this.handlerStock = this.handlerStock.bind(this);
  }

  handlerInput(e) {
    console.log(e.target.value);
    this.setState({ filter: e.target.value });
  }

  handlerStock(e) {
    this.setState({ isStocked: !this.state.isStocked });
  }

  render() {
    const { isStocked, filter } = this.state;
    return (
      <>
        <SearchBar
          filter={filter}
          isStocked={isStocked}
          onHandlerInput={this.handlerInput}
          onHandlerStock={this.handlerStock}
        />
        <ProductTable
          products={this.props.products}
          filter={filter}
          isStocked={isStocked}
        />
      </>
    );
  }
}
