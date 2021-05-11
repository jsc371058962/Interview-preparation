import { NumberList, Blog } from './List-Component/NumberList';
import NameForm from './Form-Component/NameForm';
import Calculator from './Lifting-Component/Calculator';
import WelcomeDialog from './Welcome-Dialog-Component/WelcomeDialog';

export default function App() {
  const numbers = [1, 2, 3, 4, 5];
  const posts = [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
  ];
  return (
    <>
      <NumberList numbers={numbers} />
      <hr />
      <Blog posts={posts} />
      <hr />
      <NameForm />
      <hr />
      <Calculator />
      <hr />
      <WelcomeDialog />
    </>
  );
}
