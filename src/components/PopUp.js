import React, { useCallback, useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import Context from '../context/Context';

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

                        <img src={timeSelecionado.logo} alt={timeSelecionado.name} width={100} height={100} />

                        <p><strong>Full Name:</strong> {timeSelecionado.name}</p>

                        <p><strong>City:</strong> {timeSelecionado.city}</p>

                        <p><strong>Conference:</strong> {timeSelecionado.leagues.standard.conference}</p>

                    </DialogContent>

                    <DialogActions>

                        <Button onClick={fecharPopUp} color="primary">

                            Fechar

                        </Button>

                    </DialogActions>

                </Dialog>

            )}

        </div></>

    )

}

export default PopUp;