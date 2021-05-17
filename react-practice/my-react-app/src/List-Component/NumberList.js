export function NumberList(props) {
  // const { numbers } = props;
  const numbers = [1, 2, 3, 4, 5];
  return (
    <ul>
      {numbers.map((number) => (
        <ListItem number={number} key={number.toString()} />
      ))}
    </ul>
  );
}

function ListItem(props) {
  return <li>{props.number}</li>;
}

export function Blog(props) {
  const { posts } = props;
  const sidebar = (
    <ul>
      {posts.map((bar) => (
        <li id={bar.id} key={bar.id}>
          {bar.title}
        </li>
      ))}
    </ul>
  );
  const content = (
    <ul>
      {posts.map((item) => (
        <li id={item.id} key={item.id}>
          {item.content}
        </li>
      ))}
    </ul>
  );
  return (
    <>
      {sidebar}
      <hr />
      {content}
    </>
  );
}
