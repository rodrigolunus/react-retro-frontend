// import  { useState, useEffect } from 'react';

// const API_URL = 'http://localhost:8080/produtos';

// export default function ProductList() {
//   const [produtos, setProdutos] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formData, setFormData] = useState({ nome: '', preco: '', imagem: '' });
//   const [mensagem, setMensagem] = useState('');

//   // 1. CARREGAR PRODUTOS (GET)
//   const fetchProdutos = async () => {
//     try {
//       const response = await fetch(API_URL);
//       if (!response.ok) throw new Error('Erro ao buscar produtos');
//       const data = await response.json();
//       setProdutos(data);
//     } catch (error) {
//       console.error('Erro ao carregar lista:', error);
//       setMensagem('Falha ao carregar os produtos do banco.');
//     }
//   };

//   useEffect(() => {
//     fetchProdutos();
//   }, []);

//   const handleEditClick = (produto) => {
//     setEditingProduct(produto);
//     setFormData({
//       nome: produto.nome,
//       preco: produto.preco,
//       imagem: produto.imagem || ''
//     });
//   };

//   const handleCancelEdit = () => {
//     setEditingProduct(null);
//     setFormData({ nome: '', preco: '', imagem: '' });
//   };

//   // 2. ATUALIZAR PRODUTO (PUT)
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${API_URL}/${editingProduct.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) throw new Error('Erro ao atualizar produto');

//       const updatedProduct = await response.json();

//       setProdutos(produtos.map(p => p.id === updatedProduct.id ? updatedProduct : p));
//       setMensagem('Produto atualizado com sucesso!');
//       handleCancelEdit();
//     } catch (error) {
//       console.error('Erro na atualização:', error);
//       setMensagem('Falha ao atualizar o produto.');
//     }
//   };

//   // 3. DELETAR PRODUTO (DELETE)
//   const handleDelete = async (id) => {
//     if (!window.confirm('Tem certeza que deseja excluir este produto do banco de dados?')) {
//       return;
//     }

//     try {
//       const response = await fetch(`${API_URL}/${id}`, {
//         method: 'DELETE'
//       });

//       if (!response.ok) {
//         throw new Error('Não foi possível excluir o produto.');
//       }

//       setProdutos(produtos.filter(p => p.id !== id));
//       setMensagem('Produto removido com sucesso!');
//     } catch (error) {
//       console.error('Erro ao deletar:', error);
//       setMensagem('Erro ao deletar produto. Pode haver pedidos vinculados a ele.');
//     }
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h2>Gerenciamento de Produtos (H2 Database)</h2>

//       {mensagem && (
//         <div style={{ padding: '10px', marginBottom: '15px', backgroundColor: '#e2e8f0', borderRadius: '4px', color:'black' }}>
//           {mensagem}
//         </div>
//       )}

//       {/* FORMULÁRIO DE EDIÇÃO */}
//       {editingProduct && (
//         <form onSubmit={handleUpdate} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
//           <h3>Editando Produto ID: {editingProduct.id}</h3>
//           <div style={{ marginBottom: '10px' }}>
//             <label>Nome: </label>
//             <input
//               type="text"
//               value={formData.nome}
//               onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
//               required
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label>Preço: </label>
//             <input
//               type="number"
//               step="0.01"
//               value={formData.preco}
//               onChange={(e) => setFormData({ ...formData, preco: parseFloat(e.target.value) })}
//               required
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label>URL Imagem: </label>
//             <input
//               type="text"
//               value={formData.imagem}
//               onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
//             />
//           </div>
//           <button type="submit" style={{ marginRight: '10px', backgroundColor: '#22c55e', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>
//             Salvar Alterações
//           </button>
//           <button type="button" onClick={handleCancelEdit} style={{ backgroundColor: '#64748b', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>
//             Cancelar
//           </button>
//         </form>
//       )}

//       {/* TABELA DE PRODUTOS */}
//       <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr style={{ backgroundColor: '#f1f5f9' }}>
//             <th>ID</th>
//             <th>Nome</th>
//             <th>Preço</th>
//             <th>Ações</th>
//           </tr>
//         </thead>
//         <tbody>
//           {produtos.length === 0 ? (
//             <tr>
//               <td colSpan="4" style={{ textAlign: 'center' }}>Nenhum produto encontrado.</td>
//             </tr>
//           ) : (
//             produtos.map((produto) => (
//               <tr key={produto.id}>
//                 <td>{produto.id}</td>
//                 <td>{produto.nome}</td>
//                 <td>R$ {produto.preco ? produto.preco.toFixed(2) : '0.00'}</td>
//                 <td>
//                   <button
//                     onClick={() => handleEditClick(produto)}
//                     style={{ marginRight: '8px', backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px' }}
//                   >
//                     Editar
//                   </button>
//                   <button
//                     onClick={() => handleDelete(produto.id)}
//                     style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px' }}
//                   >
//                     Excluir
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import useHttp from '../hooks/useHttp';

const API_URL = 'http://localhost:8080/produtos';
const CATEGORIAS_URL = 'http://localhost:8080/categorias';

