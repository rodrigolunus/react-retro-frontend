import { useContext } from 'react';

import Modal from './UI/Modal.jsx';
import CarrinhoContext from '../store/CarrinhoContext.jsx';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import UsuarioContext from '../store/UsuarioContext.jsx';
import ItemCarrinho from './ItemCarrinho.jsx';

export default function Cart() {
  const carrinhoCtx = useContext(CarrinhoContext);
  const userProgressCtx = useContext(UsuarioContext);

  const cartTotal = carrinhoCtx.items.reduce((valorTotal, item) => valorTotal + item.quantidade * item.preco, 0);

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className='carrinho'
      open={userProgressCtx.progress === 'carrinho'}
      onClose={userProgressCtx.progress === 'carrinho' ? handleCloseCart : null}
    >
      <h2>Seu Carrinho</h2>
      <ul>
        {carrinhoCtx.items.map(item => (
          <ItemCarrinho
            key={item.id}
            nome={item.nome}
            quantidade={item.quantidade}
            preco={item.preco}
            onIncrease={() => carrinhoCtx.addItem(item)}
            onDecrease={() => carrinhoCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className='total-carrinho'>{currencyFormatter.format(cartTotal)}</p>
      <p className='modal-actions'>
        <Button textOnly onClick={handleCloseCart}>
          Fechar
        </Button>
        {carrinhoCtx.items.length > 0 && <Button onClick={handleGoToCheckout}> Fechar Compra</Button>}
      </p>
    </Modal>
  );
}
