import { Link } from 'react-router-dom';

export default function Home() {
  return <ul>
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
      <Link to="/calculator">Calculator</Link>
    </li>
  </ul>
}
