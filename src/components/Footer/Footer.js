import './Footer.css';

// função para o rodaé da página,com seu estilo e paragrafo
function Footer() {
  return (
    <footer>

      <div className="footer-container">

        <img src="./icons/logo.png" alt="logo da empresa" width={36} height={36} aria-label="Logo" />

        <p>© 2024 - Todos os direitos reservados</p>

      </div>

    </footer>
    
  );
}

export default Footer;
