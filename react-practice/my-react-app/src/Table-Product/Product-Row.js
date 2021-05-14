export default function ProductRow(props) {
  const { name, price, stocked } = props.data;
  return (
    <tr>
      <td>{stocked ? name : <span style={{ color: 'red' }}>{name}</span>}</td>
      <td>{price}</td>
    </tr>
  );
}
