import Jogo from './Jogo';
import useHttp from '../hooks/useHttp';
import Erro from './Erro';

const requestConfig = {};

export default function Jogos() {
  const { data: jogosCarregados, isLoading, erro } = useHttp('http://localhost:8080/produtos', requestConfig, []);

  if (isLoading) {
    return <p className='center'>Carregando jogos...</p>;
  }

  if (erro) {
    return <Erro titulo='Erro ao carregar os jogos' messagem={erro} />;
  }

  return (
    <ul id='jogos'>
      {jogosCarregados.map(jogo => (
        <Jogo key={jogo.id} jogo={jogo} />
      ))}
    </ul>
  );
}
