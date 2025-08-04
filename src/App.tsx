import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalStyle } from './assets/style/global';
import { ProRata } from './pages/ProRata/ProRata';
import { Footer } from './components/Footer/Footer';




function App() {

  return (
   <>
   <GlobalStyle />
   <ProRata />
   <Footer title="Datron Tecnologia. Todos os direitos reservados -" version="5.6"/>            
   </>
  );
}

export default App;
