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


// src/App.jsx
import { ProductProvider } from './store/ProductContext';
import  ProductList  from './components/ProductList';


function MainContent() {

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto', padding: '20px', color: '#333' }}>
      <header style={{ backgroundColor: '#1f2937', color: '#fff', padding: '24px', borderRadius: '12px', marginBottom: '30px' }}>
        <h1 style={{ margin: 0 }}>Loja Dev React</h1>
        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.8 }}>Estrutura de arquivos com Context API</p>
      </header>

      <main style={{ backgroundColor: '#f9fafb', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        {/* Alterna dinamicamente entre a Lista e os Detalhes */}
        <ProductList /> 
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ProductProvider>
      <MainContent />
    </ProductProvider>
  );
}