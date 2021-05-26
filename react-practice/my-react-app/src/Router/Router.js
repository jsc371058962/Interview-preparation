import React, { PureComponent, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NumberList } from '../List-Component/NumberList';
import ErrorBoundary from '../Error-Boundary/Error-Boundary';
import Home from '../Home/Home';
import App from '../App';

const Calculator = lazy(() => import('../Lifting-Component/Calculator'));
const WelcomeDialog = lazy(() => import('../Welcome-Dialog-Component/WelcomeDialog'));
const LoginController = lazy(() => import('../LoginController-Component/LoginController'));
const FilterableProductTable = lazy(() => import('../Table-Product/Filterable-Product-Table'));
const Forwardref = lazy(() => import('../Forwardref-Component/Forwardref'));
const Hooks = lazy(() => import('../Hooks-Component/Hooks'));

const routes = [{
    path: '/',
    Component: Home,
    exact: true
  },
  {
    path: '/table',
    Component: FilterableProductTable
  },
  {
    path: '/list',
    Component: NumberList
  },
  {
    path: '/dialog',
    Component: WelcomeDialog
  },
  {
    path: '/login',
    Component: LoginController
  },
  {
    path: '/calculator/:number',
    Component: Calculator
  },
  {
    path: '/forwardref',
    Component: Forwardref
  },
  {
    path: '/hooks',
    Component: Hooks
  }
];
function mapRoute(routes) {
  return routes.map(({ path, exact, Component }, index) => {
    return (
      <Route
        key={path}
        path={path}
        exact={exact ? exact : false}
        render={(props) => <Component {...props} />}
      />
    );
  });
}

// Do route thing.
export default class Router extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<div style={{ color: 'red' }}>Laoding...</div>}>
            <Switch>
              <App>{mapRoute(routes)}</App>
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    );
  }
}
