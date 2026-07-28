// src/components/ProductItem.jsx
import  { useState } from 'react';
import { useProduct } from '../store/ProductContext.jsx';

export function ProductItem({ product, onSave }) {
  const { editingId, startEditing, cancelEditing } = useProduct();
  
  // Verifica se ESTE produto especificamente está em modo de edição
  const isEditing = editingId === product.id;

  // Estados locais para controlar os inputs de edição
  const [nome, setNome] = useState(product.nome);
  const [preco, setPreco] = useState(product.preco);

  const handleSave = () => {
    // Envia o id e os novos dados para a função de salvar
    onSave(product.id, { nome, preco: Number(preco) });
    cancelEditing();
  };

  const handleCancel = () => {
    // Restaura os valores originais se cancelar
    setNome(product.nome);
    setPreco(product.preco);
    cancelEditing();
  };

  return (
    <div style={cardStyle}>
      {isEditing ? (
        // --- MODO DE EDIÇÃO ---
        <div style={formStyle}>
          <label style={labelStyle}>
            Nome:
            <input 
              type="text" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Preço (R$):
            <input 
              type="number" 
              value={preco} 
              onChange={(e) => setPreco(e.target.value)} 
              style={inputStyle}
            />
          </label>

          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <button style={saveButtonStyle} onClick={handleSave}>Salvar</button>
            <button style={cancelButtonStyle} onClick={handleCancel}>Cancelar</button>
          </div>
        </div>
      ) : (
        // --- MODO DE VISUALIZAÇÃO ---
        <div>
          <h3 style={{ margin: '0 0 8px 0' }}>{product.nome}</h3>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#059669', margin: '0 0 16px 0' }}>
            {Number(product.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <button style={editButtonStyle} onClick={() => startEditing(product.id)}>
            Editar Produto
          </button>
        </div>
      )}
    </div>
  );
}

// Estilos
const cardStyle = {
  backgroundColor: '#fff',
  padding: '16px',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#374151',
};

const inputStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #d1d5db',
  marginTop: '4px',
  fontSize: '14px',
};

const editButtonStyle = {
  backgroundColor: '#2563eb',
  color: '#fff',
  border: 'none',
  padding: '8px 14px',
  borderRadius: '6px',
  cursor: 'pointer',
  width: '100%',
  fontWeight: 'bold',
};

const saveButtonStyle = {
  backgroundColor: '#059669',
  color: '#fff',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  flex: 1,
  fontWeight: 'bold',
};

const cancelButtonStyle = {
  backgroundColor: '#ef4444',
  color: '#fff',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  flex: 1,
  fontWeight: 'bold',
};