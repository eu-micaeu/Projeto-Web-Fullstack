import React, { useCallback, useContext } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Context from '../context/Context';
import '../css/PopUp.css';

function PopUp() {

    const [timeSelecionado, abrirDialogo, setAbrirDialogo, setTimeSelecionado] = useContext(Context);

    const fecharPopUp = useCallback(() => {

        setAbrirDialogo(false);

        setTimeSelecionado(null);
        
    }, [setAbrirDialogo, setTimeSelecionado]);

    return (

        <><div>

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

                    <DialogTitle style={{
                        textAlign: 'center',
                    }}>{timeSelecionado.name}

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

                        <p className='cidadeConferencia'> {timeSelecionado.city} - {timeSelecionado.leagues.standard.conference}</p>

                    </DialogContent>

                </Dialog>

            )}

        </div></>

    )

}

export default PopUp;