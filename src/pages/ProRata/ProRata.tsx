import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import logo from "../../assets/images/Logo Datron-BRANCO.png";
import * as S from "./style.ProRata";


export const ProRata = () => {  
  let dias = 0;
  let resultado: number;
  let diaInicial: number;
  let mesInicial: number;
  let anoInicial: number;
  let diaFinal: number;
  let mesFinal: number;
  let anoFinal: number;
  let inputRad = document.getElementsByName(
    "cobranca"
  ) as NodeListOf<HTMLInputElement>;

  function buscarCamposDate() {
    const dataInputInicialElem = document.getElementById(
      "InpDataI"
    ) as HTMLInputElement | null;
    const dataInputFinalElem = document.getElementById(
      "InpDataF"
    ) as HTMLInputElement | null;

    if (!dataInputInicialElem || !dataInputFinalElem) {
      throw new Error("Os campos de data não foram encontrados.");
    }

    const dataInputInicial = dataInputInicialElem.value;
    const dataInputFinal = dataInputFinalElem.value;

    const [anoI, mesI, diaI] = dataInputInicial.split("-");
    const [anoF, mesF, diaF] = dataInputFinal.split("-");
    diaInicial = parseInt(diaI);
    mesInicial = parseInt(mesI);
    anoInicial = parseInt(anoI);
    diaFinal = parseInt(diaF);
    mesFinal = parseInt(mesF);
    anoFinal = parseInt(anoF);   
  }

  function calcularDiferenca() {
    const resultRad = document.getElementsByName("cobranca");
    const dataInputInicialElem = document.getElementById(
      "InpDataI"
    ) as HTMLInputElement | null;
    const dataInputFinalElem = document.getElementById(
      "InpDataF"
    ) as HTMLInputElement | null;
    if (!dataInputInicialElem || !dataInputFinalElem) {
      alert("Erro função calcularDiferença input Data");
      return;
    }
    const dataInicialStr = dataInputInicialElem.value;
    const dataFinalStr = dataInputFinalElem.value;

    const dataInicial = new Date(dataInicialStr);
    const dataFinal = new Date(dataFinalStr);
    buscarCamposDate();

    if (isNaN(dataInicial.getTime()) || isNaN(dataFinal.getTime())) {
      alert("Por favor, insira datas válidas.");
      return;
    }

    if (dataFinal < dataInicial) {
      alert("A data final não poder ser anterior a data inicial.");
      return;
    }
    // Calcula a diferença em milissegundos
    const diferenca = Math.abs(dataFinal.getTime() - dataInicial.getTime());

    // Converte a diferença para dias
    dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));

    // Corrige o erro de tipo: HTMLElement não tem 'checked', mas HTMLInputElement tem.
    const radio0 = resultRad[0] as HTMLInputElement;
    const radio1 = resultRad[1] as HTMLInputElement;

    if (radio0.checked) {
      dias += 1;
    }
    if (radio1.checked) {
      dias = dias === 0 ? 1 : dias;
    }

    calculoProRata();

    // Exibe o resultado
    const result = document.getElementById("resultDias");
    if (result) {
      result.style.display = "block";
      result.innerHTML =
        dias === 1
          ? `Período de Locação: <span id='spanDias'>  ${dias} dia </span>`
          : `Período de Locação: <span id='spanDias'>  ${dias} dias </span>`;
    }
  }

  function calculoProRata() {
    const inputValorElem = document.getElementById(
      "inputValor"
    ) as HTMLInputElement | null;
    const resultPrecoElem = document.getElementById("resultPreco"); 
    const btnCalcular = document.getElementById("calculo");
    const btnCopiar = document.querySelector(
      ".btnCopiar"
    ) as HTMLButtonElement | null;
    const spanHelp = document.querySelector(".help") as HTMLElement | null;
    const divResultado = document.querySelector(".divResultado") as HTMLDivElement | null;

    if (!inputValorElem) {
      alert("Erro calculoProRata. Input valor errado");
      return;
    }

    const valorTotal = parseFloat(inputValorElem.value.replace(",", "."));

    //CONDIÇÃO SE O VALOR FOR NAN(NÃO FOR NÚMERO)
    if (isNaN(valorTotal)) {
      if (resultPrecoElem) {
        resultPrecoElem.style.display = "none";
      }    
      if (btnCalcular) {
        btnCalcular.innerHTML = `➩ Recalcular`;
      }
      if (btnCopiar) {
        btnCopiar.style.display = "none";
      }
      if (spanHelp) {
        spanHelp.style.display = "none";
      }
      if (divResultado) {
        divResultado.style.display = "block";
      }
      return;
    }

    resultado = valorTotal * dias / 30;

    // CONDIÇÃO IGUAL A ZERO
    if (resultado === 0) {
      if (resultPrecoElem) {
        resultPrecoElem.style.display = "none";
      }    
      if (btnCalcular) {
        btnCalcular.innerHTML = `➩ Recalcular`;
      }
      if (btnCopiar) {
        btnCopiar.style.display = "none";
      }
      if (spanHelp) {
        spanHelp.style.display = "none";
      }
      if (divResultado) {
        divResultado.style.display = "block";
      }
      return;
    }

    // CONDIÇÃO MAIOR QUE ZERO
    if (resultPrecoElem) {   
      if (btnCalcular) {
        btnCalcular.innerHTML = `➩ Recalcular`;
      }

      resultPrecoElem.style.display = "block";
      resultPrecoElem.innerHTML = `R$ ${resultado
        .toFixed(2)
        .replace(".", ",")}`;
      if (btnCopiar) {
        btnCopiar.style.display = "block";
      }
      if (spanHelp) {
        spanHelp.style.display = "block";
      }
      if (divResultado) {
        divResultado.style.display = "block";
      }
    }
  }

  function formatarDecimal() {
    const input = document.getElementById(
      "inputValor"
    ) as HTMLInputElement | null;
    if (input?.value) {
      // Formcata o valor para sempre ter 2 casas decimais    
      input.value = parseFloat(input.value).toFixed(2);
    }   
  }

  function escolhaTipoProRata() {
    const resultDiv = document.getElementById("cobrado"); //pega a informação de block ou none

    const radioElem = document.querySelector(
      'input[name="tipoPR"]:checked'
    ) as HTMLInputElement | null;

    const radio = radioElem ? radioElem.value : null;

    if (!resultDiv) {
      console.error("Erro função escolhaTipoProRata. Input NULL");
      return;
    }

    resultDiv.style.display = radio === "aditivo" ? "none" : "block";
    // Sempre que o usuário mudar de "devolução" para "Aditivo" o "SIM" ficar marcado.
    mudarValorInputCobranca();
  }

  function limparTela() {
    const resultPreco = document.getElementById("resultPreco");
    const resultDias = document.getElementById("resultDias");
    const inputValor = document.getElementById(
      "inputValor"
    ) as HTMLInputElement | null;
    const inpDataI = document.getElementById(
      "InpDataI"
    ) as HTMLInputElement | null;
    const inpDataF = document.getElementById(
      "InpDataF"
    ) as HTMLInputElement | null;
    const btnCalcular = document.getElementById("calculo");
    const btnCopiar = document.querySelector(".btnCopiar") as HTMLButtonElement | null;
    const help = document.querySelector(".help") as HTMLElement | null;

    const divResultado = document.querySelector(".divResultado") as HTMLDivElement | null;

    if (resultPreco) {
      resultPreco.innerHTML = "";      
    }
    if (resultDias) {
      resultDias.innerHTML = "";
    }
    if (inputValor) {
      inputValor.value = "";
    }
    if (inpDataI) {
      inpDataI.value = "";
    }
    if (inpDataF) {
      inpDataF.value = "";
    }
    if (btnCalcular){
      btnCalcular.innerHTML = "➩ Calcular";
    }
    if (btnCopiar){
      btnCopiar.style.display = "none";
    }
    if (help){
      help.style.display = "none";
    } 
    if (divResultado) {
      divResultado.style.display = "none";
    }
    mudarValorInputCobranca();
  }

  function mudarValorInputCobranca() {
    if (inputRad[1].checked) {
      inputRad[1].checked = false;
      inputRad[0].checked = true;
    }
  }
  //Tem a função de mostrar o tooltip (help) ao clicar no ponto de interrogação
  function toggleTooltip() {
    const tooltip = document.getElementById("tooltip");
    if (tooltip) {
      tooltip.style.display =
        tooltip.style.display === "block" ? "none" : "block";
    }
  }

  // Tem a função de esconder o tooltip (help) ao clicar fora do ponto de interrogação
  document.addEventListener("click", function (e) {
    const target = e.target as HTMLElement | null;
    if (!target?.classList.contains("help")) {
      const tooltip = document.getElementById("tooltip");
      if (tooltip) {
        tooltip.style.display = "none";
      }
    }
  });

  function copiarResultado() { 
    const botaoCopiar = document.querySelector(".btnCopiar") as HTMLButtonElement | null;
   
    if (resultado) {    
      const textoCompleto = `Valor proporcional correspondente a ${dias} dias de locação de "X" equipamentos de radiocomunicação, de ${diaInicial}/${mesInicial}/${anoInicial} a ${diaFinal}/${mesFinal}/${anoFinal} - Valor: R$ ${resultado.toFixed(2).replace(".", ",")}`;   

      // copia para área de transferência
      navigator.clipboard.writeText(textoCompleto)
      .then(() => {
        if (botaoCopiar){
           botaoCopiar.innerHTML = "✔️ Copiado!"
        }
        setTimeout(() => {
          if (botaoCopiar){
            botaoCopiar.innerHTML = "📋 Copiar"
         }
        },2000)
        
      })
     .catch((err) => {
      console.error("Erro ao copiar: ", err);
      setTimeout(() => {
        if (botaoCopiar){
          botaoCopiar.innerHTML = "📋 Copiar"
       }
      },2000)
     })
    }
  }

  

  return (
    <S.CenteredContainer>
      <S.Wrapper className="wrapper">
        <Header image={logo} title="Cálculo Pro Rata - REACT" />

        <main className="main-container">
          <S.fieldsetContainer className="fieldset-container">
            <S.fieldset className="fieldset">
              <legend>
                <b>Escolha o Tipo de Pro Rata</b>
              </legend>
              <div>
                <label className="labelImput">
                  <input
                    type="radio"
                    name="tipoPR"
                    value="aditivo"
                    onClick={escolhaTipoProRata}
                    defaultChecked
                  />
                  <span>Aditivo</span>
                </label>
                <label className="labelImput">
                  <input
                    type="radio"
                    name="tipoPR"
                    value="devolucao"
                    onClick={escolhaTipoProRata}
                  />
                  <span>Devolução</span>
                </label>
              </div>
            </S.fieldset>
          </S.fieldsetContainer>

          <S.divData className="divData">
            <S.divDataIF className="dataI">
              <label htmlFor="DataI">Data Inicial</label>
              <S.inputDate type="date" id="InpDataI" />
            </S.divDataIF>
            <S.divDataIF className="dataF">
              <label htmlFor="Data">Data Final</label>
              <S.inputDate type="date" id="InpDataF" />
            </S.divDataIF>
          </S.divData>

          <S.divValor className="divValor">
            <label htmlFor="valor">
              <b>Valor Mensal dos Itens (R$)</b>
            </label>
            <S.inputValor
              type="number"
              name="valor"
              id="inputValor"
              step="0.01"
              onBlur={formatarDecimal}
              placeholder="0,00"
            />
          </S.divValor>

          <S.divRadio id="cobrado" className="divRadio">
            <S.fieldsetContainer className="fieldsetContainer">
              <S.fieldset className="fieldset">
                <legend>
                  <b>O dia que foi devolvido será cobrado?</b>
                </legend>
                <div className="divInputCobranca">
                  <label htmlFor="radioSim">
                    <input
                      type="radio"
                      name="cobranca"
                      value="sim"
                      id="radioSim"
                      defaultChecked
                    />
                    <span>Sim</span>
                  </label>

                  <label htmlFor="radioNao">
                    <input
                      type="radio"
                      name="cobranca"
                      value="nao"
                      id="radioNao"
                    />
                    <span>Não</span>
                  </label>
                </div>
              </S.fieldset>
            </S.fieldsetContainer>
          </S.divRadio>

          <S.divButton className="divButton">
            <S.myButon
              id="calculo"
              className="myButton"
              onClick={calcularDiferenca}
            >
              ➩ Calcular
            </S.myButon>
          </S.divButton>

          <S.divClean className="divLimpar" onClick={limparTela}>
            <S.buttonClean id="buttonClean">Limpar ✗</S.buttonClean>
          </S.divClean>

          <S.divResultado className="divResultado">
            <S.resultDias id="resultDias"></S.resultDias>
            <S.resultPreco id="resultPreco"></S.resultPreco>
          </S.divResultado>

          <S.divCopiar className="divCopiar">
            <S.buttonCopiar className="btnCopiar" title="Copiar resultado." onClick={copiarResultado}>
              📋 Copiar
            </S.buttonCopiar>

            <S.spanHelp
              className="help"
              onClick={toggleTooltip}
              title="Este botão copia automaticamente os dados de período e valor, que serão incluídos na fatura do cliente."
            >
              {" "}
              ❔{" "}
            </S.spanHelp>

            <S.tooltip id="tooltip">
              Este botão copia automaticamente os dados de período e valor, que
              serão incluídos na fatura do cliente.
            </S.tooltip>
          </S.divCopiar>
        </main>
      </S.Wrapper>
    </S.CenteredContainer>
  );
};
