import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import { Container } from '@mui/material'; 

function App() {

  return (

    <Container maxWidth="lg"> 

      <Header />

      <Main />

    </Container>

  );
  
}

export default App;
