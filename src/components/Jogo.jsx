import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import CarrinhoContext from '../store/CarrinhoContext';
import { useContext } from 'react';

export default function Jogo({ jogo }) {
  const cartCtx = useContext(CarrinhoContext);

  function adicionarJogoAoCarrinho() {
    cartCtx.addItem(jogo);
  }

  return (
    <li className='jogo'>
      <article>
        <img src={`http://localhost:8080/${jogo.imagem}`} alt={jogo.nome} />

        <div>
          <h3>{jogo.nome}</h3>
          <p className='jogo-preco'>{currencyFormatter.format(jogo.preco)}</p>
        </div>
        <p className='jogo-actions'>
          <Button onClick={adicionarJogoAoCarrinho}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
