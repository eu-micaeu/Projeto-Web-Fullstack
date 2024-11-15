import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Cria o ponto de entrada da aplicação no DOM. Será no root onde a aplicação React será montada
const root = ReactDOM.createRoot(document.getElementById('root'));
// Inicia o processo de renderização da aplicação dentro do elemento root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//chama a função reportWebVitals()
reportWebVitals();
