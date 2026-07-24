import Carrinho from './components/Carrinho';
import Checkout from './components/Checkout';
import Cabecalho from './components/Cabecalho';
import Jogos from './components/Jogos';
import { CarrinhoContextProvider } from './store/CarrinhoContext';
import { UsuarioContextProvider } from './store/UsuarioContext';

function App() {
  return (
    <UsuarioContextProvider>
      <CarrinhoContextProvider>
        <Cabecalho />
        <Jogos />
        <Carrinho />
        <Checkout/>
      </CarrinhoContextProvider>
    </UsuarioContextProvider>
  );
}

export default App;
