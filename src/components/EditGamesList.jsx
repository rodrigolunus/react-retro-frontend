import { useState, useEffect } from 'react';
import useHttp from '../hooks/useHttp';

const API_URL = 'http://localhost:8080/games';
const CATEGORIAS_URL = 'http://localhost:8080/categorias';

const requestConfig = { method: 'GET' };

export default function EditGamesList() {
  const [editGame, setEditGame] = useState(null);

  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    imagem: '',
    categorias: [],
  });

  const [mensagem, setMensagem] = useState('');

  const { data: games, isLoading, error: fetchError, sendRequest: fetchGames } = useHttp(API_URL, requestConfig, []);

  const { data: categoriasDisponiveis, sendRequest: fetchCategorias } = useHttp(CATEGORIAS_URL, requestConfig, []);

  const handleEditClick = game => {
    setEditGame(game);
    setFormData({
      nome: game.nome,
      preco: game.preco,
      imagem: game.imagem || '',
      categorias: game.categorias ? game.categorias.map(cat => cat.id) : [],
    });
  };

  const handleCancelEdit = () => {
    setEditGame(null);
    setFormData({ nome: '', preco: '', imagem: '', categorias: [] });
  };

  const handleCategoryChange = e => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => Number(option.value));
    setFormData({ ...formData, categorias: selectedOptions });
  };

  const handleUpdate = async e => {
    e.preventDefault();

    const payload = {
      ...formData,
      categorias: formData.categorias.map(id => ({ id })),
    };

    try {
      const response = await fetch(`${API_URL}/${editGame.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Erro ao atualizar o game.');

      setMensagem('Game atualizado com sucesso!');
      handleCancelEdit();
      fetchGames();
    } catch (err) {
      console.error('Erro na atualização:', err);
      setMensagem('Falha ao atualizar o game.');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Tem certeza que deseja excluir este game do banco de dados?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Não foi possível excluir o game.');

      setMensagem('Game removido com sucesso!');
      fetchGames();
    } catch (err) {
      console.error('Erro ao deletar:', err);
      setMensagem('Erro ao deletar game. Pode haver pedidos vinculados a ele.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Lista de Games Cadastrados</h2>

      {(mensagem || fetchError) && (
        <div
          style={{
            padding: '10px',
            marginBottom: '15px',
            backgroundColor: fetchError ? '#fee2e2' : '#e2e8f0',
            borderRadius: '4px',
            color: 'black',
          }}
        >
          {fetchError || mensagem}
        </div>
      )}

      {isLoading ?
        <p>Carregando...</p>
      : <table>
          <thead className='game'>
            <tr>
              <th>ID</th>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Categorias</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className='game'>
            {!games || games.length === 0 ?
              <tr>
                <td colSpan='5' style={{ textAlign: 'center' }}>
                  Nenhum game encontrado.
                </td>
              </tr>
            : games.map(game => (
                <tr key={game.id}>
                  <td>{game.id}</td>
                  <td>
                    <img src={`http://localhost:8080/${game.imagem}`} alt={game.nome} />
                  </td>
                  <td>{game.nome}</td>
                  <td>R$ {game.preco ? Number(game.preco).toFixed(2) : '0.00'}</td>

                  <td>
                    {game.categorias && game.categorias.length > 0 ?
                      game.categorias.map(c => c.nome).join(', ')
                    : 'Sem categoria'}
                  </td>

                  <td>
                    <button
                      onClick={() => handleEditClick(game)}
                      style={{
                        marginRight: '8px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        borderRadius: '3px',
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(game.id)}
                      style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        borderRadius: '3px',
                      }}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      }
      {editGame && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '550px',
            height: '100vh',
            boxShadow: '-4px 0 10px rgba(0,0,0,0.1)',
            padding: '20px',
            zIndex: 1000,
            overflowY: 'auto',
          }}
        >
          <form
            onSubmit={handleUpdate}
            style={{ marginBottom: '20px', padding: '25px', border: '1px solid #ccc', borderRadius: '5px' }}
          >
            <h3>
              Editando Game ID: {editGame.id} Nome: {editGame.nome}{' '}
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <label>Nome: </label>
              <input
                style={{ width: '250px' }}
                type='text'
                value={formData.nome}
                onChange={e => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label>Preço: </label>
              <input
                style={{ width: '100px' }}
                type='number'
                step='1.00'
                value={formData.preco}
                onChange={e => setFormData({ ...formData, preco: parseFloat(e.target.value) })}
                required
              />
              <label style={{ marginLeft: '10px' }}>Imagem: </label>
              <input
                style={{ width: '100 px' }}
                type='text'
                value={formData.imagem}
                onChange={e => setFormData({ ...formData, imagem: e.target.value })}
              />
            </div>

            <div style={{ marginBottom: '20px' }}></div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Categorias (segure Ctrl/Cmd para selecionar várias):
              </label>
              <select
                multiple
                value={formData.categorias}
                onChange={handleCategoryChange}
                style={{ width: '100%', height: '90px', padding: '5px' }}
              >
                {categoriasDisponiveis &&
                  categoriasDisponiveis.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nome}
                    </option>
                  ))}
              </select>
            </div>

            <button
              type='submit'
              style={{
                marginRight: '10px',
                backgroundColor: '#22c55e',
                color: 'white',
                padding: '5px 10px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Salvar Alterações
            </button>
            <button
              type='button'
              onClick={handleCancelEdit}
              style={{
                backgroundColor: '#64748b',
                color: 'white',
                padding: '5px 10px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
