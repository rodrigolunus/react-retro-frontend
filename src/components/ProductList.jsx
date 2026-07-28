import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080/produtos';

export default function ProductList() {
  const [produtos, setProdutos] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ nome: '', preco: '', imagem: '' });
  const [mensagem, setMensagem] = useState('');

  // 1. CARREGAR PRODUTOS (GET)
  const fetchProdutos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erro ao buscar produtos');
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao carregar lista:', error);
      setMensagem('Falha ao carregar os produtos do banco.');
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleEditClick = (produto) => {
    setEditingProduct(produto);
    setFormData({
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem || ''
    });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setFormData({ nome: '', preco: '', imagem: '' });
  };

  // 2. ATUALIZAR PRODUTO (PUT)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Erro ao atualizar produto');

      const updatedProduct = await response.json();

      setProdutos(produtos.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      setMensagem('Produto atualizado com sucesso!');
      handleCancelEdit();
    } catch (error) {
      console.error('Erro na atualização:', error);
      setMensagem('Falha ao atualizar o produto.');
    }
  };

  // 3. DELETAR PRODUTO (DELETE)
  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto do banco de dados?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Não foi possível excluir o produto.');
      }

      setProdutos(produtos.filter(p => p.id !== id));
      setMensagem('Produto removido com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar:', error);
      setMensagem('Erro ao deletar produto. Pode haver pedidos vinculados a ele.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Gerenciamento de Produtos (H2 Database)</h2>

      {mensagem && (
        <div style={{ padding: '10px', marginBottom: '15px', backgroundColor: '#e2e8f0', borderRadius: '4px' }}>
          {mensagem}
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
          <button type="submit" style={{ marginRight: '10px', backgroundColor: '#22c55e', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>
            Salvar Alterações
          </button>
          <button type="button" onClick={handleCancelEdit} style={{ backgroundColor: '#64748b', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>
            Cancelar
          </button>
        </form>
      )}

      {/* TABELA DE PRODUTOS */}
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f5f9' }}>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>Nenhum produto encontrado.</td>
            </tr>
          ) : (
            produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>R$ {produto.preco ? produto.preco.toFixed(2) : '0.00'}</td>
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
    </div>
  );
}