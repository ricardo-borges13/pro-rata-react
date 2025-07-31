import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import logo from "../../assets/images/Logo Datron-BRANCO.png";
import * as S from "./style.ProRata";

export const ProRata = () => {
  const versao = 5.6;
  let dias = 0;
  let result;
  let diaInicial;
  let mesInicial;
  let anoInicial;
  let diaFinal;
  let mesFinal;
  let anoFinal;
  let inputRad = document.getElementsByName(
    "tipoPR"
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
    diaInicial = diaI;
    mesInicial = mesI;
    anoInicial = anoI;
    diaFinal = diaF;
    mesFinal = mesF;
    anoFinal = anoF;
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
      alert("A data final não poder anterior a data inicial");
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
      if (dias === 0) {
        dias = 1;
      }
    }

    calculoProRata();

    // Exibe o resultado
    const result = document.getElementById("resultDias");
    if (result) {
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
    if (!inputValorElem) {
      alert("Erro calculoProRata. Input valor errado");
      return;
    }
    const valorTotal = parseFloat(inputValorElem.value.replace(",", "."));
    if (isNaN(valorTotal)) {
      const resultPrecoElem = document.getElementById("resultPreco") as HTMLElement | null;
      if (resultPrecoElem) {
        resultPrecoElem.style.display = "none";
      }
      const divResultElem = document.querySelector(".divResult") as HTMLElement | null;
      if (divResultElem) {
        divResultElem.style.display = "block";
      }
      return;
    }

    // 'dias' deve estar definido no escopo externo
    let resultado = (valorTotal / 30) * dias;

    if (resultado === 0) {
      const divLimpar = document.querySelector(
        ".divLimpar"
      ) as HTMLElement | null;
      if (divLimpar) {
        divLimpar.style.display = "block";
        divLimpar.classList.add("show");
      }
      return;
    }

    const resultPrecoElem = document.getElementById("resultPreco");
    if (resultPrecoElem) {
      resultPrecoElem.innerText = `R$ ${resultado
        .toFixed(2)
        .replace(".", ",")}`;
    }
  }

  function formatarDecimal() {
    const input = document.getElementById(
      "inputValor"
    ) as HTMLInputElement | null;
    if (input && input.value) {
      // Formata o valor para sempre ter 2 casas decimais
      input.value = parseFloat(input.value.replace(",", "."))
        .toFixed(2)
        .replace(".", ",");
    }
    //ONBUR DO INPUT VALOR VAI RECEBER ESSA FUNÇÃO
  }

  function escolhaTipoProRata() {
    const resultDiv = document.getElementById("cobrado");
    const radioElem = document.querySelector(
      'input[name="tipoPR"]:checked'
    ) as HTMLInputElement | null;
    const radio = radioElem ? radioElem.value : null;

    if (!resultDiv) {
      console.error("Elemento com id 'cobrado' não encontrado.");
      return;
    }

    if (radio === "aditivo") {
      resultDiv.style.display = "none";
    } else {
      resultDiv.style.display = "block";
    }
    // Sempre que o usuário mudar de "devolução" para "Aditivo" o "SIM" ficar marcado.

    if (inputRad.length >= 2 && inputRad[1].checked) {
      inputRad[1].checked = false;
      inputRad[0].checked = true;
    }
  }

  function limparTela() {
    //divLimpar vai receber essa função
  }

  return (
    <S.CenteredContainer>
      <S.Wrapper className="wrapper">
        <Header image={logo} title="Cálculo Pro Rata" />

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
                    defaultChecked
                  />
                  <span>Aditivo</span>
                </label>
                <label className="labelImput">
                  <input type="radio" name="tipoPR" value="devolucao" />
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
              onBlur={() => {}}
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

          <S.divButton className="divLimpar" onClick={() => {}}>
            <S.buttonClean id="buttonClean">Limpar ✗</S.buttonClean>
          </S.divButton>

          <div className="divResultado">
            <small id="resultDias"></small>
            <small id="resultPreco"></small>
          </div>

          <S.divCopiar className="divCopiar">
            <S.buttonCopiar
              className="btnCopiar"
              title="Este botão copia automaticamente os dados de período e valor, que serão incluídos na fatura do cliente."
            >
              📋 Copiar
            </S.buttonCopiar>
            <span className="help">❔</span>
          </S.divCopiar>
        </main>
      </S.Wrapper>
    </S.CenteredContainer>
  );
};
