import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorBoundary from './Error-Boundary/Error-Boundary';
import { NumberList, Blog } from './List-Component/NumberList';
import NameForm from './Form-Component/NameForm';
import Calculator from './Lifting-Component/Calculator';
import WelcomeDialog from './Welcome-Dialog-Component/WelcomeDialog';
import LoginController from './LoginController-Component/LoginController';
import Home from './Home/Home';

const FilterableProductTable = React.lazy(() => import('./Table-Product/Filterable-Product-Table'));

export default function App() {
  const posts = [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
  ];
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<div style={{ color: 'red' }}>Laoding...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/table" component={FilterableProductTable} />
            <Route path="/list" component={NumberList} />
            <Route path="/dialog" component={WelcomeDialog} />
            <Route path="/login" component={LoginController} />
            <Route path="/calculator" component={Calculator} />
          </Switch>
          {/* <NumberList numbers={numbers} />
          <hr />
          <Blog posts={posts} />
          <hr />
          <NameForm />
          <hr />
          <Calculator />
          <hr />
          <WelcomeDialog />
          <FilterableProductTable products={PRODUCTS} /> */}
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}
