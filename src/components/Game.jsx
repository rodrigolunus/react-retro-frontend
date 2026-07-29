import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import { useContext } from 'react';

export default function Game({ game }) {
  const cartCtx = useContext(CartContext);

  function addToTheCart() {
    cartCtx.addItem(game);
  }

  return (
    <li className='game'>
      <article>
        <img src={`http://localhost:8080/${game.imagem}`} alt={game.nome} />

        <div>
          <h3>{game.nome}</h3>
          <p className='game-price'>{currencyFormatter.format(game.preco)}</p>
        </div>
        <p className='game-actions'>
          <Button onClick={addToTheCart}>Adicionar ao Carrinho</Button>
        </p>
      </article>
    </li>
  );
}
