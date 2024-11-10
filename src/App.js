import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer'
import { Container } from '@mui/material'; 

function App() {

  return (
    
      <Container maxWidth="lg"> 

        <Header />

        <Main />

        <Footer />

      </Container>


  );
  
}

export default App;
