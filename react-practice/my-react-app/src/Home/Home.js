import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/table">Table</Link>
      </li>
      <li>
        <Link to="/list">List</Link>
      </li>
      <li>
        <Link to="/dialog">Dialog</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/calculator/10">Calculator</Link>
      </li>
      <li>
        <Link to="/forwardref">Forwardref</Link>
      </li>
      <li>
        <Link to="/hooks/1">Hooks</Link>
      </li>
      <li>
        <Link to="/context">Context</Link>
      </li>
      <li>
        <Link to="/mouse">Mouse</Link>
      </li>
    </ul>
  );
}
