export default function Error({ titulo, messagem }) {
  return (
    <div className='erro'>
      <h2>{titulo}</h2>
      <p>{messagem}</p>
    </div>
  );
}
