export default function SearchBar(props) {
  const { onHandlerInput, filter, isStocked, onHandlerStock } = props;
  return (
    <form>
      <input
        type='text'
        placeholder='Search...'
        onChange={onHandlerInput}
        value={filter}
      />
      <p>
        <input type='checkbox' onChange={onHandlerStock} checked={isStocked} />{' '}
        Only show products in stock
      </p>
    </form>
  );
}
