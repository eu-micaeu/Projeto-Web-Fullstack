import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { Container } from '@mui/material'; 

//criação do componente principal da criação
function App() {
//retorna o layuot principal da aplicação com compoentes do cabeçalho, principal e o rodapé
  return (
    
      <Container 
      style={{

        userSelect: 'none',

      }}> 

        <Header />

        <Main />

        <Footer />

      </Container>


  );
  
}

export default App;
