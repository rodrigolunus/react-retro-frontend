import { currencyFormatter } from '../util/formatting';

export default function CartItem({ nome, quantidade,  preco, onIncrease, onDecrease }) {
  return (
    <li className='cart-item'>
      <p>
        {nome} - {quantidade} X {currencyFormatter.format(preco)}
      </p>
      <p className='cart-item-actions'>
        <button onClick={onDecrease}>-</button>
        <span>{quantidade}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
