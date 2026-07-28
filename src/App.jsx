// import Carrinho from './components/Carrinho';
// import Checkout from './components/Checkout';
// import Cabecalho from './components/Cabecalho';
// import Jogos from './components/Jogos';
// import { CarrinhoContextProvider } from './store/CarrinhoContext';
// import { UsuarioContextProvider } from './store/UsuarioContext';

// function App() {
//   return (
//     <UsuarioContextProvider>
//       <CarrinhoContextProvider>
//         <Cabecalho />
//         <Jogos />
//         <Carrinho />
//         <Checkout/>
//       </CarrinhoContextProvider>
//     </UsuarioContextProvider>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Carrinho from './components/Carrinho';
import Checkout from './components/Checkout';
import Cabecalho from './components/Cabecalho';
import Jogos from './components/Jogos';
import { CarrinhoContextProvider } from './store/CarrinhoContext';
import { UsuarioContextProvider } from './store/UsuarioContext';
import { ProductProvider } from './store/ProductContext';
import ProductList from './components/ProductList';

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

function MainContent() {
  return (
    <>
      <ProductProvider>
        <Cabecalho />
        <ProductList />
      </ProductProvider>
    </>
  );
}

function App() {
  return (
    <UsuarioContextProvider>
      <CarrinhoContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Loja />} />
            <Route path='/admin' element={<MainContent />} />
          </Routes>
        </BrowserRouter>
      </CarrinhoContextProvider>
    </UsuarioContextProvider>
  );
}

export default App;
