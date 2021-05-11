export function WarningBanner(props) {
  if (!props.isWarn) return null;
  return <div className='warning'>this is warning!</div>;
}
