import ProductCategoryRow from './Product-Category-Row';
import ProductRow from './Product-Row';

export default function ProductTable(props) {
  const { filter, products, isStocked } = props;
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
