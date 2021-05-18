import React, { PureComponent, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NumberList } from '../List-Component/NumberList';
import ErrorBoundary from '../Error-Boundary/Error-Boundary';
import Home from '../Home/Home';

const Calculator = lazy(() => import('../Lifting-Component/Calculator'));
const WelcomeDialog = lazy(() => import('../Welcome-Dialog-Component/WelcomeDialog'));
const LoginController = lazy(() => import('../LoginController-Component/LoginController'));
const FilterableProductTable = lazy(() => import('../Table-Product/Filterable-Product-Table'));

const routes = [{
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/table',
    component: FilterableProductTable
  },
  {
    path: '/list',
    component: NumberList
  },
  {
    path: '/dialog',
    component: WelcomeDialog
  },
  {
    path: '/login',
    component: LoginController
  },
  {
    path: '/calculator',
    component: Calculator
  }
];
function mapRoute(routes) {
  return routes.map(({path, exact, component}) => {
    return <Route path={path} exact={exact ? exact : ''} component={component}></Route>
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
              {mapRoute(routes)}
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    );
  }
}
