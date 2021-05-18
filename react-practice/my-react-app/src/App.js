import Router from './Router/Router';
import ErrorBoundary from './Error-Boundary/Error-Boundary';

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
      </ErrorBoundary>
    </Router>
  );
}
