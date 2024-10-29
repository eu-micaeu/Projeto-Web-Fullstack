import React, { useEffect, useState } from 'react';
import '../css/Main.css';

const Main = () => {
    
    const [jogos, setJogos] = useState([]);

    const [carregando, setCarregando] = useState(true);

    const [erro, setErro] = useState(null);

    useEffect(() => {

        const buscarJogos = async () => {

            const url = 'https://api-nba-v1.p.rapidapi.com/games?live=all';

            const options = {

                method: 'GET',

                headers: {

                    'x-rapidapi-key': '05f2638448msh7eb4366633a637dp1dc4b8jsnb2a6350471af',

                    'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'

                }

            };

            try {

                const response = await fetch(url, options);

                if (!response.ok) {

                    throw new Error('Erro ao buscar dados');

                }

                const result = await response.json();

                setJogos(result.response || []);

            } catch (error) {

                setErro(error);

            } finally {

                setCarregando(false);
            }

        };

        buscarJogos();
    }, []);

    if (carregando) return <div>Carregando...</div>;

    if (erro) return <div>Erro: {erro.message}</div>;

    return (

        <main>

            <h1>Jogos Hoje!</h1>

            <ul>

                {jogos.map((jogo) => (

                    <li key={jogo.id}>

                        <div>

                            <h2>{jogo.teams.home.name} vs {jogo.teams.visitors.name}</h2>

                            <div>

                                <img src={jogo.teams.home.logo} alt={`${jogo.teams.home.name} logo`} width={75} height={50}/>

                                <img src={jogo.teams.visitors.logo} alt={`${jogo.teams.visitors.name} logo`} width={75} height={50}/>

                            </div>

                            <p>{jogo.arena.name} - {jogo.arena.city}</p>

                            <p>Status: {jogo.status.long} (Clock: {jogo.status.clock})</p>

                            <p>Score: {jogo.scores.home.points} - {jogo.scores.visitors.points}</p>

                        </div>

                    </li>

                ))}

            </ul>

        </main>

    );

};

export default Main;
