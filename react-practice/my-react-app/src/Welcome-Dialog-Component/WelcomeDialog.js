export default function WelcomeDialog(props) {
  return <FuncyBorder top={<h1>hello</h1>} bottom={<h1>hello1</h1>} />;
}

function FuncyBorder(props) {
  return (
    <>
      {/* {props.top}
      {props.bottom} */}
      <img src="./logo192.png" alt="react icon" width="100" height="100" />
    </>
  );
}
