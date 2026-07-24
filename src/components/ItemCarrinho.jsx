import { currencyFormatter } from '../util/formatting';

export default function CartItem({ nome, quantidade, preco, onIncrease, onDecrease }) {
  return (
    <li className='item-carrinho'>
      <p>
        {nome} - {quantidade} X {currencyFormatter.format(preco)}
      </p>
      <p className='item-carrinho-actions'>
        <button onClick={onDecrease}>-</button>
        <span>{quantidade}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
