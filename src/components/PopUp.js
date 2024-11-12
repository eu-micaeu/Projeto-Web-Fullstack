import React, { useCallback, useContext, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, CircularProgress } from '@mui/material';
import Context from '../context/Context';
import '../css/PopUp.css';

function PopUp() {

    const [timeSelecionado, abrirDialogo, setAbrirDialogo, setTimeSelecionado] = useContext(Context);

    const [estatisticas, setEstatisticas] = useState(null);

    const [carregando, setCarregando] = useState(true);

    const fecharPopUp = useCallback(() => {

        setAbrirDialogo(false);

        setTimeSelecionado(null);

        setEstatisticas(null);

    }, [setAbrirDialogo, setTimeSelecionado]);

    // Função de busca de estatísticas com time e ano 2023 fixo
    async function buscarEstatisticasDoTime(id) {
        const url = `https://api-nba-v1.p.rapidapi.com/teams/statistics?id=${id}&season=2023`;

        const options = {

            method: 'GET',

            headers: {

                'x-rapidapi-key': '05f2638448msh7eb4366633a637dp1dc4b8jsnb2a6350471af',

                'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'

            }

        };

        try {

            setCarregando(true);

            const response = await fetch(url, options);

            const result = await response.json();

            setEstatisticas(result.response[0]); 

            setCarregando(false); 

        } catch (error) {

            console.error(error);

            setCarregando(false);  

        }

    }

    // Executa a busca de estatísticas sempre que o time for alterado
    useEffect(() => {
        if (timeSelecionado) {
            buscarEstatisticasDoTime(timeSelecionado.id);
        }
    }, [timeSelecionado]); 

    return (
        <div>
            {timeSelecionado && (
                <Dialog
                    open={abrirDialogo}
                    onClose={fecharPopUp}
                    PaperProps={{
                        style: {
                            backgroundColor: '#f5f5f5',
                            boxShadow: 'none',
                            borderRadius: 10,
                            padding: 20,
                            fontFamily: 'Segoe UI',
                            color: '#333',
                        }
                    }}
                >
                    <DialogTitle style={{ textAlign: 'center' }}>
                        {timeSelecionado.name}
                    </DialogTitle>

                    <DialogContent
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <img src={timeSelecionado.logo} alt={timeSelecionado.name} width={100} height={100} className='imgTime' />

                        <p>{timeSelecionado.code}</p>
                        <p className='cidadeConferencia'>
                            {timeSelecionado.city} - {timeSelecionado.leagues.standard.conference} - {timeSelecionado.leagues.standard.division}
                        </p>

                        {carregando && 
                        
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15vh' }}>

                            <CircularProgress style={{ color: '#F24822' }} />

                        </div>

                        }

                        {estatisticas && !carregando && (

                            <div style={{ textAlign: 'center', height: '15vh'  }}>

                                <h3>Temporada 23/24</h3>

                                <p><strong>Jogos:</strong> {estatisticas.games}</p>

                                <p>{(estatisticas.points / estatisticas.games).toFixed(2)} Pts / {(estatisticas.assists / estatisticas.games).toFixed(2)} Ast / {(estatisticas.totReb / estatisticas.games).toFixed(2)} Reb</p>
                            
                            </div>
                        
                        )}
                    
                    </DialogContent>
                
                </Dialog>
            )}

        </div>

    );
    
}

export default PopUp;
