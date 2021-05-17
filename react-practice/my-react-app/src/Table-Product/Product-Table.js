import ProductCategoryRow from './Product-Category-Row';
import ProductRow from './Product-Row';

export default function ProductTable(props) {
  const products = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
  ];
  const { filter, isStocked } = props;
  const row = [];
  const categoryArr = [];
  for (const element of products) {
    if (!element.name.includes(filter)) {
      continue;
    }
    if (!element.stocked && isStocked) {
      continue;
    }
    if (!categoryArr.includes(element.category)) {
      categoryArr.push(element.category);
      row.push(
        <ProductCategoryRow
          key={element.category}
          category={element.category}
        />
      );
    }

    row.push(<ProductRow key={element.name} data={element} />);
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{row}</tbody>
    </table>
  );
}
