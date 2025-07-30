import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import logo from "../../assets/images/Logo Datron-BRANCO.png";
import * as S from './style.ProRata'

export const ProRata = () => {
  function formatarDecimal() {
    // var input = document.getElementById("inputValor");
    // if (input.value) {
    //   // Formata o valor para sempre ter 2 casas decimais
    //   input.value = parseFloat(input.value).toFixed(2);
    // }
    //ONBUR DO INPUT VALOR VAI RECEBER ESSA FUNÇÃO  
  }

  function calcularDiferenca() {
//divButton vai receber essa função
  }

  function limparTela() {
//divLimpar vai receber essa função
  }

  
  return (
    <S.Wrapper className="wrapper">
      <Header image={logo} title="Cálculo Pro Rata" />

      <S.Main className="main-container">
        <div className="divFieldset">
          <fieldset className="fieldset-personalizado">
            <legend>
              <b>Escolha o Tipo de Pro Rata</b>
            </legend>
            <label className="labelImput">
              <input type="radio" name="tipoPR" value="aditivo" checked />
              Aditivo
            </label>
            <label className="labelImput">
              <input type="radio" name="tipoPR" value="devolucao" checked />
              Devolução
            </label>
          </fieldset>
        </div>

        <div className="divData">
          <div className="dataI">
            <label htmlFor="DataI">Data Inicial</label>
            <input type="date"  id="InpDataI" />
          </div>
          <div className="dataF">
            <label htmlFor="Data">Data Final</label>
            <input type="date"  id="InpDataF" />
          </div>
        </div>

        <div className="divValor">
          <label htmlFor="valor"><b>Valor Mensal dos Itens (R$)</b></label>
          <input type="number" name="valor" id="inputValor" step="0.01" onBlur={()=>{}} placeholder="0,00" />
        </div>

        <div id="cobrado" className="divRadio">
          <span><b>O dia que foi devolvido será cobrado?</b></span>          
          <input type="radio" name="cobranca" value="sim" id="radioSim" defaultChecked/>    
          <label htmlFor="radioSim">Sim</label>      
          <input type="radio" name="cobranca" value="nao" id="radioNao"  />
          <label htmlFor="radioNao">Não</label>
        </div>

        <div className="divButton">
          <button id="calculo" className="meu-botao" onClick={()=>{}}>
          ➩ Calcular 
          </button>
        </div>

        <div className="divLimpar" onClick={()=>{}}>
          <button id="butLimpar">
          Limpar ✗
          </button>
        </div>

        <div className="divResultado">
          <small id="resultDias"></small>
          <small id="resultPreco"></small>
        </div>

        <div className="divCopiar">
          <button className="btnCopiar" title="Este botão copia automaticamente os dados de período e valor, que serão incluídos na fatura do cliente.">📋 Copiar</button>
          <span className="help">
          ❔
          </span>
        </div>

      </S.Main>

      
    </S.Wrapper>
  );
};
