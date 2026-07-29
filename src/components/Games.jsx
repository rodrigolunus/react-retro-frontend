import Game from './Game';
import useHttp from '../hooks/useHttp';
import Erro from './Erro';

const requestConfig = {};

export default function Jogos() {
  const { data: loadedGames, isLoading, erro } = useHttp('http://localhost:8080/games', requestConfig, []);

  if (isLoading) {
    return <p className='center'>Carregando jogos...</p>;
  }

  if (erro) {
    return <Erro titulo='Erro ao carregar os jogos' messagem={erro} />;
  }

  return (
    <ul id='games'>
      {loadedGames.map(game => (
        <Game key={game.id} game={game} />
      ))}
    </ul>
  );
}
