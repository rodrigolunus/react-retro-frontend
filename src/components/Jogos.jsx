// import Jogo from './Jogo';
// import useHttp from '../hooks/useHttp';
// import Erro from './Erro';

// const requestConfig = {};

// export default function Jogos() {
//   const { data: jogosCarregados, isLoading, erro } = useHttp('http://localhost:8080/produtos', requestConfig, []);

//   if (isLoading) {
//     return <p className='center'>Carregando jogos...</p>;
//   }

//   if (erro) {
//     return <Erro titulo='Erro ao carregar os jogos' messagem={erro} />;
//   }

//   return (
//     <ul id='jogos'>
//       {jogosCarregados.map(jogo => (
//         <Jogo key={jogo.id} jogo={jogo} />
//       ))}
//     </ul>
//   );
// }

import { useEffect, useState } from 'react';
import Jogo from './Jogo';
import Erro from './Erro';

export default function Jogos() {
  const [jogosCarregados, setJogosCarregados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchJogos() {
      setIsLoading(true);
      setErro(null);

      try {
        const response = await fetch('http://localhost:8080/produtos');
        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message || 'Erro ao carregar os jogos.');
        }

        setJogosCarregados(resData);
      } catch (err) {
        setErro(err.message || 'Alguma coisa deu errado!');
      } finally {
        setIsLoading(false);
      }
    }

    fetchJogos();
  }, []);

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