const requestConfig = { method: 'GET' };

export default function ProductList() {
  const [editingProduct, setEditingProduct] = useState(null);
  
  // 1. Adicionamos 'categorias' no estado do formulário (inicia como array vazio)
  const [formData, setFormData] = useState({ 
    nome: '', 
    preco: '', 
    imagem: '', 
    categorias: [] 
  });
  
  const [mensagem, setMensagem] = useState('');

  // Busca lista de produtos
  const {
    data: produtos,
    isLoading,
    error: fetchError,
    sendRequest: fetchProdutos,
  } = useHttp(API_URL, requestConfig, []);

  // 2. Busca lista de TODAS as categorias do sistema para preencher o <select>
  const {
    data: categoriasDisponiveis,
    sendRequest: fetchCategorias
  } = useHttp(CATEGORIAS_URL, requestConfig, []);

  // 3. Preenche o formulário ao clicar em Editar
  const handleEditClick = (produto) => {
    setEditingProduct(produto);
    setFormData({
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem || '',
      // Se o produto já possui categorias, extrai apenas os IDs: [1, 2]
      categorias: produto.categorias ? produto.categorias.map(cat => cat.id) : []
    });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setFormData({ nome: '', preco: '', imagem: '', categorias: [] });
  };

  // 4. Manipula a seleção múltipla de categorias no formulário
  const handleCategoryChange = (e) => {
    // Captura todas as opções selecionadas no <select multiple>
    const selectedOptions = Array.from(e.target.selectedOptions, option => Number(option.value));
    setFormData({ ...formData, categorias: selectedOptions });
  };

  // 5. ATUALIZAR PRODUTO (PUT)
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Formata o payload para o padrão que o Spring Boot espera:
    // Transforma [1, 2] em [{ id: 1 }, { id: 2 }]
    const payload = {
      ...formData,
      categorias: formData.categorias.map(id => ({ id }))
    };

    try {
      const response = await fetch(`${API_URL}/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Erro ao atualizar produto.');

      setMensagem('Produto atualizado com sucesso!');
      handleCancelEdit();
      fetchProdutos();
    } catch (err) {
      console.error('Erro na atualização:', err);
      setMensagem('Falha ao atualizar o produto.');
    }
  };

  // DELETAR PRODUTO (DELETE)
  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto do banco de dados?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Não foi possível excluir o produto.');

      setMensagem('Produto removido com sucesso!');
      fetchProdutos();
    } catch (err) {
      console.error('Erro ao deletar:', err);
      setMensagem('Erro ao deletar produto. Pode haver pedidos vinculados a ele.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Gerenciamento de Produtos (H2 Database)</h2>

      {(mensagem || fetchError) && (
        <div style={{ padding: '10px', marginBottom: '15px', backgroundColor: fetchError ? '#fee2e2' : '#e2e8f0', borderRadius: '4px', color: 'black' }}>
          {fetchError || mensagem}
        </div>
      )}

      {/* FORMULÁRIO DE EDIÇÃO */}
      {editingProduct && (
        <form onSubmit={handleUpdate} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h3>Editando Produto ID: {editingProduct.id}</h3>
          
          <div style={{ marginBottom: '10px' }}>
            <label>Nome: </label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Preço: </label>
            <input
              type="number"
              step="0.01"
              value={formData.preco}
              onChange={(e) => setFormData({ ...formData, preco: parseFloat(e.target.value) })}
              required
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>URL Imagem: </label>
            <input
              type="text"
              value={formData.imagem}
              onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
            />
          </div>

          {/* CAMPO DE SELEÇÃO DE CATEGORIAS */}
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Categorias (segure Ctrl/Cmd para selecionar várias):
            </label>
            <select
              multiple
              value={formData.categorias}
              onChange={handleCategoryChange}
              style={{ width: '100%', height: '80px', padding: '5px' }}
            >
              {categoriasDisponiveis && categoriasDisponiveis.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" style={{ marginRight: '10px', backgroundColor: '#22c55e', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>
            Salvar Alterações
          </button>
          <button type="button" onClick={handleCancelEdit} style={{ backgroundColor: '#64748b', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>
            Cancelar
          </button>
        </form>
      )}

      {/* TABELA DE PRODUTOS */}
      {isLoading ? (
        <p>Carregando produtos...</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9' }}>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Categorias</th> {/* Nova Coluna */}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {!produtos || produtos.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>Nenhum produto encontrado.</td>
              </tr>
            ) : (
              produtos.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
                  <td>R$ {produto.preco ? Number(produto.preco).toFixed(2) : '0.00'}</td>
                  
                  {/* EXIBIÇÃO DAS CATEGORIAS NA TABELA */}
                  <td>
                    {produto.categorias && produto.categorias.length > 0
                      ? produto.categorias.map(c => c.nome).join(', ')
                      : 'Sem categoria'}
                  </td>

                  <td>
                    <button
                      onClick={() => handleEditClick(produto)}
                      style={{ marginRight: '8px', backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px' }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(produto.id)}
                      style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px' }}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}