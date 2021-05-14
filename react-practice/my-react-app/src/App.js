// import { NumberList, Blog } from './List-Component/NumberList';
// import NameForm from './Form-Component/NameForm';
// import Calculator from './Lifting-Component/Calculator';
// import WelcomeDialog from './Welcome-Dialog-Component/WelcomeDialog';

// export default function App() {
//   const numbers = [1, 2, 3, 4, 5];
//   const posts = [
//     {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
//     {id: 2, title: 'Installation', content: 'You can install React from npm.'}
//   ];
//   return (
//     <>
//       <NumberList numbers={numbers} />
//       <hr />
//       <Blog posts={posts} />
//       <hr />
//       <NameForm />
//       <hr />
//       <Calculator />
//       <hr />
//       <WelcomeDialog />
//     </>
//   );
// }

import FilterableProductTable from './Table-Product/Filterable-Product-Table';

export default function App() {
  const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
  ];
  return (
    <>
      <FilterableProductTable products={PRODUCTS} />
    </>
  );
}
