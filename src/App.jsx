import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Carrinho from './components/Cart';
import Checkout from './components/Checkout';
import Cabecalho from './components/Header';
import Jogos from './components/Games';
import { CarrinhoContextProvider } from './store/CartContext';
import { UserProgressContextProvider } from './store/UserProgressContext';
import { GameProvider } from './store/GameContext';
import ListaJogosEdicao from './components/EditGamesList';

function Loja() {
  return (
    <>
      <Cabecalho />
      <Jogos />
      <Carrinho />
      <Checkout />
    </>
  );
}

function Admin() {
  return (
    <>
      <GameProvider>
        <Cabecalho />
        <ListaJogosEdicao />
      </GameProvider>
    </>
  );
}

function App() {
  return (
    <UserProgressContextProvider>
      <CarrinhoContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Loja />} />
            <Route path='/admin' element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </CarrinhoContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
