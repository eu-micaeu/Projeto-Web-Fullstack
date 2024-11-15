// função que recebe "onPerfEntry" que será uma função de callback usada para receber as métricas de performance
const reportWebVitals = onPerfEntry => {
  // Verifica se "onPerfEntry" é uma função válida antes de continuar
  if (onPerfEntry && onPerfEntry instanceof Function) {
   // Importa dinamicamente o módulo "web-vitals" que fornece funções para medir a performance da web. 
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
