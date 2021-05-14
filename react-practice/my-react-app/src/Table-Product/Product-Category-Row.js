export default function ProducrCategoryRow(props) {
  const { category } = props;
  return (
    <tr>
      <th colSpan='2'>{category}</th>
    </tr>
  );
}
