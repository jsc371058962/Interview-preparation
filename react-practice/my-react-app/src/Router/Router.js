import React, { PureComponent, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NumberList } from '../List-Component/NumberList';
import Calculator from '../Lifting-Component/Calculator';
import WelcomeDialog from '../Welcome-Dialog-Component/WelcomeDialog';
import LoginController from '../LoginController-Component/LoginController';
import Home from '../Home/Home';

const FilterableProductTable = React.lazy(() => import('../Table-Product/Filterable-Product-Table'));

const routes = [
  {
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
]
function mapRoute(routes) {
  return routes.map((item) => {
    <Route ></Route>
  });
}
// Do route thing.
export default class Router extends PureComponent {
  render() {
    return (
      <>
        <Suspense fallback={<div style={{ color: 'red' }}>Laoding...</div>}>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/table' component={FilterableProductTable} />
              <Route path='/list' component={NumberList} />
              <Route path='/dialog' component={WelcomeDialog} />
              <Route path='/login' component={LoginController} />
              <Route path='/calculator' component={Calculator} />
            </Switch>
          </BrowserRouter>{' '}
        </Suspense>
      </>
    );
  }
}
