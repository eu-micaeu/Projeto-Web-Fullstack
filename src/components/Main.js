import React, { useCallback, useEffect, useState } from 'react';
import '../css/Main.css';
import { TextField, CircularProgress, Button } from '@mui/material';
import Context from '../context/Context';
import PopUp from './PopUp';

const Main = () => {

    const [times, setTimes] = useState([]);

    const [carregando, setCarregando] = useState(true);

    const [erro, setErro] = useState(null);

    const [abrirDialogo, setAbrirDialogo] = useState(false);

    const [timeSelecionado, setTimeSelecionado] = useState(null);

    const [timePesquisado, setTimePesquisado] = useState('');

    const buscarTimes = async () => {
        //atribuindo a api da nba a url e retorna o sdados sobre os times da NBA, essa url vai ser usada na requisição
        const url = 'https://api-nba-v1.p.rapidapi.com/teams';
        //armazena um objeto com as configurações da requisição HTTP
        const options = {
            //definição do metode de requisição
            method: 'GET',
            //definição dos cabeçalhos
            headers: {
                //chave de autenticação para acessar a API RapidAPI
                'x-rapidapi-key': '05f2638448msh7eb4366633a637dp1dc4b8jsnb2a6350471af',
                //define o nomedo host para direcionar a requisição ao serviço correto
                'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'

            }

        };


        try {
            //tentativa de requisição passando como parametros a url e options
            const response = await fetch(url, options);
            //verifica a resposta da requisição que se no caso for falso vai mandar uma mensagem de erro 
            if (!response.ok) {

                throw new Error('Erro ao buscar dados');

            }
            //Caso ocorra tudo bem que com a requisição, converte os dados da resposta para o formato JSON 
            const result = await response.json();
            // Atualiza o estado 'times' com os dados obtidos da resposta (em result.response).
            setTimes(result.response || []);

        } catch (error) {
            // Atualiza o estado 'erro' com o objeto de erro capturado
            setErro(error);

        } finally {
            //quando a requisição for concluida, o estado de carregando vai para false
            setCarregando(false);

        }

    };

    function pesquisarTime() {
        // consição que verifica se o tero de pesquisa esta vazio
        if (timePesquisado.trim() === '') {
            //se tiver vazio, carrega todos os times com as função "buscarTimes()"
            buscarTimes();

            return;
            //verifica se o termo de pesquisa tem menos de 3 caracteres
        } else if (timePesquisado.trim().length < 3) {

            alert("O termo de busca deve ter pelo menos 3 caracteres");

            return;
        }

        const url = `https://api-nba-v1.p.rapidapi.com/teams?search=${timePesquisado}`;

        const options = {

            method: 'GET',

            headers: {

                'x-rapidapi-key': '05f2638448msh7eb4366633a637dp1dc4b8jsnb2a6350471af',
                'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'

            }

        };

        try {
            //tentaiva de fazer uma requisição para a api
            fetch(url, options)

                .then((response) => response.json())// Converte a resposta da API para JSON

                .then((result) => {

                    setTimes(result.response || []);// Atualiza o estado times com os dados recebidos

                    setErro(null);// Reseta o estado de erro, já que a requisição foi bem-sucedida

                })

                .catch((error) => setErro('Erro ao buscar dados'));//Caso ocorra um erro na requisição, é atualizado o estado do erro

        } catch (error) {

            setErro(error.message);

        }

    }

    useEffect(() => {

        buscarTimes();

    }, []);

    const abrirPopUp = useCallback((time) => {

        setTimeSelecionado(time);

        setAbrirDialogo(true);

    }, []);

    if (carregando) {

        return (

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>

                <CircularProgress style={{ color: '#F24822' }} />

            </div>

        );

    }

    if (erro) return <div>Erro: {typeof erro === 'string' ? erro : erro.message}</div>;

    return (

        <main>

            <p>*Pesquise e clique nos times para saber a sua média de pontos, assistências e rebotes na temporada passada!</p>

            <div id="searchBox">

                <TextField

                    variant="outlined"
                    placeholder="Buscar time"
                    sx={{
                        width: '80%',
                        fontFamily: 'Segoe UI',
                        padding: '0px',
                        minHeight: '50px',
                    }}
                    onChange={(e) => setTimePesquisado(e.target.value)}

                />
                
                <Button

                    variant="contained"
                    size="small"
                    sx={{
                        margin: '0 10px',
                        width: '20%',
                        backgroundColor: '#F24822',
                        fontFamily: 'Segoe UI',
                        minHeight: '50px',
                    }}
                    onClick={
                        pesquisarTime
                    }

                >

                    Buscar

                </Button>

            </div>

            <div id='resultados'>

                <ul>

                    {times

                        .filter((time) => time.nbaFranchise === true && time.name !== 'Home Team Stephen A')

                        .map((time) => (

                            <li key={time.id} onClick={() => abrirPopUp(time)}>

                                <img src={time.logo} alt={time.name} width={75} height={75} />

                            </li>

                        ))}

                </ul>

            </div>

            <Context.Provider value={[timeSelecionado, abrirDialogo, setAbrirDialogo, setTimePesquisado]}>

                <PopUp />

            </Context.Provider>

        </main>

    );

};

export default Main;