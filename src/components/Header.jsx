import { useContext } from 'react';

import Button from './UI/Button';
import logoImg from '../assets/logo.jpg';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((itensTotais, item) => {
    return itensTotais + item.quantidade;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='Loja De Games Retro' />
        <h1>React Retro Games</h1>
      </div>
      <nav>
        {location.pathname !== '/admin' && (
          <Button textOnly onClick={handleShowCart}>
            Carrinho ({totalCartItems})
          </Button>
        )}
      </nav>
    </header>
  );
}
