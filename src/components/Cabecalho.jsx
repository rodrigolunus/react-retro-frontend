import { useContext } from 'react';

import Button from './UI/Button';
import logoImg from '../assets/logo.jpg';
import CartContext from '../store/CarrinhoContext';
import UserProgressContext from '../store/UsuarioContext';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantidade;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='A restaurant' />
        <h1>React Retro Games</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
