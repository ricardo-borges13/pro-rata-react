import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalStyle } from './assets/style/global';
import { Header } from './components/Header/Header';
import logo from './assets/images/Logo Datron-BRANCO.png'
import { Footer } from './components/Footer/footer';


function App() {

  return (
   <>
   <GlobalStyle />
   <Header image={logo} title="Cálculo Pro Rata	"/>
   <Footer title="Datron Tecnologia. Todos os direitos reservados -" version="1.0.0"/>
   </>
  );
}

export default App;
