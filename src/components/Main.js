import React, { useEffect, useState } from 'react';
import '../css/Main.css';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const Main = () => {
    const [times, setTimes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [timeSelecionado, setTimeSelecionado] = useState(null);

    useEffect(() => {
        const buscarTimes = async () => {
            const url = 'https://api-nba-v1.p.rapidapi.com/teams';
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
                setTimes(result.response || []);
            } catch (error) {
                setErro(error);
            } finally {
                setCarregando(false);
            }
        };

        buscarTimes();
    }, []);

    const handleOpenDialog = (time) => {
        setTimeSelecionado(time);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setTimeSelecionado(null);
    };

    if (carregando) return <div>Carregando...</div>;

    if (erro) return <div>Erro: {erro.message}</div>;

    return (
        <main>
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
                >
                    Buscar
                </Button>
            </div>

            <ul>
                {times
                    .filter((time) => time.nbaFranchise === true && time.name !== 'Home Team Stephen A')
                    .map((time) => (
                        <li key={time.id} onClick={() => handleOpenDialog(time)}>
                            <img src={time.logo} alt={time.name} width={75} height={75} />
                        </li>
                    ))}
            </ul>

            {timeSelecionado && (
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>{timeSelecionado.name}</DialogTitle>
                    <DialogContent>
                        <img src={timeSelecionado.logo} alt={timeSelecionado.name} width={100} height={100} />
                        <p><strong>Full Name:</strong> {timeSelecionado.name}</p>
                        <p><strong>City:</strong> {timeSelecionado.city}</p>
                        <p><strong>Conference:</strong> {timeSelecionado.leagues.standard.conference}</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Fechar
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </main>
    );
};

export default Main;
