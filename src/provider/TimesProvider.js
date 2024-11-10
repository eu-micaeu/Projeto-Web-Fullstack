import React, { useState, useEffect } from 'react';
import TimesContext from '../context/TimesContext';

const TimesProvider = ({ children }) => {
    const [times, setTimes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [timePesquisado, setTimePesquisado] = useState('');

    const buscarTimes = async () => {
        const url = 'https://api-nba-v1.p.rapidapi.com/teams';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '05f2638448msh7eb4366633a637dp1dc4b8jsnb2a6350471af',
                'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
            },
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

    useEffect(() => {
        buscarTimes();
    }, []);

    const pesquisarTime = () => {
        if (timePesquisado.trim() === '') {
            buscarTimes();
            return;
        } else if (timePesquisado.trim().length < 3) {
            alert("O termo de busca deve ter pelo menos 3 caracteres");
            return;
        }

        const url = `https://api-nba-v1.p.rapidapi.com/teams?search=${timePesquisado}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '05f2638448msh7eb4366633a637dp1dc4b8jsnb2a6350471af',
                'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
            },
        };

        try {
            fetch(url, options)
                .then((response) => response.json())
                .then((result) => {
                    setTimes(result.response || []);
                    setErro(null);
                })
                .catch((error) => setErro('Erro ao buscar dados'));
        } catch (error) {
            setErro(error.message);
        }
    };

    return (
        <TimesContext.Provider
            value={{
                times,
                carregando,
                erro,
                timePesquisado,
                setTimePesquisado,
                pesquisarTime,
            }}
        >
            {children}
        </TimesContext.Provider>
    );
};

export default TimesProvider;
